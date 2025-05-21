import { useSweetAlert } from "@/composables/useSweetAlert2";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTaskLink = defineStore('task-links', () => {
    const loading = ref(false);
    const editingLink = ref(null);
    const error = reactive({
          hasError: false,
          status: null,
          message: '',
          details: null,
          isNetworkError: false
      });
    const { showToast, showConfirmDialog } = useSweetAlert();
    const resetError = () => {
        Object.assign(error, {
            hasError: false,
            status: null,
            message: '',
            details: null,
            isNetworkError: false
        })
    }
    const addLink = async (taskId, values) => {
        if (loading.value) return;
        loading.value = true;
        resetError();

        try {
            if (!taskId){
                throw new Error(`Task ID is required to store task link. Recieved: ${taskId}`);
            }
            if (!values || typeof values !== 'object') {
                throw new Error(`Values is required to store task link. Recieved: ${values}`);
            }
            await window.axios.post(`api/v1/tasks/${taskId}/links`,values);
            showToast('Link added successfully');
            return true;
        } catch(e) {
            Object.assign(error, {
                hasError: true,
                message: e.response.message || 'Failed to store task link'
            });
            throw e;
        }  finally {
            loading.value = false
        }
    }

    const deleteLink = async (linkId) => {
         if (loading.value) return;
        loading.value = true;
        resetError();

        try {
            return await showConfirmDialog()
                .then((async result => {
                    if (!result.isConfirmed) {
                        return;
                    }

                    try {
                        if (!linkId){
                            throw new Error(`Link ID is required to store task link. Recieved: ${linkId}`);
                        }
                        await window.axios.delete(`api/v1/tasks/links/${linkId}`);
                        showToast('Link deleted successfully');
                        return true;
                    } catch(e) {
                        Object.assign(error, {
                            hasError: true,
                            message: e.response.message || 'Failed to delete task link'
                        });
                        throw e;
                    } 
                }))
        } finally {
            loading.value = false
        }
    }

    const editLink = async (linkId, values) => {
        if (loading.value) return;
        loading.value = true;
        resetError();

        try {
            if (!linkId){
                throw new Error(`Link ID is required to store task link. Recieved: ${linkId}`);
            }
            if (!values || typeof values !== 'object') {
                throw new Error(`Values is required to store task link. Recieved: ${values}`);
            }
            await window.axios.put(`api/v1/tasks/links/${linkId}`,values);
            showToast('Link added successfully');
            return true;
        } catch(e) {
            Object.assign(error, {
                hasError: true,
                message: e.response?.message || 'Failed to store task link'
            });
            throw e;
        }  finally {
            loading.value = false
        }
    }
    return {
        addLink,
        editLink,
        error,
        loading,
        editingLink,
        deleteLink,
    }
});