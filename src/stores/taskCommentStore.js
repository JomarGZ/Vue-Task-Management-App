import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAuth } from "./auth";

export const useTaskComments = defineStore("task-comments", () => {
    const isFetching = ref(false);
    const auth = useAuth();
    const loading = ref(false);
    const error = reactive({
        hasError: false,
        status: null,
        message: '',
        details: null,
        isNetworkError: false
    });

    const comments = ref({});
    const resetError = () => {
        Object.assign(error, {
            hasError: false,
            status: null,
            message: '',
            details: null,
            isNetworkError: false
        })
    }
    const loadComments = async(taskId, loadMore = false) => {
        if (isFetching.value) return;
        isFetching.value = true;
        resetError();
        try {
            if (!taskId) {
                throw new Error(`Task ID is required. Recieved: ${taskId}`)
            }
            const pageLoad = loadMore ? comments.value?.meta?.current_page + 1 : 1;
            const { data } = await window.axios.get(`api/v1/tasks/${taskId}/comments?page=${pageLoad}`);
            comments.value = loadMore 
                ? {
                    data: [...comments.value.data, ...data.data],
                    meta: data.meta,
                    links: data.links
                } : data;
        } catch (err) {
            Object.assign(error, {
                hasError: true,
                message: err.response?.data?.message || 'Failed to load comments',
                status: err.response?.status
            })
        } finally {
            isFetching.value = false;
        }
    }

    const addComment = async (values, taskId) => {
        if (loading.value) return;
        loading.value = true

        resetError();
        try {
            if (!taskId) throw new Error(`Task ID is required. Recieved: ${taskId}`)
            if (!values && typeof values === 'object') throw new Error(`Values must be a non empty object. Recieved: ${values}`); 
          
     
            const newComment = {
                id: `temp-${new Date()}`,
                content: values.content,
                created_at: new Date().toISOString(),
                user: {
                    id: auth.user?.id,
                    name: auth.user?.name,
                    avatar: {
                        'thumb-60': auth.user?.avatar?.['thumb-60'] || ""
                    }
                }
            }

            comments.value?.data.unshift(newComment);

            const preparedData = {
                content: values?.content,
                commentable_id: taskId,
                commentable_type: 'App\\Models\\Task'
            }
            const { data } = await window.axios.post('api/v1/comments', preparedData)
            const index = comments.value?.data?.findIndex(c => c.id === newComment.id);
            if (index !== -1) {
                comments.value.data[index] = data.data;
            }
        } catch(e) {
            comments.value.data = comments.value.data.filter(c => !c.id.startWith('temp-'))
            Object.assign(error, {
                hasError: true,
                message: e.response?.data?.message || 'Failed to create new comment',
                status: e.response?.status
            })
        } finally {
            loading.value = false
        }

    }
    return {
        comments,
        error,
        loadComments,
        addComment,
        isFetching
    }
});