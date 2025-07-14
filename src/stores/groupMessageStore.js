import { defineStore } from "pinia";
import { ref } from "vue";

export const useGroupMessage = defineStore('group-message', () => {
    const isActionLoading = ref(false);
    const error = ref(null);

    const resetErrorState = () => {
        error.value = null
    }
    const storeMessage = async (content, channelId, replyToMessgeId = null) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            if (channelId === null || channelId === undefined) {
                throw new Error(`Channel ID is required to store a message. Recieved: ${channelId}`);
            }
            const response = await window.axios.post(`api/v1/chat/messages`, {
                message_type: 'group',
                content: content,
                parent_id: replyToMessgeId,
                channel_id: channelId
            });
            return {
                'success':true,
                'message': response.data?.data || {}
            }
               
        } catch(e) {
            console.error('Failed to store a message: ',e);
            error.value = e?.message || 'Error request'
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }

    return {
        storeMessage,
        isActionLoading,
        error,
    }
})