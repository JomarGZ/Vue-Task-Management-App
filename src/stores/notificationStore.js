import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";

export const useNotifications = defineStore("notifications", () => {
    const isFetchLoading = ref(false);
    const isFetchError = ref(false);
    const notifications = ref([]);
    const unreadCount = ref(0);

    const auth = useAuth();
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
        return window.axios.get("api/v1/user/notifications");
    }

    const setupEcho = () => {
        const userId = auth.user?.id;
        if (!userId) {
            console.warn(`Expecting user id but ${userId} given`)
            return;
        };
        window.Echo.private(`App.Models.User.${userId}`)
          .notification((notification) => {
            notifications.value.unshift(notification);
            unreadCount.value++; 
          });
      };
    return {
        fetchNotifications,
        setupEcho,
        unreadCount,
        notifications,
        isFetchLoading,
        isFetchError
    }
});