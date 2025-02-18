<script setup lang="ts">
import CommentOption from './CommentOption.vue';

</script>
<template>
    <div class="bg-gray-50 rounded-2xl p-4">
        <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
                <h4 class="font-medium text-gray-800">Sarah Chen</h4>
                <span class="text-sm text-gray-500">Product Manager</span>
                <span class="text-sm text-gray-400">• 2 hours ago</span>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-1 hover:bg-gray-200 rounded transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
        <p class="mt-2 text-gray-700">We need to ensure this authentication system supports both email/password and social login options. Please refer to the security requirements document for specific implementation details.</p>
        <CommentOption/>
    </div>
</template>