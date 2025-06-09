<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import { useGeneralChannel } from '@/stores/generalChannelStore';
import { useMessage } from '@/stores/messageStore';
import { onMounted, ref } from 'vue';

const generaChannelStore = useGeneralChannel();
const channelParticipantStore = useChannelParticipant();
const messageStore = useMessage();

const currentChannel = ref({});
const onGeneralChannel = async () => {
  const success = await generaChannelStore.getGeneralChannel();
  if (success) {
    channelParticipantStore.getParticipants(generaChannelStore.generalChannel?.id,);
    currentChannel.value = generaChannelStore.generalChannel || {}
    messageStore.getMessages(currentChannel.value?.id)

  }
}
const loadMore = async () => {
  if (!currentChannel.value) return
    await channelParticipantStore.getParticipants(
      currentChannel.value?.id, 
      channelParticipantStore.participants?.meta?.next_cursor || null
    );
}

onMounted(() => {
  onGeneralChannel()
    ;
})
</script>
<template>
      <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
        <ChatGroupSection
          @on-general-channel="onGeneralChannel"
        />
        <ChatMainSection :channel="currentChannel"/>
        <ChatMembersSection 
          @load-more="loadMore"
          :participants="channelParticipantStore?.participants || {}"
          :isFetching="channelParticipantStore.isFetching"
          :hasMore="channelParticipantStore.participants?.hasMore"
          @on-search="(query) => channelParticipantStore.getParticipants(currentChannel.id, null, query.query)"
        />
    </div>
</template>