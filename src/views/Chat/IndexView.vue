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

// --- Props & Stores ---
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

// --- Channel Navigation ---
const onGeneralChannel = async () => {
  try {
    const success = await generaChannelStore.getGeneralChannel();
    if (success) {
      const generalId = generaChannelStore.generalChannel?.id;
      await channelParticipantStore.getParticipants(generalId);
      currentChannel.value = generaChannelStore.generalChannel || {};
      await router.push({
        name: "chats.index",
        params: { channelId: generalId },
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
    await router.push({
      name: "chats.index",
      params: { channelId: currentChannel.value.id },
    });
  }
};

const onSelectGroupChannel = (channel) => {
  currentChannel.value = channel;
  router.push({
    name: "chats.index",
    params: { channelId: channel.id },
  });
};

// --- Channel Actions ---
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
    currentChannel.value.participants = currentChannel.value.participants?.filter(
      (p) => p.id !== user?.id
    );
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

// --- Echo Channel Subscription Management ---
let directListener = null;
let groupListener = null;
let lastGroupChannelId = null;

/**
 * Subscribe to Echo channels for real-time updates.
 * Cleans up previous listeners before subscribing to new ones.
 */
function subscribeToEchoChannels(channelId) {
  // Clean up previous listeners
  if (directListener) {
    window.Echo.private(`direct.${auth.authId}`).stopListening(".message.sent");
    directListener = null;
  }
  if (groupListener && lastGroupChannelId) {
    window.Echo.private(
      `user.${auth.authId}.channel.${lastGroupChannelId}`
    ).stopListening(".message.sent");
    groupListener = null;
    lastGroupChannelId = null;
  }

  // Listen for direct messages
  directListener = window.Echo.private(`direct.${auth.authId}`).listen(
    ".message.sent",
    (data) => {
      if (!data || !data.message) return;
      if (parseInt(data?.channel?.id) !== parseInt(channelId)) {
        channelParticipantStore.getParticipants(channelId);
        return;
      }
      if (data.message.parent_id) {
        replyStore.appendReply(data.message.parent_id, data.message);
      } else {
        messageStore.appendMessage(data.message);
      }
    }
  );

  // Listen for group/general channel messages
  if (channelId) {
    lastGroupChannelId = channelId;
    groupListener = window.Echo.private(
      `user.${auth.authId}.channel.${channelId}`
    ).listen(".message.sent", (data) => {
      console.log('Received message in group channel:', data);
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
  if(channelStore.generalChannel.id) {
     window.Echo.private(`user.${auth.authId}.channel.${channelStore.generalChannel.id}`).listen(
      ".message.sent",
      () => {
        channelStore.getChannels();
      }
    );
  }
  // Listen for updates on all channels for unread counts, etc.
  channelStore.channels.data.forEach((channel) => {
    window.Echo.private(`user.${auth.authId}.channel.${channel.id}`).listen(
      ".message.sent",
      () => {
        channelStore.getChannels();
      }
    );
  });
}

// --- Watchers & Lifecycle ---
watch(
  () => props.channelId,
  async (channelId) => {
    try {
      if (channelId) {
        const response = await window.axios.get(
          `api/v1/chat/channels/${channelId}`
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
    subscribeToEchoChannels(channelId);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (directListener) {
    window.Echo.private(`direct.${auth.authId}`).stopListening(".message.sent");
  }
  if (groupListener && lastGroupChannelId) {
    window.Echo.private(
      `user.${auth.authId}.channel.${lastGroupChannelId}`
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
            query.query
          )
      "
    />
  </div>
</template>