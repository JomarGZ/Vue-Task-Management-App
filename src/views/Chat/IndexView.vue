<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import { useChannel } from '@/stores/channelStore';
import { useDirectChannel } from '@/stores/directChannelStore';
import { useGeneralChannel } from '@/stores/generalChannelStore';
import { useMessage } from '@/stores/messageStore';
import { onMounted, ref, watch } from 'vue';

const generaChannelStore = useGeneralChannel();
const directChannelStore = useDirectChannel();
const channelParticipantStore = useChannelParticipant();
const channelStore = useChannel();
const messageStore = useMessage();

const currentChannel = ref({});
const onGeneralChannel = async () => {
  const success = await generaChannelStore.getGeneralChannel();
  if (success) {
    channelParticipantStore.getParticipants(generaChannelStore.generalChannel?.id);
    currentChannel.value = generaChannelStore.generalChannel || {}
    
  }
}

const onDirectChannel = async (participant) => {
  const success = await directChannelStore.getChannel(participant.id)
  if (success) {
    currentChannel.value = directChannelStore.directChannel || {};
  }
}
const loadMore = async () => {
  if (!currentChannel.value) return
    await channelParticipantStore.getParticipants(
      currentChannel.value?.id, 
      channelParticipantStore.participants?.meta?.next_cursor || null
    );
}

const onSelectChannel = (channel) => {
  currentChannel.value = channel;
}
watch(currentChannel, (channel) => {
  messageStore.getMessages(channel?.id)
})
onMounted(() => {
  onGeneralChannel();
  channelStore.getChannels();
})
</script>
<template>
      <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
        <ChatGroupSection
          @on-general-channel="onGeneralChannel"
          :channels="channelStore.channels"
          @onSelectChannel="onSelectChannel"
        />
        <ChatMainSection :channel="currentChannel"/>
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