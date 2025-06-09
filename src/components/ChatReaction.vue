<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps({
    like_count: {
        type: Number,
        default: 0
    },
    reply_count: {
        type: Number,
        default: 0
    }
})
defineEmits(['on-like', 'on-reply'])
</script>

<template>
    <div class="flex -space-x-1 mr-3 items-center justify-center gap-2">
        <button v-if="like_count" type="button" @click="$emit('on-like')" class="bg-blue-100 cursor-pointer text-blue-800 text-xs px-2 py-1 rounded-full">👍 2</button>
        <button v-else @click="$emit('on-like')" type="button" class="text-gray-500 cursor-pointer hover:text-gray-700"><Icon icon="bxs:like" width="15" height="15" /></button>
        <button type="button" @click="$emit('on-reply')"  class="cursor-pointer hover:text-gray-600 text-sm text-gray-400">Reply <span v-if="reply_count">({{ reply_count }})</span></button>
    </div>
</template>