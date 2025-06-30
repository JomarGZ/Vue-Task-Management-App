<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps({
    name: {
        type: String,
        required: true
    },
    unreadCount: {
        type: Number,
        default: 100
    }
});

defineEmits(['onSelectChannel']);
</script>

<template>
    <li class="relative group">
        <button 
            type="button" 
            @click="$emit('onSelectChannel')" 
            class="flex cursor-pointer items-center p-3 w-full rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600"
        >
            <Icon icon="token-branded:chat" width="24" height="24" />
            <span class="hidden md:block ml-3 font-medium capitalize">{{ name }}</span>
            
            <!-- Unread count badge -->
            <span 
                v-if="unreadCount > 0"
                class="absolute right-3 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium"
            >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
        </button>
    </li>
</template>