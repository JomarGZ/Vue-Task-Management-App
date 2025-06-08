<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import { useGeneralChannel } from '@/stores/generalChannelStore';
import { onMounted, ref } from 'vue';

const generaChannelStore = useGeneralChannel();
const channelParticipantStore = useChannelParticipant();
const currentChannelId = ref(null);
const onGeneralChannel = async () => {
  const success = await generaChannelStore.getGeneralChannel();
  if (success) {
    channelParticipantStore.getParticipants(generaChannelStore.generalChannel?.id,);
    currentChannelId.value = generaChannelStore.generalChannel.id || null
  }
}
const loadMore = async () => {
  if (!currentChannelId.value) return
    await channelParticipantStore.getParticipants(
      currentChannelId.value, 
      channelParticipantStore.participants?.meta?.next_cursor || null
    );
}
onMounted(() => {
  onGeneralChannel();
})
</script>
<template>
      <div class="flex h-screen overflow-hidden rounded-lg shadow-lg">
        <ChatGroupSection
          @on-general-channel="onGeneralChannel"
        />
        <ChatMainSection/>
        <ChatMembersSection 
          @load-more="loadMore"
          :participants="channelParticipantStore?.participants || {}"
          :isFetching="channelParticipantStore.isFetching"
          :hasMore="channelParticipantStore.participants?.hasMore"
        />
    </div>
</template>