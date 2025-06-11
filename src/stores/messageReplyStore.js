import { defineStore } from "pinia";
import { ref } from "vue";
import { useMessage } from "./messageStore";

export const useMessageReply = defineStore('message-reply', () => {
    const isFetching = ref(false);
    const error = ref(null);
    const isActionLoaded = ref(false);
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

      const onLikeReply = async (replyId, parentMessageId) => {
        if (isActionLoaded.value) return;
        isActionLoaded.value = true;
        resetErrorState();
      

        try {
            if(!replyId) {
                throw new Error(`Message ID is required to like a reply. Recieved: ${replyId}`);
            }
            if (!parentMessageId) {
                throw new Error(`Parent message ID is required to like the reply. Recieved: ${parentMessageId}`);
            }
            const replyIndex = replies.value[parentMessageId].findIndex(m => m.id === replyId);
            if (replyIndex === -1) return;
            const reply = replies.value[parentMessageId][replyIndex];

            replies.value[parentMessageId][replyIndex] = {
                ...reply,
                is_liked: !reply.is_liked,
                reaction_count: reply.is_liked
                    ? Math.max(0, reply.reaction_count - 1)
                    : reply.reaction_count + 1
            }
            const response = await window.axios.post(`api/v1/chat/channel/messages/${replyId}/like`)
            const updatedReply = response.data?.data;
            if (updatedReply) {
               replies.value[parentMessageId][replyIndex] = updatedReply;
            }
        } catch(e) {
            console.error('Failed to like a reply.', e)
            error.value = e?.message || 'Error request'
            throw e;
        } finally {
            isActionLoaded.value = false
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
        isActionLoaded,
        isFetching,
        onLikeReply,
        replies,
        error,
    }
})