<template>
    <div class="flex items-center justify-between bg-gray-100 rounded-lg p-3 min-w-0">
        <div class="flex items-center min-w-0 flex-1 overflow-hidden">
            <user-avatar :name="name" :avatar="avatar" class="shrink-0"/>
            <div class="min-w-0 overflow-hidden max-w-[500px]">
                <div class="font-medium text-sm capitalize truncate">{{ name }}</div>
                <div class="text-xs text-gray-500 capitalize truncate">{{ position }}</div>
            </div>
        </div>
        <button @click="$emit('delete-item', id)" class="text-gray-400 hover:text-red-500 bg-red-50 p-2 rounded-full hover:bg-red-100 cursor-pointer transition-all duration-200 hover:scale-105 shrink-0">
            <Icon icon="iwwa:delete" width="17" height="17" />
        </button>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import UserAvatar from './UserAvatar.vue';
defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    }
})
defineEmits(['delete-item']);
</script>