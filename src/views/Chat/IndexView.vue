<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
import { useAuth } from '@/stores/auth';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import { useChannel } from '@/stores/channelStore';
import { useDirectChannel } from '@/stores/directChannelStore';
import { useGeneralChannel } from '@/stores/generalChannelStore';
import { useMessageReply } from '@/stores/messageReplyStore';
import { useMessage } from '@/stores/messageStore';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  channelId: {
    type: [String, Number],
    default: null
  }
})
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
      channelParticipantStore.getParticipants(generaChannelStore.generalChannel?.id);
      currentChannel.value = generaChannelStore.generalChannel || {};
      
      await router.push({ 
        name: 'chats.index',
        params: { channelId: generaChannelStore.generalChannel.id } 
      });
    }
  } catch (error) {
    console.error('Error switching to general channel:', error);
  }
}

const onDirectChannel = async (participant) => {
  const success = await directChannelStore.getChannel(participant.id)
  if (success) {
    currentChannel.value = directChannelStore.directChannel || {};
    router.push({ 
      name: 'chats.index',
      params: { channelId: currentChannel.value.id }
    });
  }
}
const loadMore = async () => {
  if (!currentChannel.value) return
    await channelParticipantStore.getParticipants(
      currentChannel.value?.id, 
      channelParticipantStore.participants?.meta?.next_cursor || null
    );
}

const removeChannelParticipant = async (user) => {
    const success = await channelStore.removeChannelParticipant(currentChannel.value?.id, user?.id);
    if (success) {
      currentChannel.value.participants = currentChannel.value.participants?.filter(p => p.id !== user?.id);
    } 
}

const deleteChannel = async (channelId) => {
  const success = await channelStore.deleteChannel(channelId)
  if (success) onGeneralChannel();
}

const initializeChannel = async () => {
  if(!props.channelId) {
    onGeneralChannel();
  }
}
const onSelectGroupChannel = (channel) => {
  currentChannel.value = channel;
  router.push({ 
    name: 'chats.index',
    params: { channelId: channel.id }
  });
}
watch(() => props.channelId, async (channelId) => {
  try {
    if (channelId) {
      const response = await window.axios.get(`api/v1/chat/channels/${channelId}`);
      currentChannel.value = response.data.data;
    }
  } catch (err) {
    console.error('Error fetching channel:', err);
  }
  if (!channelId) return;
  messageStore.getMessages(channelId)
  channelParticipantStore.getParticipants(channelId);
}, { immediate: true });

onMounted(() => {
  window.Echo.private(`direct.${auth.authId}`)
    .listen('.message.sent', (data) => {
      if (!data || !data.message) return;

      if (parseInt(data?.channel?.id) !== parseInt(props.channelId)) return;
    if (data.message.parent_id) {
        replyStore.appendReply(data.message.parent_id, data.message);
    } else {
        messageStore.appendMessage(data.message);
    }

    });
  initializeChannel();
  channelStore.getChannels();
})

if (!props.channelId) {
  console.log('[DEBUG] No channel ID provided, skipping group message listener');
  window.Echo.private(`user.${auth.authId}.channel.${props.channelId}`)
    .listen('.message.sent', (data) => {
       console.log('[DEBUG] Message received from group:', data);

    });
}

</script>
<template>
      <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
        <ChatGroupSection
          @on-general-channel="onGeneralChannel"
          :channels="channelStore.channels"
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
          @on-search="(query) => channelParticipantStore.getParticipants(currentChannel.id, null, query.query)"
        />
    </div>
</template>