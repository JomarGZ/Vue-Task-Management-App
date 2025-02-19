<script setup lang="ts">
import { computed } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentForm from './forms/CommentForm.vue';
import { formatDateDistance } from '@/composables/useFormatters';
const props = defineProps({
    comments: Array,
    isFetchLoading: Boolean,
    isFetchError: Boolean
})
const hasComments = computed(() => props.comments?.length > 0);
const commentCounts = computed(() => props.comments?.length || 0);
const latestActivity = computed(() => {
  if (!props.comments.length) return '';

  const latestDate = props.comments.reduce((latest, comment) => 
    new Date(comment?.created_at) > new Date(latest) ? comment?.created_at : latest
  ,props.comments[0]?.created_at); 

  return latestDate ? `Latest activity ${formatDateDistance(latestDate)}` : '';
});
</script>

<template>
     <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">Comments ({{ commentCounts }})</h3>
            <span v-if="latestActivity" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{{ latestActivity }}</span>
        </div>
        <!-- New Comment Input -->
        <div class="mb-8">
          <CommentForm class="flex gap-4"/>
        </div>
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
</template>