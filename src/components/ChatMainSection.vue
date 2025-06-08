<script setup>
import { Icon } from '@iconify/vue';
import ChatForm from './ChatForm.vue';
import { useGeneralMessage } from '@/stores/generalMessageStore';
import { ref } from 'vue';
import { useMessage } from '@/stores/MessageStore';
import { useAuth } from '@/stores/auth';
import ChatItem from './ChatItem.vue';
const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})
const auth = useAuth();
const generalMessageStore = useGeneralMessage();
const messageStore = useMessage();
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
        messageStore.getMessages(props.channel?.id);
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
            <!-- <div class="flex items-center my-6">
                <div class="flex-1 border-t border-gray-200"></div>
                <span class="px-3 text-xs text-gray-500 bg-gray-50 rounded-full">Today, June 12</span>
                <div class="flex-1 border-t border-gray-200"></div>
            </div> -->
            
            <ChatItem
                v-for="m in messageStore.messages.data"
                :key="m.id"
                :IsChatOwner="m.user?.id === auth.authId"
                :author-name="m.user?.name"
                :avatar="m.user?.avatar?.['thumb-60']"
                :created_at="m.created_at"
                :content="m.content"

            />
        </div>
       <ChatForm :isLoading="isSending" @submit-message="onMessageSend"/>
    </div>
</template>