import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralMessage = defineStore('general-message', () => {
    const isActionLoading = ref(false);
    const error = ref(null);

    const resetErrorState = () => {
        error.value = null
    }
    const storeMessage = async (content) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();

        try {
            const response = await window.axios.post(`api/v1/chat/messages`, {
                message_type: 'general',
                content: content,
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