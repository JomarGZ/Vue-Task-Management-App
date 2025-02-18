<script setup lang="ts">
import CommentItem from './CommentItem.vue';

</script>

<template>
     <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">Comments (3)</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Latest activity 2h ago</span>
        </div>
        <!-- New Comment Input -->
        <div class="mb-8">
            <div class="flex gap-4">
                <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
                <div class="flex-grow">
                    <div class="bg-gray-50 rounded-2xl p-4">
                        <textarea 
                            class="w-full bg-transparent border-0 focus:ring-0 p-0 resize-none text-gray-700 placeholder-gray-400"
                            rows="3"
                            placeholder="Add your comment..."
                        ></textarea>
                        <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                            <div class="flex gap-2">
                                <button class="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                    </svg>
                                </button>
                                <button class="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            </div>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-y-6">
            <CommentItem/>
            <CommentItem/>
        </div>
    </div>
</template>