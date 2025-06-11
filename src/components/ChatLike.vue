<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    like_count: {
        type: Number,
        default: 0
    }
})

defineEmits(['on-like'])
</script>
<template>
    <div class="bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
        <button v-if="like_count" type="button" @click="$emit('on-like')" class="bg-blue-100 cursor-pointer text-blue-800 text-xs px-2 py-1 rounded-full">👍 2</button>
        <button v-else @click="$emit('on-like')" type="button" class="text-gray-500 cursor-pointer hover:text-gray-700"><Icon icon="bxs:like" width="15" height="15" /></button>
    </div>
</template>