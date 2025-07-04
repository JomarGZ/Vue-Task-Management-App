<script setup>
import ChatGroupSection from "@/components/ChatGroupSection.vue";
import ChatMainSection from "@/components/ChatMainSection.vue";
import ChatMembersSection from "@/components/ChatMembersSection.vue";
import { useAuth } from "@/stores/auth";
import { useChannelParticipant } from "@/stores/channelParticipantStore";
import { useChannel } from "@/stores/channelStore";
import { useDirectChannel } from "@/stores/directChannelStore";
import { useGeneralChannel } from "@/stores/generalChannelStore";
import { useMessageReply } from "@/stores/messageReplyStore";
import { useMessage } from "@/stores/messageStore";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  channelId: {
    type: [String, Number],
    default: null,
  },
});
const generaChannelStore = useGeneralChannel();
const directChannelStore = useDirectChannel();
const channelParticipantStore = useChannelParticipant();
const channelStore = useChannel();
const messageStore = useMessage();
const replyStore = useMessageReply();
const router = useRouter();
const auth = useAuth();
const currentChannel = ref({});
const onGeneralChannel = async () => {
  try {
    const success = await generaChannelStore.getGeneralChannel();
    if (success) {
      channelParticipantStore.getParticipants(
        generaChannelStore.generalChannel?.id,
      );
      currentChannel.value = generaChannelStore.generalChannel || {};
      await router.push({
        name: "chats.index",
        params: { channelId: generaChannelStore.generalChannel.id },
      });
    }
  } catch (error) {
    console.error("Error switching to general channel:", error);
  }
};

const onDirectChannel = async (participant) => {
  const success = await directChannelStore.getChannel(participant.id);
  if (success) {
    currentChannel.value = directChannelStore.directChannel || {};
    channelParticipantStore.resetReadMessagesCount(participant.id);
    router.push({
      name: "chats.index",
      params: { channelId: currentChannel.value.id },
    });
  }
};
const loadMore = async () => {
  if (!currentChannel.value) return;
  await channelParticipantStore.getParticipants(
    currentChannel.value?.id,
    channelParticipantStore.participants?.meta?.next_cursor || null,
  );
};

const removeChannelParticipant = async (user) => {
  const success = await channelStore.removeChannelParticipant(
    currentChannel.value?.id,
    user?.id,
  );
  if (success) {
    currentChannel.value.participants =
      currentChannel.value.participants?.filter((p) => p.id !== user?.id);
  }
};

const deleteChannel = async (channelId) => {
  const success = await channelStore.deleteChannel(channelId);
  if (success) onGeneralChannel();
};

const initializeChannel = async () => {
  if (!props.channelId) {
    onGeneralChannel();
  }
};
const onSelectGroupChannel = (channel) => {
  currentChannel.value = channel;
  router.push({
    name: "chats.index",
    params: { channelId: channel.id },
  });
};

let directListener = null;
let groupListener = null;
let lastGroupChannelId = null;

function subscribeToEchoChannels(channelId) {
  if (directListener) {
    window.Echo.private(`direct.${auth.authId}`).stopListening(".message.sent");
    directListener = null;
  }
  if (groupListener && lastGroupChannelId) {
    window.Echo.private(
      `user.${auth.authId}.channel.${lastGroupChannelId}`,
    ).stopListening(".message.sent");
    groupListener = null;
    lastGroupChannelId = null;
  }

  directListener = window.Echo.private(`direct.${auth.authId}`).listen(
    ".message.sent",
    (data) => {
      if (!data || !data.message);
      if (parseInt(data?.channel?.id) !== parseInt(channelId)) {
        channelParticipantStore.getParticipants(channelId);
      } else {
        if (data.message.parent_id) {
          replyStore.appendReply(data.message.parent_id, data.message);
        } else {
          messageStore.appendMessage(data.message);
        }
      }
    },
  );

  // Subscribe to group/general channel
  if (channelId) {
    lastGroupChannelId = channelId;
    groupListener = window.Echo.private(
      `user.${auth.authId}.channel.${channelId}`,
    ).listen(".message.sent", (data) => {
      if (!data || !data.message) return;
      if (parseInt(data?.channel?.id) !== parseInt(channelId)) return;
      if (data.message.parent_id) {
        replyStore.appendReply(data.message.parent_id, data.message);
      } else {
        messageStore.appendMessage(data.message);
      }
      channelStore.onReadChannel(channelId);
    });
  }
  channelStore.channels.data.forEach((channel) => {
    window.Echo.private(`user.${auth.authId}.channel.${channel.id}`).listen(
      ".message.sent",
      (data) => {
        channelStore.getChannels();
      },
    );
  });
}

watch(
  () => props.channelId,
  async (channelId) => {
    try {
      if (channelId) {
        const response = await window.axios.get(
          `api/v1/chat/channels/${channelId}`,
        );
        currentChannel.value = response.data.data;
      }
    } catch (err) {
      console.error("Error fetching channel:", err);
    }
    if (!channelId) return;
    messageStore.getMessages(channelId);
    channelParticipantStore.getParticipants(channelId);
    channelStore.onReadChannel(channelId);
    channelStore.onReadGroupChannel(channelId);
    console.log("channelId", channelId);
    // (Re)subscribe to Echo channels
    subscribeToEchoChannels(channelId);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (directListener) {
    window.Echo.private(`direct.${auth.authId}`).stopListening(".message.sent");
  }
  if (groupListener && lastGroupChannelId) {
    window.Echo.private(
      `user.${auth.authId}.channel.${lastGroupChannelId}`,
    ).stopListening(".message.sent");
  }
});

onMounted(() => {
  initializeChannel();
  channelStore.getChannels();
});
</script>
<template>
  <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
    <ChatGroupSection
      @on-general-channel="onGeneralChannel"
      :channels="channelStore.channels"
      :generalUnreadCount="channelStore.generalChannel.unread_messages_count"
      @onSelectChannel="onSelectGroupChannel"
    />
    <ChatMainSection
      :channel="currentChannel"
      @remove-participant="removeChannelParticipant"
      @delete-channel="deleteChannel"
    />
    <ChatMembersSection
      @load-more="loadMore"
      @onPrivateChat="onDirectChannel"
      :participants="channelParticipantStore?.participants || {}"
      :isFetching="channelParticipantStore.isFetching"
      :hasMore="channelParticipantStore.participants?.hasMore"
      @on-search="
        (query) =>
          channelParticipantStore.getParticipants(
            currentChannel.id,
            null,
            query.query,
          )
      "
    />
  </div>
</template>
