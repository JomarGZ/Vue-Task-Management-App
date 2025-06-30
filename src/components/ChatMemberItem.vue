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
    },
    unreadCount: {
        type: Number,
        default: 10
    },
    isOnline: {
        type: Boolean,
        default: false
    }
})

defineEmits(['onPrivateChat']);
</script>

<template>
    <li class="flex items-center py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors relative">
        <div class="relative">
            <SimpleAvatar
                :name="name"
                :avatar="avatar"
            />
            <!-- Online status indicator -->
            <span v-if="isOnline && !isAuth" 
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full">
            </span>
        </div>
        
        <div class="ml-2 min-w-0 flex-1">
            <p class="text-sm font-medium capitalize truncate">{{ name }}</p>
            <p class="block text-xs text-gray-500 capitalize truncate">{{ position }}</p>
        </div>
        
        <div class="ml-auto flex items-center">
            <p v-if="isAuth" class="text-xs bg-gray-200 py-0.5 px-1.5 rounded-xl text-gray-500 font-semibold">Me</p>
            <template v-else>
                <!-- Single unread count badge next to chat button -->
                <span v-if="unreadCount > 0" 
                      class="mr-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                    {{ unreadCount > 9 ? '9+' : unreadCount }}
                </span>
                <button @click="$emit('onPrivateChat')" 
                        class="text-gray-400 hover:text-primary-600 hover:bg-gray-200 p-1 rounded-lg cursor-pointer" 
                        title="Private Chat">
                    <Icon icon="fluent-color:chat-more-16" width="20" height="20" />
                </button>
            </template>
        </div>
    </li>
</template>