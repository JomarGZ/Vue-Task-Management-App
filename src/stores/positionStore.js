import { useSweetAlert } from "@/composables/useSweetAlert2";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePosition = defineStore("position", () => {
    const isFetchLoading = ref(false);
    const positions = ref({});
    const position = ref({});
    const { showToast, showConfirmDialog } = useSweetAlert();
    const fetchPositions = async (page = 1) => {
        if (isFetchLoading.value) return;
        isFetchLoading.value = true;
        try {
            const response = await window.axios.get(`api/v1/positions?page=${page}`);
            positions.value = response.data || {};
        } catch (error) {
            console.error("Error fetching positions:", error);
        } finally {
            isFetchLoading.value = false;
        }
    }

    const fetchPosition = async (positionId) => {
        if (!positionId) return;
        try {
            const response = await window.axios.get(`api/v1/positions/${positionId}`);
            position.value = response.data?.data || {};
        } catch (error) {
            console.error("Error fetching position:", error);
        }
    }

    const storePosition = async (data) => {
        if (!data) return;

        try {
            const response = await window.axios.post("api/v1/positions", data);
            showToast("Position created successfully");
            await fetchPositions();
            return true;
        } catch (error) {
            console.error("Error storing position:", error);
            showToast("Position created failed", 'error');

            return false;
        }
    }

    const updatePosition = async (positionId, data) => {
        if (!data) return;

        try {
            const response = await window.axios.put(`api/v1/positions/${positionId}`, data);
            showToast("Position updated successfully");
            fetchPositions();
            return true;
        } catch (error) {
            console.error("Error updating position:", error);
            showToast("Position updated failed", 'error');
            return false;
        }
    }
    const deletePosition = async (positionId) => {
        if (!positionId) return;

        showConfirmDialog()
        .then((async result => {
            if (result.isConfirmed) {
                try {
                    const response = await window.axios.delete(`api/v1/positions/${positionId}`);
                    showToast("Position deleted successfully");
                    fetchPositions();
                } catch (error) {
                    console.error("Error deleting position:", error);
                    showToast("Position deletion failed", 'error');
                }
            } else {
                return Promise.reject("User cancelled the action");
            }
        }))
    }
    return {
        positions,
        deletePosition,
        updatePosition,
        isFetchLoading,
        fetchPosition,
        position,
        storePosition,
        fetchPositions,
    }
});