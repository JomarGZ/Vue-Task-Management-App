import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useNotificationList  = defineStore("NotificationList", () => {
    const filterType = ref('all'); // Default filter type
    const notifications = reactive({
        data: [],
        links: {},
        meta: {},

    });
    const isFetchLoading = ref(false);

    const getNotifications = async (page = 1, filters = {}) => {
        if (isFetchLoading.value) return;
        isFetchLoading.value = true;
        try {
             const params = new URLSearchParams({
                page,                
                ...filters         
            });
            const response = await window.axios.get(`api/v1/user/notifications?${params}`);
            notifications.data = page === 1 ? response?.data?.data || [] : notifications.data.concat(response?.data?.data || []);
            notifications.links = response?.data?.links || {};
            notifications.meta = response?.data?.meta || {};
        } catch (e) {
            console.error("Failed to fetch notifications:", e);
            throw e;
        } finally {
            isFetchLoading.value = false;
        }
    }
    return {
        getNotifications,
        filterType,
        notifications,
        isFetchLoading
    }
});