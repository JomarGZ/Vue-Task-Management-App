<script setup>
import { Icon } from '@iconify/vue';
import CommentItem from './CommentItem.vue';
import { computed, ref } from 'vue';
import { useTaskComments } from '@/stores/taskCommentStore';
import CommentForm from './CommentForm.vue';
const props = defineProps({
    taskId: {
        type: [String, Number],
        required: true
    }
})

const taskCommentStore = useTaskComments();
const activeMenuId = ref(null);
const hasMoreComments = computed(() => {
    return taskCommentStore.comments?.meta?.current_page < taskCommentStore.comments?.meta?.last_page;
});
const remainingCommentsCount = computed(() => {
    if (!taskCommentStore.comments?.meta) return 0;
    return Math.max(0, taskCommentStore.comments?.meta?.total - taskCommentStore.comments?.data?.length);
})
const onSubmit = async (value) => {
    if (taskCommentStore.editingComment) {
        const success = await taskCommentStore.editComment(taskCommentStore.editingComment?.id, value);
        if (success) {
            taskCommentStore.editingComment = null;
            activeMenuId.value = null
        };
    } else {
        await taskCommentStore.addComment(value, props.taskId)
    }
 
}
const hanndleMenuToggle = (commentId) => {
    activeMenuId.value = activeMenuId.value === commentId ? null : commentId
}
window.Echo.channel('task.comment.created')
    .listen('CommentCreated', (data) => {
        if (!data?.data) return;
        taskCommentStore.comments?.data?.unshift(data.data);
    });
</script>

<template>
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Activity</h3>
            
            <div class="border-l relative border-gray-200 pl-6 pb-6 space-y-6 max-h-[600px] min-h-11 overflow-auto">
                <div v-if="taskCommentStore.error.hasError" class="text-center text-red-600 capitalize"><p>{{ taskCommentStore.error.message }}</p></div>
                <template v-else-if="taskCommentStore.comments?.data?.length">
                     <CommentItem
                        v-for="comment in taskCommentStore.comments.data"
                        @menu-toggle="hanndleMenuToggle"
                        :key="comment.id"
                        :id="comment.id"
                        :created_at="comment.created_at"
                        :position="comment.user?.position"
                        :content="comment.content"
                        :author_name="comment.user?.name"
                        :is-menu-open="activeMenuId === comment.id"
                        @cancel-editing="taskCommentStore.cancelEdit"
                        :avatar="comment.avatar?.['thumb-60']"
                        @edit-comment="(value) => taskCommentStore.setEditingComment(value)"
                        @delete-comment="(values) => taskCommentStore.deleteComment(values.id)"
                    />
                  
                </template>
                <div v-else class="text-center text-gray-500">No comments yet. Be the first to comment!</div>
                <div class="flex justify-center mt-4">
                    <button 
                        v-if="hasMoreComments && !taskCommentStore.isFetching"
                        type="button"
                        @click="taskCommentStore.loadComments(taskId, true)"
                        class="hover:text-blue-500 cursor-pointer text-gray-600 font-semibold"
                    >
                        Load More ( {{remainingCommentsCount}} remaining)
                    </button>
                    <div v-if="taskCommentStore.isFetching" class="text-gray-400 text-2xl">
                        <Icon icon="eos-icons:three-dots-loading" width="100" height="50" />
                    </div>
                </div>
            </div>
            <comment-form 
                @comment-submit="onSubmit" 
                :loading="taskCommentStore.loading"
                :editingComment="taskCommentStore.editingComment"
                @cancel-editing="taskCommentStore.editingComment = null"
            />
        </div>
    </div>
</template>