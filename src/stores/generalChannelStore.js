import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralChannel = defineStore("general-channel", () => {
    const isFetching = ref(false);
    const error = ref(null);
    const generalChannel = ref({})
    const resetErrorState = () => {
        error.value = null
    }
    const getGeneralChannel = async () => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetErrorState();
        try {
            const response = await window.axios.get('api/v1/chat/channel/general');
            generalChannel.value = response.data?.data || {}
            return true
        } catch(e) {
            console.error('Failed to fetch general channel', e)
            error.value = e?.message || 'Error request'
            throw e
        } finally {
            isFetching.value = false
        }
    }
    return {
        getGeneralChannel,
        generalChannel,
        isFetching,
        error,
    }
});