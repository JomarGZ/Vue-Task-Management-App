import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAuth } from "./auth";
import { useSweetAlert } from "@/composables/useSweetAlert2";

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
    const editingComment = ref(null);   
    
    const { showToast, showConfirmDialog } = useSweetAlert();
    const setEditingComment = (comment) => editingComment.value = comment || null;
    const cancelEdit = () => editingComment.value = null

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
            if (!taskId) {
                throw new Error(`Task ID is required. Recieved: ${taskId}`);
            }
            if (!values || typeof values !== 'object') {
                throw new Error(`Values must be a non empty object. Recieved: ${values}`);
            } 
     
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

             comments.value.data = [newComment, ...(comments.value.data || [])];

            const { data } = await window.axios.post('api/v1/comments', {
                content: values.content,
                commentable_id: taskId,
                commentable_type: 'App\\Models\\Task'
            });
            const commentIndex = comments.value?.data?.findIndex(c => c.id === newComment.id);
            if (commentIndex !== -1) {
                comments.value.data[commentIndex] = data.data;
            }
            return true;
        } catch(e) {
            comments.value.data = comments.value.data.filter(c => !c.id.startsWith('temp-'))
            Object.assign(error, {
                hasError: true,
                message: e.response?.data?.message || 'Failed to create new comment',
                status: e.response?.status
            })
            throw e;
        } finally {
            loading.value = false
        }

    }

    const editComment = async (commentId, values) => {
        if (loading.value) return;
        loading.value = true;

        resetError();
        try {
            if (!commentId) throw new Error(`Comment ID is required. Recieved: ${commentId}`);
            if (!values || typeof values !== 'object') throw new Error(`Values must be a non empty object. Recieved ${values}`);

            const { data } = await window.axios.put(`api/v1/comments/${commentId}`,{content: values.content});
            const commentIndex = comments.value.data.findIndex(C => C.id === commentId);
            if (commentIndex !== -1 && data.data) {
                comments.value.data[commentIndex] = data.data;
            }
             return true;
        } catch(e) {
            Object.assign(error, {
                hasError: true,
                message: e.response?.data?.message || 'Failed to edit comment',
                status: e.response?.status
            })
            throw e;
        } finally {
            loading.value = false
        }
    }

    const deleteComment = async (commentId) => {
        if(loading.value) return;
        loading.value = true;
        resetError();

        try {
            return await showConfirmDialog()
                .then((async result => {
                    if (!result.isConfirmed) {
                        return;
                    }
                    try {
                        if (!commentId) throw new Error(`Comment ID is required. Recieved: ${commentId}`);

                        await window.axios.delete(`api/v1/comments/${commentId}`);
                        comments.value.data = comments.value.data.filter(c => c.id !== commentId);
                        comments.value.meta.total = comments.value.meta.total - 1;
                        showToast('Comment deleted successfuly');
                    } catch (e) {
                        Object.assign(error, {
                            hasError: true,
                            message: e.response?.data?.message || 'Failed to delete comment',
                            status: e.response?.status
                        })
                        showToast('Comment deletion failed', 'error');
                        throw e;
                    }
                }))
        } finally {
            loading.value = false
        }
      
    }
    return {
        comments,
        error,
        loadComments,
        setEditingComment,
        editingComment,
        deleteComment,
        editComment,
        cancelEdit,
        addComment,
        isFetching
    }
});