import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMessage = defineStore('message', () => {
    const isFetching = ref(false);
    const isActionLoading = ref(false);
    const error = ref(null);
    const messages = reactive({
        data: [],
        links: {},
        meta: {},
        hasMore: false
    });
    const resetErrorState = () => {
        error.value = null
    }
    const getMessages = async (channelId, cursor = null, searchQuery = '') => {
        if(isFetching.value) return;
        isFetching.value = true;
        resetErrorState()
        try {
            if(!channelId) {
                throw new Error(`Channel ID is required to get messages. Recieved: ${channelId}`)
            }
            const params = new URLSearchParams();
            if(cursor) params.append('cursor', cursor);
            if(searchQuery) params.append('query', searchQuery);
            const response = await window.axios.get(`api/v1/chat/channels/${channelId}/messages?${params}`)
            const messagesData = response.data || {}
            if(cursor !== null) {
                messages.data = [...messages.data, ...(messagesData?.data || [])]
            } else {
                messages.data = messagesData?.data || []
            }
            messages.links = messagesData?.links || {}
            messages.meta = messagesData?.meta || {}
            messages.hasMore = messagesData?.meta?.next_cursor ? true : false
            return true;
        } catch(e) {
            console.error('Failed to get messages. ', e)
            error.value = e?.messaage || 'Error request'
            throw e;
        } finally {
            isFetching.value = false
        }
    };
  
    const appendMessage = (message) => {
        messages.data.unshift(message);
    }

    const removeMessage = async (messageId) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            if(!messageId) {
                throw new Error(`Message ID is required to delete a message. Recieved: ${messageId}`)
            }
            await window.axios.delete(`api/v1/chat/messages/${messageId}`);
            return true;
        } catch (e) {
            console.error('Failed to delete a message: ', e);
            error.value = e?.message || 'Error request'
            throw e
        } finally {
            isActionLoading.value = false
        }
    }
    const updateMessage = async (type, messageId, content, channelId = null) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            if (!messageId) {
                throw new Error(`Message ID is required to update a message. Recieved: ${messageId}`);
            }
            if (!type) {
                throw new Error(`Message type is required to update a message. Recieved: ${type}`);
            }
            const response = await window.axios.put(`api/v1/chat/messages/${messageId}`, {
                message_type: type,
                content: content,
                channel_id: channelId
            });

            const messageIndex = messages.data.findIndex(m => m.id === messageId);
            if (messageIndex !== -1) {
                messages.data[messageIndex] = response.data?.data
            }
            return true;
        } catch (e) {
            console.error('Failed to update the message. ', e);
            error.value = e?.message || 'Error request'
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }
    return {
        isFetching,
        updateMessage,
        getMessages,
        error,
        appendMessage,
        removeMessage,
        messages
    }
});