import { defineStore } from "pinia";
import { ref } from "vue";

export const useDirectMessage = defineStore("direct-message", () => {
    const isActionLoading = ref(false);
    const error = ref(null);

    const resetErrorState = () => {
        error.value = null
    }

    const storeMessage = async (content, recipientId, replyToMessgeId = null) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            if (!recipientId) {
                throw new Error(`Recipient ID is required to store a message. Recieved: ${recipientId}`);
            }
            const response = await window.axios.post(`api/v1/chat/messages`, {
                message_type: 'direct',
                content: content,
                recipient_id: recipientId,
                parent_id: replyToMessgeId
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
});