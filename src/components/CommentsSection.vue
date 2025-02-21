<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentForm from './forms/CommentForm.vue';
import { formatDateDistance } from '@/composables/useFormatters';
import { subscribeToChannel } from '@/composables/useUtil';
import { useTaskComments } from '@/stores/taskCommentStore';
import { useAuth } from '@/stores/auth';
const props = defineProps({
    comments: Array,
    content: String,
    isFetchLoading: Boolean,
    isFetchError: Boolean
})
const {authId} = useAuth();
const taskComment = useTaskComments();
const emit = defineEmits(['update:content', 'submit-comment']);
const hasComments = computed(() => props.comments?.length > 0);
const commentCounts = computed(() => props.comments?.length || 0);
const latestActivity = computed(() => {
  if (!props.comments.length) return '';

  const latestDate = props.comments.reduce((latest, comment) => 
    new Date(comment?.created_at) > new Date(latest) ? comment?.created_at : latest
  ,props.comments[0]?.created_at); 

  return latestDate ? `Latest activity ${formatDateDistance(latestDate)}` : '';
});
const handleRealTimeCommentAdd = (event) => {
    if (!event) return;
        const isOwnComment = event.data.author.id === authId;
        if (isOwnComment) return;

        taskComment.setAddComment(event.data);
}
const contentModel = computed({
    get: () => props.content,
    set: (value) => emit('update:content', value) 
})
let unsubscribe = null;
onMounted(() => {
    unsubscribe = subscribeToChannel('task.comment.created', 'CommentCreated',handleRealTimeCommentAdd);
})
onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe(); //stop channel listening
    }
})
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col max-h-[40rem]">
        <!-- Fixed Header -->
        <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">Comments ({{ commentCounts }})</h3>
                <span v-if="latestActivity" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{{ latestActivity }}</span>
            </div>
        </div>

        <!-- Fixed Comment Form -->
        <div class="p-6 border-b border-gray-100">
            <CommentForm class="flex gap-4" v-model:content="contentModel" @submit-comment="$emit('submit-comment', $event)"/>
        </div>

        <!-- Scrollable Comments Section -->
        <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar-light">
            <div class="space-y-6">
                <div v-if="isFetchLoading" class="flex items-center justify-center p-4 w-full">
                    <IconSpinner name="custom-spinner" class="h-8 w-8 opacity-40"/>
                </div>
                <div v-else-if="isFetchError" class="text-center text-gray-500">
                    <span>Failed to load comments</span>
                </div>
                <template v-else-if="hasComments">
                   <CommentItem
                      v-for="comment in comments"
                      :key="comment?.id"
                      :comment="comment"
                      :replies="comment?.replies" />
                </template>
                <div v-else class="text-center text-gray-500">
                    <span>No Comments Found</span>
                </div>
            </div>
        </div>
    </div>
</template>