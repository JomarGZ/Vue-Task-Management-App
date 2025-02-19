import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskComments = defineStore("task-comments", () => {
    const isFetchLoading = ref(false);
    const isFetchError = ref(false);
    const comments = ref([]);
    const setComments = (data) => {
        if(!data) return;
        comments.value = data;
    }
    const fetchComments = async (task) => {
        await handleAsyncRequestOperation(() => getComments(task), (response) => {
            console.log(response);
            setComments(response.data?.data);
        }, isFetchLoading, isFetchError)
    }
    const getComments = async (task) => {
        return window.axios.get(`api/v1/tasks/${task.id}/comments`)
    }
    return {
        fetchComments,
        setComments,
        comments,
        isFetchLoading,
        isFetchError,
    }
});