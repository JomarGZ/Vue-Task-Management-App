import { useSweetAlert } from "@/composables/useSweetAlert2";
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
    const dropdownParticipants = ref([]);

    const resetErrorState = () => {
        error.value = null;
    }

    const removeSelectedItemOnTheList = (users) => {
        if (!users) return;
        const idsToRemoveSet = new Set(users)
        dropdownParticipants.value = dropdownParticipants.value.filter(u => !idsToRemoveSet.has(u.id));
    }

    const searchParticipants = async (query, ParticipantIds = []) => {
        if (isFetching.value) return;
        isFetching.value = true;

        resetErrorState();

        try {
            const params = new URLSearchParams({
                query: query
            })

            if (ParticipantIds) params.append('participant_ids', ParticipantIds);
            const response = await window.axios.get(`api/v1/chat/participants/available-list?${params}`)
            dropdownParticipants.value = response.data?.data || []
        } catch (e) {
            console.error('Failed to fetch participants.', e);
            error.value = e?.message || 'There is an error fetching participants. Please try again later';
            throw e;
        } finally {
            isFetching.value = false
        }
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
        searchParticipants,
        dropdownParticipants,
        removeSelectedItemOnTheList,
        error,
        isFetching,
        participants
    }
});