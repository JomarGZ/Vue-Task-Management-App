import { defineStore } from "pinia";
import { ref } from "vue";

export const useChannelParticipant = defineStore('channel-participant', () => {
    const isFetching = ref(false);
    const error = ref(null);
    const participants = ref({});
    const resetErrorState = () => {
        error.value = null;
    }
    const getParticipants = async (channelId) => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetErrorState();

        try {
            if (!channelId) {
                throw new Error(`Channel ID is required to get the participants. Recieved: ${channelId}`)
            }
            const response = await window.axios.get(`api/v1/chat/channels/${channelId}/participants`)
            participants.value = response.data || {}
            return true;
        } catch (e) {
            console.error('Failed to get the participants', e);
            error.value = e.message || 'Error request'
            throw e;
        } finally {
            isFetching.value = false
        }
    }
    return {
        getParticipants,
        error,
        isFetching,
        participants
    }
});