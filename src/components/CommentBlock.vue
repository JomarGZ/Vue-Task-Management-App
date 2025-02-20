<script setup lang="ts">
import { formatDateDistance } from '@/composables/useFormatters';
import CommentOption from './CommentOption.vue';
import { useTaskComments } from '@/stores/taskCommentStore';
const props = defineProps({
    comment: Object,
    author: Object
})
const taskComment = useTaskComments();

const handleDelete = async () => {
     await taskComment.handleDeleteComment({id: props.comment?.id});
}
const emit = defineEmits(['clicked-reply']);
</script>
<template>
    <div class="bg-gray-50 rounded-2xl p-4">
        <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
                <h4 class="font-medium text-gray-800">{{ author?.name }}</h4>
                <span class="text-sm text-gray-500">Product Manager</span>
                <span class="text-sm text-gray-400">• {{ formatDateDistance(comment?.created_at) }}</span>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="handleDelete" class="p-1 hover:bg-gray-200 rounded-full transition-colors" title="delete">
                    <IconSVG name="x-svg" class="w-4 h-4 text-gray-500"/>
                </button>
            </div>
        </div>
        <p class="mt-2 text-gray-700">{{ comment?.content }}</p>
        <CommentOption @clicked-reply="$emit('clicked-reply')"/>
    </div>
</template>