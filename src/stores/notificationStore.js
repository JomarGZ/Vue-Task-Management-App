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
    const setupEcho = () => {
        const userId = auth.user?.id;
        if (!userId) {
            console.warn(`Expecting user id but ${userId} given`)
            return;
        };
        window.Echo.private(`App.Models.User.${userId}`)
          .notification((notification) => {
            fetchNotifications()
          });
    };
    const handleMarkAsReadNotification = async (notification) => {
        if (!notification?.id) {
            console.warn(`Notification id is required but ${notification?.id} is given`);
            return;
        }
        if (notification?.read_at) {
            return;
        }
        try {
            await markAsReadNotification(notification.id);
            
            // Update the notification in the list
            notifications.value = notifications.value.map(n => 
                n.id === notification.id 
                    ? { ...n, read_at: new Date().toISOString() }
                    : n
            );
            // Update unread count
            unreadCount.value = Math.max(0, unreadCount.value - 1);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    }

    const fetchNotifications = async () => {
        await handleAsyncRequestOperation(getNotifications,(response) => {
            setNotifications(response.data?.data);
        },isFetchLoading, isFetchError);
    }

    const markAsReadNotification = async (id) => {
        return window.axios.patch(`api/v1/user/notifications/${id}/mark-as-read`)
    }
   
    const getNotifications = async () => {
        return window.axios.get("api/v1/user/notifications");
    }

    return {
        fetchNotifications,
        setupEcho,
        handleMarkAsReadNotification,
        unreadCount,
        notifications,
        isFetchLoading,
        isFetchError
    }
});