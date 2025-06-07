<script setup>
import ChatGroupSection from '@/components/ChatGroupSection.vue';
import ChatMainSection from '@/components/ChatMainSection.vue';
import ChatMembersSection from '@/components/ChatMembersSection.vue';
import { useChannelParticipant } from '@/stores/channelParticipantStore';
import { useGeneralChannel } from '@/stores/GeneralChannelStore';
import { onMounted } from 'vue';

const generaChannelStore = useGeneralChannel();
const channelParticipantStore = useChannelParticipant();

const onGeneralChannel = async () => {
  const success = await generaChannelStore.getGeneralChannel();
  if (success) {
    console.log('general');
    channelParticipantStore.getParticipants(generaChannelStore.generalChannel?.id);
  }
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
        <ChatMembersSection/>
    </div>
</template>