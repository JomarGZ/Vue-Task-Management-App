import { defineStore } from "pinia";
import { ref } from "vue";
import { useSweetAlert } from "@/composables/useSweetAlert2";

export const useNotificationAction = defineStore("notificationAction", () => {
    const isFetchLoading = ref(false);
    const error = ref(null);
    const loading = ref(false);
    const isFetchError = ref(false);
    const { showToast, showConfirmDialog } = useSweetAlert();
   
    const setErrorNull = () => {
        error.value = null;
    }
  
    const markAsReadNotification = async (id) => {
        if (loading.value) return;
        loading.value = true;
        setErrorNull();
        try {
            if (!id) {
                throw new Error(`Notification ID is required to mark as read. Recieved: ${id}`);
            }
            await window.axios.patch(`api/v1/user/notifications/${id}`);
            return true;
        } catch (e) {
            console.error("Failed to mark notification as read:", e);
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }
    
    const markAllAsRead = async () => {
        if (loading.value) return;
        loading.value = true;
        setErrorNull();
        try {   
            await window.axios.post('api/v1/user/notifications/mark-all-as-read');
            return true;
        } catch (e) {
            console.error('Failed to mark all notifications as read:', e);
            error.value = e.message;
            throw e
        } finally {
            loading.value = false;
        }
    }
    const deleteNotification = async (id) => {
        if (loading.value) return;
        loading.value = true;
        setErrorNull();

        try {
            await window.axios.delete(`api/v1/user/notifications/${id}`);
            showToast('Deleted notification successfully');
            return true;
        } catch (e) {
            console.error('Failed to delete notification:', e);
            showToast('Failed to delete notification', 'error');
            throw e;
        } finally {
            loading.value = false;
        }
    }

    const deleteAllNotifications = async () => {
        if (loading.value) return;
        loading.value = true;
        setErrorNull();

        try {
            return await showConfirmDialog()
                .then((async result => {
                    if (!result.isConfirmed) {
                        return false;
                    }
                    try {
                        await window.axios.post('api/v1/user/notifications/delete-all');
                        showToast('Deleted all notifications successfully');
                        return true;
                    } catch (e) {
                        console.error('Failed to delete all notifications:', e);
                        showToast('Failed to delete all notifications', 'error');
                        throw e;
                    }
                }))
        } finally {
            loading.value = false;
        }
    }
  

    return {
        deleteNotification,
        markAsReadNotification,
        deleteAllNotifications,
        markAllAsRead,
        isFetchLoading,
        isFetchError
    }
});