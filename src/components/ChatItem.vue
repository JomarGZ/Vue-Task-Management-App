<script setup>
import { formatDateDistance } from '@/composables/useFormatters';
import SimpleAvatar from './SimpleAvatar.vue';

defineProps({
    IsChatOwner : {
        type: Boolean,
        default: false
    },
    created_at: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required:true
    },
    avatar: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    }
})

</script>
<template>
    <template v-if="IsChatOwner">
        <div class="flex mb-6 group justify-end">
            <div class="flex-1 max-w-3xl">
                <div class="flex items-center mb-1 justify-end">
                    <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity mr-2">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <span class="text-xs text-gray-500 mr-2">{{ formatDateDistance(created_at) }}</span>
                    <span class="font-medium">You</span>
                </div>
                <div class="bg-sky-500 text-white p-4 rounded-lg shadow-xs max-w-3xl">
                    <p>{{ content }}</p>
                </div>
                <div class="flex justify-end mt-2">
                    <div class="flex -space-x-1">
                        <span class="bg-white text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-200">👍 1</span>
                    </div>
                </div>
            </div>
            <SimpleAvatar :name="authorName" :avatar="avatar" class="ml-3"/>
        </div>
    </template>
    <template v-else>
        <div class="flex mb-6 group">
            <SimpleAvatar :name="authorName" :avatar="avatar" class="mr-3"/>
            <div class="flex-1">
                <div class="flex items-center mb-1">
                    <span class="font-medium mr-2 capitalize">{{ authorName }}</span>
                    <span class="text-xs text-gray-500">{{ formatDateDistance(created_at)  }}</span>
                    <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl">
                    <p>{{ content }}</p>
                </div>
                <div class="flex items-center mt-2">
                    <div class="flex -space-x-1 mr-3">
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">👍 2</span>
                    </div>
                    <div class="text-xs text-gray-500">
                        1 reply
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>