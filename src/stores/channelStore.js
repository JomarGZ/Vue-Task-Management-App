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
            const response = await window.axios.get(`api/v1/chat/channels/${channelId}`);
            console.log(response);
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

    return {
        getChannels,
        getChannel,
        isFetching,
        storeChannel,
        channels,
        error
    }
});