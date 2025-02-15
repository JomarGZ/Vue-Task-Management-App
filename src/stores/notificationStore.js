import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotifications = defineStore("notifications", () => {
    const isFetchLoading = ref(false);
    const isFetchError = ref(false);
    const notifications = ref([]);
    const unreadCount = ref(0);
    const setNotifications = (data) => {
        if(!data) return;
        notifications.value = data;
        unreadCount.value = notifications.value.filter(n => n.read_at === null).length;
    }
    const fetchNotifications = async () => {
        await handleAsyncRequestOperation(getNotifications,(response) => {
            setNotifications(response.data?.data);
        },isFetchLoading, isFetchError);
    }
    const getNotifications = async () => {
        return window.axios.get("v1/user/notifications");
    }

    const setupEcho = () => {
        // const userId = window.auth.user.id; // Get the authenticated user's ID
        // window.Echo.private(`App.Models.User.${userId}`)
        //   .notification((notification) => {
        //     notifications.value.unshift(notification); // Add new notification to the list
        //     unreadCount.value++; // Increment unread count
        //   });
      };
    return {
        fetchNotifications,
        setupEcho,
        notifications,
        isFetchLoading,
        isFetchError
    }
});