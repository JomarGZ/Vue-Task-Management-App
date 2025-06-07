<script setup>
import SimpleAvatar from './SimpleAvatar.vue';

defineProps({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <li class="flex items-center py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
        <SimpleAvatar
            :name="name"
            :avatar="avatar"
        />
        <div class="ml-2 min-w-0">
            <p class="text-sm font-medium capitalize truncate">{{ name }}</p>
            <p class="block text-xs text-gray-500 capitalize truncate">{{ position }}</p>
        </div>
        <button class="ml-auto text-gray-400 hover:text-primary-600">
            <i class="fas fa-ellipsis-h"></i>
        </button>
    </li>
</template>