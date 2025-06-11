import { defineStore } from "pinia";
import { ref } from "vue";
import { useMessage } from "./messageStore";

export const useMessageReply = defineStore('message-reply', () => {
    const isFetching = ref(false);
    const error = ref(null);
    const replies = ref({});
    const messageStore = useMessage();
    const resetErrorState = () => {
        error.value = null
    }
    const appendReply = async (parentMessageId, messageReply) => {
        if (!replies.value[parentMessageId]) {
            replies.value[parentMessageId] = [];
        }
        const parentMessage = messageStore.messages.data.find(m => m.id === parentMessageId);
        if (parentMessage) {
            if (parentMessage.reply_count > 0){
                await getReplies(parentMessage.id);
            } else {
                replies.value[parentMessageId].unshift(messageReply);
            }
            parentMessage.reply_count = (parentMessage.reply_count || 0) + 1;
        }
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
        appendReply,
        isFetching,
        replies,
        error,
    }
})