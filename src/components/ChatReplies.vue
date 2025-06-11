<script setup>
import { formatDateDistance } from '@/composables/useFormatters';
import SimpleAvatar from './SimpleAvatar.vue';
import ChatLike from './ChatLike.vue';

defineProps({
    showReplies: {
        type: Boolean,
        default: false
    },
    replies: {
        type: Array,
        default: () => ([])
    },
    isActionLoaded: {
        type: Boolean,
        default: false
    }
})
defineEmits(['on-like']);
</script>

<template>
    <div v-if="showReplies && replies.length" class="mt-4 pl-6 border-l-2 flex flex-col-reverse border-sky-200 overflow-y-auto max-h-[400px]">
        <div v-for="reply in replies" :key="reply.id" class="mb-4 group relative">
            <div class="flex items-center mb-1 px-3 pt-3">
                <SimpleAvatar :name="reply?.user?.name" :avatar="reply?.user?.avatar?.['thumb-60']" size="xs" class="mr-2"/>
                <span class="font-medium text-sm mr-2">{{ reply.user?.name }}</span>
                <span class="text-xs text-gray-500">{{ formatDateDistance(reply.created_at) }}</span>
            </div>
            <div class="px-3 pb-3">
                <div class="bg-sky-50/50 p-3 rounded-lg text-sm relative border border-sky-100">
                    <p class="pr-6 text-gray-700">{{ reply.content }}</p>
                    <div class="absolute -bottom-3 right-2">
                        <ChatLike 
                            @on-like="$emit('on-like', reply)" 
                            :like_count="reply.reaction_count"
                            :is_liked="reply.is_liked"
                            :isActionLoaded="isActionLoaded"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>