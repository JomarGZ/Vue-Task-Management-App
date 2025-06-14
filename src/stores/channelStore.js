import { useSweetAlert } from "@/composables/useSweetAlert2";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useChannel = defineStore("channel", () => {
    const isFetching = ref(false);
    const isActionLoading = ref(false);
    const error = ref(null);
    const channels = reactive({
        data: [],
        links: {},
        meta: {}
    })
    const {showToast} = useSweetAlert();
    const resetErrorState = () => {
        error.value = null
    }
    const getChannels = async (cursor = null) => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetErrorState();
        try {
            const params = new URLSearchParams();
            if(cursor) params.append('cursor', cursor);
            const response = await window.axios.get(`api/v1/chat/channels?${params}`);
            const data = response.data || {};
            channels.data = cursor ? [...channels.data, ...(data.data || [])] : data.data || [];
            channels.links = data.links;
            channels.meta = data.meta;
        } catch (e) {
            console.error('Failed to get channels.', e);
            error.value = e?.message || 'There is an error fetching channels. Please try again later!';
            throw e;
        } finally {
            isFetching.value = false
        }
    }

    const getChannel = async (channelId) => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetErrorState();
        try {
            if (!channelId) {
                throw new Error(`Channel ID is required to get channel. Recieved ${channelId}`)
            }
            await window.axios.get(`api/v1/chat/channels/${channelId}`);
            return true
        } catch(e) {
            console.error('Failed to fetch channel', e)
            throw e
        } finally {
            isFetching.value = false
        }
    }

    const storeChannel = async (data) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            const response = await window.axios.post('api/v1/chat/channels', data);
            showToast('Team chat channel added successfully')
            channels.data = [(response.data?.data || []), ...channels.data]
            return true
        } catch(e){
            console.error('Failed to store new channel.', e);
            error.value = e?.message || 'There is an error adding new team chat.'
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }
    const updateChannel = async (channelId, payload) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            if (!channelId) {
                throw new Error(`Channel ID is required to update the channel. Recieved: ${channelId}`)
            }
            const response = await window.axios.put(`api/v1/chat/channels/${channelId}`, payload);
            const channeIndex = channels.data.findIndex(c => c.id === channelId);
            if (channeIndex !== -1) {
                channels.data[channeIndex] = response.data?.data || {};
            }
            showToast('Channel updated successfully');
            return {
                success: true,
                channel: channels.data[channeIndex]
            };
        } catch(e) {
            console.error('Failed to update channel.', e);
            error.value = e?.message || 'There is an error updating channel.'
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }
    const deleteChannel = async (channelId) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;
        resetErrorState();
        try {
            await window.axios.delete(`api/v1/chat/channels/${channelId}`);

            showToast('Channel delete successfully');
            return true;
        } catch(e) {
            console.error('Failed to delete channel.', e);
            error.value = e?.message || 'There is an error deleting channel.';
            throw e;
        } finally {
            isActionLoading.value = false
        }
    }
     const removeChannelParticipant = async (channelId, participantId) => {
        if (isActionLoading.value) return;
        isActionLoading.value = true;

        resetErrorState();
        try {
            if (!channelId) {
                throw new Error(`Channel ID is required to remove participant. Recieved: ${channelId}`);
            }
            if (!participantId) {
                throw new Error(`User ID is required to remove participant. Recieved: ${participantId}`);
            }
            await window.axios.delete(`api/v1/chat/channels/${channelId}/participants/${participantId}`);
            showToast('Participant removed successfully');
            return true;
        } catch(e) {
            console.error('Failed to remove participant.', e);

            error.value = e?.message || 'There is an error removing participant.';

            throw e;
        } finally {
            isActionLoading.value = false
        }
    }
    return {
        getChannels,
        getChannel,
        removeChannelParticipant,
        deleteChannel,
        isFetching,
        storeChannel,
        updateChannel,
        channels,
        error
    }
});