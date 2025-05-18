<script setup>
import { computed } from 'vue';
import ReadMore from './ReadMore.vue';
import UserAvatar from './UserAvatar.vue';
import { formatDateDistance } from '@/composables/useFormatters';
const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    created_at: {
        type: String,
        required: true
    }
})

const timeCreated = computed(() => props.created_at?.trim().length > 0 ? formatDateDistance(props.created_at) : '');
</script>
<template>
    <div class="relative">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
        <div class="flex items-center mb-1 min-w-0">
            <user-avatar :name="author_name" :avatar="avatar"/>
            <span class="font-medium text-sm truncate">{{ author_name }}</span>
            <span class="text-xs text-gray-500 ml-2 shrink-0">{{ timeCreated }}</span>
        </div>
        <div class="bg-gray-100 p-3 rounded-lg text-sm text-gray-600 ml-8">
            <ReadMore max-height="120px">
                <p>{{ content }}</p>
            </ReadMore>
        </div>
    </div>
</template>