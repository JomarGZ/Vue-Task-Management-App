<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    like_count: {
        type: Number,
        default: 0
    },
    is_liked: {
        type: Boolean,
        default: false
    }
})

defineEmits(['on-like'])
</script>
<template>
    <div class="bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
        <button v-if="is_liked" type="button" @click="$emit('on-like')" class="bg-blue-100 cursor-pointer text-blue-800 text-xs px-2 py-1 rounded-full">👍 {{ like_count }}</button>
        <button v-else @click="$emit('on-like')" type="button" class="text-gray-500 cursor-pointer flex items-center justify-center hover:text-gray-700"><Icon icon="bxs:like" width="15" height="15" /> <span v-if="like_count">{{ like_count }}</span></button>
    </div>
</template>