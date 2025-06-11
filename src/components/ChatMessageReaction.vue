<script setup>
import ChatLike from './ChatLike.vue';

defineProps({
    like_count: {
        type: Number,
        default: 0
    },
    reply_count: {
        type: Number,
        default: 0
    },
    is_liked: {
        type: Boolean,
        default: false
    }
})
defineEmits(['on-like', 'on-reply'])
</script>
<template>
    <div class="flex -space-x-1 mr-3 items-center justify-center gap-2">
        <ChatLike @on-like="$emit('on-like')" :like_count="like_count" :is_liked="is_liked"/>
        <button type="button" @click="$emit('on-reply')"  class="cursor-pointer hover:text-gray-600 text-sm text-gray-400">Reply <span v-if="reply_count">({{ reply_count }})</span></button>
    </div>
</template>