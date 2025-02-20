import { useSweetAlert } from "@/composables/useSweetAlert2";
import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTaskComments = defineStore("task-comments", () => {
    const isFetchLoading = ref(false);
    const isFetchError = ref(false);
    const isStoreLoading = ref(false);
    const isStoreError = ref(false);
    const isDeleteLoading = ref(false);
    const isDeleteError = ref(false);
    const {showToast, showConfirmDialog} = useSweetAlert();
    const comments = ref([]);

    const isEditMode = ref(false);
    const editCommentId = ref(null);
    const errors = ref([]);
    const form = reactive({
        content: ''
    });
    const clearEdit = () => {
        editCommentId.value = null;
        isEditMode.value = false;
        form.content = '';
    }
    const setEditContent = (commentToUpdate) => {
        if (commentToUpdate !== null && typeof commentToUpdate === 'object') {
            form.content = commentToUpdate?.content;
            isEditMode.value = true;
            editCommentId.value = commentToUpdate?.id;
        } else {
            console.error(`Expecting object but ${typeof commentToUpdate} given`);
        }
       
    }
    const resetForm = () => {
        form.content = '';
    }
    const setComments = (data) => {
        if(!data) return;
        comments.value = data;
    }
    const updateSelectedComment = (updatedComment) => {
        if (updatedComment !== null && typeof updatedComment === 'object'){
            const commentIndex = comments.value.findIndex(comment => comment.id === updatedComment.id);
            if (commentIndex !== -1) {
                comments.value[commentIndex] = updatedComment;
            } else {
                console.warn(`Comment with ID ${updatedComment.id} not found in the list`);
            }
        } else {
            console.error(`Expecting object but ${typeof updatedComment} given`);
        }
     
    }
    const handleError = (error) => {
        console.log(error);
    }
    const removeComment = (comment) => {
        if (!comment) return;
        comments.value = comments.value.filter(c => c.id !== comment.id);
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
    const handleSubmitComment = async (task) => {
        if (isEditMode.value) {
            await handleUpdateComment();
        } else {
            await handleAddComment(task);
        }
    }
 
    const handleAddComment = async (task) => {
        await handleAsyncRequestOperation(() => addComment(task), (response) => {
            console.log(response?.data?.data);
            if (response?.status === 201) {
                comments.value.unshift(response?.data?.data);
            }
        }, isStoreLoading, isStoreError, handleError); 
    }
    const handleUpdateComment = async () => {
        await handleAsyncRequestOperation(updateComment, (response) => {
            const updatedComment = response.data?.data;
            showToast('Comment updated successfully');
            updateSelectedComment(updatedComment);
            clearEdit();
        }, isStoreLoading, isStoreError, (error) => showToast('Comment update failed', 'error'));
    }
 
    const handleDeleteComment = async (comment) => {
        showConfirmDialog().then(async result => {
            if (result.isConfirmed) {
                await handleAsyncRequestOperation(() => deleteComment(comment), (response) => {
                    console.log(comment);
                    removeComment(comment);
                    showToast('Comment deleted Successfully');
                }, isDeleteLoading, isDeleteError, (error) => {
                    showToast('Comment delete failed', 'error');
                });
            }
        })
       
    }
    const addComment = (task) => {
        if (!task) return;
        return window.axios.post(`api/v1/tasks/${task?.id}/comments`, form)
    }

    const updateComment = () => {
        if (!editCommentId.value) return;
        return window.axios.put(`api/v1/comments/${editCommentId.value}`, form);
    }

    const deleteComment = (comment) => {
        if(!comment) return;
        return window.axios.delete(`api/v1/comments/${comment?.id}`);
    }
    return {
        fetchComments,
        setComments,
        resetForm,
        handleSubmitComment,
        handleDeleteComment,
        setEditContent,
        clearEdit,
        errors,
        editCommentId,
        isEditMode,
        form,
        isStoreError,
        isStoreLoading,
        comments,
        isFetchLoading,
        isFetchError,
    }
});