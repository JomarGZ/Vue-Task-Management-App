import { defineStore } from "pinia";
import { ref } from "vue";

export const useChannel = defineStore("channel", () => {
    const isFetching = ref(false);
    const error = ref(null);

    const resetErrorState = () => {
        error.value = null
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
});