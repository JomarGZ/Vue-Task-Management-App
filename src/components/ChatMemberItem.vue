<script setup>
import { Icon } from '@iconify/vue';
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
    },
    isAuth: {
        type: Boolean,
        default: false
    }
})
defineEmits(['onPrivateChat']);
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
        <div class="ml-auto">
            <p v-if="isAuth" class="text-xs bg-gray-200 py-0.5 px-1.5 rounded-xl text-gray-500 font-semibold">Me</p>
            <button v-else @click="$emit('onPrivateChat')" class="text-gray-400 hover:text-primary-600 hover:bg-gray-200 p-1 rounded-lg cursor-pointer" title="Private Chat">
                <Icon icon="fluent-color:chat-more-16" width="20" height="20" />
            </button>
        </div>
    </li>
</template>