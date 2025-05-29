import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationDropdown = defineStore("notificationDropdown", () => {
    const isFetching = ref(false);
    const unreadNotificationsCount = ref(0);;
    const unreadNotifications = ref([]);
    const error = ref(null);
    const setErrorNull = () => {
        error.value = null;
    }
    const getNotificationDrodDownData = async () => {
        if (isFetching.value) return;
        isFetching.value = true;
        setErrorNull();
        try {
            const response = await window.axios.get('api/v1/user/notifications/dropdown');
            unreadNotificationsCount.value = response?.data?.unread_counts || 0;
            unreadNotifications.value = response?.data?.data || []
        } catch (e) {
            console.error('Failed to fetch notification for dropdown', e);
            error.value = e.message;
            throw e;
        } finally {
            isFetching.value = false
        }
    }
    return {
        getNotificationDrodDownData,
        unreadNotificationsCount,
        unreadNotifications,
        isFetching,
        error,
    }
});