import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTaskComments = defineStore("task-comments", () => {
    const isFetchLoading = ref(false);
    const isFetchError = ref(false);
    const isStoreLoading = ref(false);
    const isStoreError = ref(false);
    const comments = ref([]);
    const errors = ref([]);
    const form = reactive({
        content: ''
    });
    const resetForm = () => {
        form.content = '';
    }
    const setComments = (data) => {
        if(!data) return;
        comments.value = data;
    }
    const fetchComments = async (task) => {
        await handleAsyncRequestOperation(() => getComments(task), (response) => {
            setComments(response.data?.data);
        }, isFetchLoading, isFetchError)
    }
    const getComments = async (task) => {
        if (!task) return;
        return window.axios.get(`api/v1/tasks/${task.id}/comments`)
    }
    const handleAddComment = async (task) => {
        await handleAsyncRequestOperation(() => addComment(task), (response) => {
            console.log(response?.data?.data);
            if (response?.status === 201) {
                comments.value.unshift(response?.data?.data);
            }
        }, isStoreLoading, isStoreError, handleError); 
    }
    const handleError = (error) => {
        console.log(error);
    }

    const addComment = async (task) => {
        if (!task) return;
        return window.axios.post(`api/v1/tasks/${task?.id}/comments`, form)
    }
    return {
        fetchComments,
        setComments,
        resetForm,
        handleAddComment,
        errors,
        form,
        isStoreError,
        isStoreLoading,
        comments,
        isFetchLoading,
        isFetchError,
    }
});