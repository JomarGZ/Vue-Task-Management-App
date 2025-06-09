<script setup>
import { Icon } from '@iconify/vue';
import ChatForm from './ChatForm.vue';
import { useGeneralMessage } from '@/stores/generalMessageStore';
import { nextTick, ref } from 'vue';
import { useAuth } from '@/stores/auth';
import ChatItem from './ChatItem.vue';
import { useInfiniteScroll } from '@vueuse/core';
import { useMessage } from '@/stores/messageStore';

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
const isLoadingMore = ref(false);
const messagesContainer = ref(null);

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
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = 0; 
    }
  });
};
const onMessageSend = async (value) => {
    const handler = channelHandler[props.channel.type] || (() => console.log('Unknown type'));
    const response = await handler(value.content);
    if (response.success) {
        messageStore.appendMessage(response.message);
        await nextTick();
        scrollToBottom();
    } else {
        console.error('message not sent')
    }
}

useInfiniteScroll(
    messagesContainer,
    async () => {
        if (isLoadingMore.value || !messageStore.messages?.hasMore) return;
        console.log('trigger');
        
        isLoadingMore.value = true;
        try {
            await messageStore.getMessages(props.channel?.id, messageStore.messages?.meta?.next_cursor);
        } finally {
            isLoadingMore.value = false;
        }
    },
    {
        direction: 'top',
        distance: 100,
    }
);
</script>
<template>
    <div class="flex-1 flex flex-col bg-white">
        <div class="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center">
                <div class="bg-primary-100 text-primary-600 p-2 rounded-lg mr-3">
                    <Icon icon="fluent-color:people-32" width="32" height="32" />
                </div>
                <div>
                    <h2 v-if="channel.type === 'general'" class="text-lg font-semibold">General Discussion</h2>
                    <h2 v-else class="text-lg font-semibold">Team Discussion</h2>
                    <!-- <p class="text-xs text-gray-500">Active now: 5 members</p> -->
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
        <div 
            ref="messagesContainer" 
            class="flex-1 overflow-y-auto p-4 bg-gray-50"
            style="display: flex; flex-direction: column-reverse;"
        >
            <ChatItem
                v-for="m in messageStore.messages.data"
                :key="m.id"
                :IsChatOwner="m.user?.id === auth.authId"
                :author-name="m.user?.name"
                :avatar="m.user?.avatar?.['thumb-60']"
                :created_at="m.created_at"
                :content="m.content"
            />
            <div v-if="isLoadingMore" class="text-center py-4 text-gray-500 flex items-center justify-center">
                <Icon icon="eos-icons:loading" width="30" height="30"/>
            </div>
            <div v-if="!messageStore.messages?.hasMore" class="text-center py-4 text-gray-500 flex items-center justify-center">
                No more message to load!
            </div>
        </div>
        <ChatForm :isLoading="isSending" @submit-message="onMessageSend"/>
    </div>
</template>