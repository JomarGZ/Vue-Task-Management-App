<script setup>
import { Icon } from '@iconify/vue';
import ChatForm from './ChatForm.vue';
import { useGeneralMessage } from '@/stores/generalMessageStore';
import { ref } from 'vue';
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})
const generalMessageStore = useGeneralMessage();
const isSending = ref(false);
const channelHandler = {
    general: async (content) => {
        if(isSending.value) return;
        isSending.value = true;
        try {
           return await generalMessageStore.storeMessage(content)
        } finally {
            isSending.value = false
        }

    },
    group: () => console.log('group channel'),
    direct: () => console.log('direct channel'),
}
const onMessageSend = (value) => {
    console.log(props.channel)
    console.log(value)
    const handler = channelHandler[props.channel.type] || (() => console.log('Unknown type'));
    const success = handler(value.content);
    if (success) {
        console.log('Message sent')
    } else {
        console.log('message not sent')
    }
}
</script>

<template>
    <div class="flex-1 flex flex-col bg-white">
        <!-- Chat Header -->
        <div class="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center">
                <div class="bg-primary-100 text-primary-600 p-2 rounded-lg mr-3">
                    <Icon icon="fluent-color:people-32" width="32" height="32" />
                </div>
                <div>
                    <h2 class="text-lg font-semibold">Team Discussion</h2>
                    <p class="text-xs text-gray-500">Active now: 5 members</p>
                </div>
            </div>
            <div class="flex space-x-4">
                <button class="text-gray-500 hover:text-primary-600 transition-colors">
                    <i class="fas fa-search"></i>
                </button>
                <button class="text-gray-500 hover:text-primary-600 transition-colors">
                    <i class="fas fa-phone"></i>
                </button>
                <button class="text-gray-500 hover:text-primary-600 transition-colors">
                    <i class="fas fa-video"></i>
                </button>
                <button class="text-gray-500 hover:text-primary-600 transition-colors">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
            <!-- Date divider -->
            <div class="flex items-center my-6">
                <div class="flex-1 border-t border-gray-200"></div>
                <span class="px-3 text-xs text-gray-500 bg-gray-50 rounded-full">Today, June 12</span>
                <div class="flex-1 border-t border-gray-200"></div>
            </div>
            
            <!-- Message 1 -->
            <div class="flex mb-6 group">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="h-10 w-10 rounded-full mr-3 flex-shrink-0">
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <span class="font-medium mr-2">Sarah Johnson</span>
                        <span class="text-xs text-gray-500">10:30 AM</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl">
                        <p>Hey team! I've just pushed the updates to the homepage design. Could everyone review when you get a chance?</p>
                    </div>
                    <div class="flex mt-2 space-x-4 text-xs text-gray-500">
                        <button class="flex items-center hover:text-primary-600">
                            <i class="far fa-smile mr-1"></i>
                            <span>Add reaction</span>
                        </button>
                        <button class="flex items-center hover:text-primary-600">
                            <i class="far fa-comment-dots mr-1"></i>
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Message 2 -->
            <div class="flex mb-6 group">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="h-10 w-10 rounded-full mr-3 flex-shrink-0">
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <span class="font-medium mr-2">Michael Chen</span>
                        <span class="text-xs text-gray-500">10:42 AM</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl">
                        <p>Just checked it out Sarah - looks great! The new color scheme is much more modern.</p>
                        <p class="mt-2">I did notice one small issue with the mobile menu alignment though.</p>
                    </div>
                    <div class="flex items-center mt-2">
                        <div class="flex -space-x-1 mr-3">
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">👍 2</span>
                            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">❤️ 1</span>
                        </div>
                        <div class="text-xs text-gray-500">
                            1 reply
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Message 3 (User's message) -->
            <div class="flex mb-6 group justify-end">
                <div class="flex-1 max-w-3xl">
                    <div class="flex items-center mb-1 justify-end">
                        <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity mr-2">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <span class="text-xs text-gray-500 mr-2">10:45 AM</span>
                        <span class="font-medium">You</span>
                    </div>
                    <div class="bg-sky-500 text-white p-4 rounded-lg shadow-xs max-w-3xl">
                        <p>Thanks for the quick feedback Michael. Sarah, can you address the mobile menu issue before our 2pm meeting?</p>
                    </div>
                    <div class="flex justify-end mt-2">
                        <div class="flex -space-x-1">
                            <span class="bg-white text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-200">👍 1</span>
                        </div>
                    </div>
                </div>
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" class="h-10 w-10 rounded-full ml-3 flex-shrink-0">
            </div>
            
            <!-- Task reference message -->
            <div class="flex mb-6 group">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" class="h-10 w-10 rounded-full mr-3 flex-shrink-0">
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <span class="font-medium mr-2">David Kim</span>
                        <span class="text-xs text-gray-500">10:52 AM</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl border-l-4 border-primary-500">
                        <div class="text-xs text-gray-500 mb-2">Linked a task</div>
                        <div class="bg-gray-50 p-3 rounded border border-gray-200">
                            <div class="font-medium text-primary-600 flex items-center">
                                <i class="fas fa-tasks mr-2"></i>
                                [TASK-124] Implement new homepage design
                            </div>
                            <div class="text-sm text-gray-600 mt-1">Update homepage layout and components according to new brand guidelines</div>
                            <div class="flex items-center mt-2 text-xs">
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded mr-2 flex items-center">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                    In Progress
                                </span>
                                <span class="text-gray-500">Due today</span>
                            </div>
                        </div>
                        <p class="mt-3">I've linked the task for tracking purposes.</p>
                    </div>
                    <div class="flex mt-2 space-x-4 text-xs text-gray-500">
                        <button class="flex items-center hover:text-primary-600">
                            <i class="far fa-smile mr-1"></i>
                            <span>Add reaction</span>
                        </button>
                        <button class="flex items-center hover:text-primary-600">
                            <i class="far fa-comment-dots mr-1"></i>
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Message Input -->
       <ChatForm :isLoading="isSending" @submit-message="onMessageSend"/>
    </div>
</template>