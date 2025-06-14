import { defineStore } from "pinia";
import { ref } from "vue";

export const useDirectChannel = defineStore('direct-channel', () => {
    const isActionLoading = ref(false);
    const directChannel = ref({});
    const error = ref(null);

    const resetErrorState = () => {
        error.value = null
    }
    const getChannel = async (participantId) => {
        if(isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();

        try {
            if (!participantId) {
                throw new Error(`Participant ID is required to get channel. Recieved: ${participantId}`)
            }
            const response = await window.axios.post('api/v1/chat/channel/direct', {
                recipient_id: participantId
            })
            directChannel.value = response.data?.data || {}
            return true;
        } catch(e) {
            console.error('Failed to get channel. ',e);
            error.value = e?.message || 'There is an error while getting the channel. Please try again';
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }

    return {
        getChannel,
        error,
        directChannel,
        isActionLoading
    }
});