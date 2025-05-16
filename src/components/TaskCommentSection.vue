<script setup>
import { Icon } from '@iconify/vue';
import CommentItem from './CommentItem.vue';
defineProps({
    comments: {
        type: Array,
        default: () => ([
           
        ])
    },
    loading: {
        type: Boolean,
        default: false
    }
})
defineEmits(['load-more'])
</script>

<template>
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Activity</h3>
            
            <div class="border-l relative border-gray-200 pl-6 pb-6 space-y-6 max-h-[600px] min-h-11 overflow-auto">
                <div v-if="false" class="text-center absolute inset-0 flex items-center justify-center text-gray-300"><Icon icon="eos-icons:loading" width="50" height="50" /></div>
                <div v-else-if="error" class="text-center text-red-600 capitalize"><p>{{ error }}</p></div>
                <template v-else-if="comments.length">
                     <CommentItem
                        v-for="comment in comments"
                        :key="comment.id"
                        :created_at="comment.created_at"
                        :content="comment.content"
                        :author_name="comment.author?.name"
                        avatar="https://randomuser.me/api/portraits/men/32.jpg"
                    />
                    <button @click="$emit('load-more')" class="flex hover:text-blue-500 cursor-pointer items-center justify-center mx-auto">
                        Load More (5 remaining)   
                    </button>
                </template>
                <div v-else class="text-center text-gray-500">No comments yet. Be the first to comment!</div>
            </div>
            
            <div class="flex mt-6">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                <div class="flex-1">
                    <form>
                        <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Add a comment or update..."></textarea>
                        <div class="flex justify-between items-center mt-2">
                            <div class="flex space-x-2">
                                <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                    <i class="fas fa-paperclip mr-1"></i> Link
                                </button>
                                <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                    <i class="fas fa-stopwatch mr-1"></i> Time
                                </button>
                                <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                    <i class="fas fa-tag mr-1"></i> Status
                                </button>
                            </div>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>