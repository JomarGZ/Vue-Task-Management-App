import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageReply = defineStore('message-reply', () => {
    const isFetching = ref(false);
    const error = ref(null);
    const replies = ref({});

    const resetErrorState = () => {
        error.value = null
    }

    const getReplies = async (parentMessageId) => {
        if (isFetching.value) return;
        isFetching.value = true;
        
        resetErrorState();
        try {
            if (!parentMessageId) {
                throw new Error(`Message ID is required to get replies. Recieved: ${parentMessageId}`)
            }
            const response = await window.axios.get(`api/v1/chat/channel/messages/${parentMessageId}/replies`);
            const repliesData = response.data?.data || [];
            replies.value[parentMessageId] = repliesData
            return true;
        } catch (e) {
            console.error('Failed to get replies.', e);
            error.value = e?.message || 'Error request'
            throw e;
        } finally {
            isFetching.value = false
        }
    }

    return {
        getReplies,
        isFetching,
        replies,
        error,
    }
})