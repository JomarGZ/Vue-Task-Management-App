import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useChannelParticipant = defineStore('channel-participant', () => {
    const isFetching = ref(false);
    const error = ref(null);
    const participants = reactive({
        data: [],
        links: {},
        meta: {},
        hasMore: false
    });

    const resetErrorState = () => {
        error.value = null;
    }
    const getParticipants = async (channelId, cursor = null, searchQuery = '') => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetErrorState();

        try {
            if (!channelId) {
                throw new Error(`Channel ID is required to get the participants. Recieved: ${channelId}`)
            }
            const params = new URLSearchParams()
            if (cursor) params.append('cursor', cursor);
            if (searchQuery) params.append('query', searchQuery);
            const response = await window.axios.get(`api/v1/chat/channels/${channelId}/participants?${params}`)
            const participantsData = response.data || {}
            if (cursor === null) {
                participants.data = participantsData.data || [];
            } else {
                participants.data = [...participants.data, ...(participantsData.data || [])];
            }
            participants.links = participantsData.links || {};
            participants.meta = participantsData.meta || {};
            participants.hasMore = participants.meta?.next_cursor ? true : false
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