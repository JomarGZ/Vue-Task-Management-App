<script setup lang="ts">
import { formatDateDistance } from '@/composables/useFormatters';
import CommentOption from './CommentOption.vue';
import { useTaskComments } from '@/stores/taskCommentStore';
import { ref } from 'vue';
const props = defineProps({
    comment: Object,
    author: Object
})
const taskComment = useTaskComments();
const isOpen = ref(false);
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
            <div class="relative inline-block opacity-0 group-hover:opacity-100 transition-opacity" ref="dropdownRef">
                <button
                    @click="isOpen = !isOpen"
                    class="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <IconSVG name="three-dot-svg"  class="w-4 h-4 text-gray-500"/>
                </button>
                <div
                v-if="isOpen"
                class="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                >
                    <div class="py-1">
                        <button
                            @click="handleEdit"
                            class="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left flex items-center"
                            >
                            <IconSVG name="edit-svg" class="w-4 h-4"/>
                        </button>
                            <button
                            @click="handleDelete"
                            class="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left flex items-center"
                            >
                            <IconSVG name="trash-svg"  class="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <p class="mt-2 text-gray-700">{{ comment?.content }}</p>
        <CommentOption @clicked-reply="$emit('clicked-reply')"/>
    </div>
</template>