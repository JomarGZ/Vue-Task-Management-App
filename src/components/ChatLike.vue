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
    },
    isActionLoaded: {
        type: Boolean,
        default: false
    },
    likes_by: {
        type: Array,
        default: () => ([])
    }
})

defineEmits(['on-like'])
</script>

<template>
    <div class="relative">
        <div class="bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
            <button 
                type="button" 
                @click="$emit('on-like')" 
                :disabled="isActionLoaded" 
                class="relative cursor-pointer text-xs px-2 py-1 rounded-full group/like"
                :class="{
                    'bg-blue-100 text-blue-800 hover:bg-blue-200': is_liked,
                    'text-gray-500 hover:text-gray-700': !is_liked
                }"
            >
                <span class="flex items-center justify-center">
                    <Icon v-if="!is_liked" icon="bxs:like" width="15" height="15" />
                    <span v-else>👍</span>
                    <span v-if="like_count" class="ml-1">{{ like_count }}</span>
                </span>

                <!-- User list that appears on hover -->
                <div 
                    v-if="like_count > 0 && likes_by.length > 0"
                    class="absolute hidden group-hover/like:block bottom-full mb-2 left-0 bg-white rounded-md shadow-lg border border-gray-200 p-2 w-48 z-10"
                >
                    <h3 class="text-xs font-semibold text-gray-500 mb-2">Liked by</h3>
                    <ul class="space-y-2">
                        <li v-for="user in likes_by" :key="user.id" class="flex items-center space-x-2">
                            <img 
                                :src="user.avatar?.['thumb-60']" 
                                :alt="user.name" 
                                class="w-6 h-6 rounded-full object-cover"
                                :onerror="this.src='https://i.pravatar.cc/150?img=3'"
                            >
                            <span class="text-sm capitalize">{{ user.name }}</span>
                        </li>
                    </ul>
                </div>
            </button>
        </div>
    </div>
</template>