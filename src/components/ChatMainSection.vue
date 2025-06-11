<script setup>
import { Icon } from '@iconify/vue';
import ChatForm from './ChatForm.vue';
import { useGeneralMessage } from '@/stores/generalMessageStore';
import { nextTick, ref } from 'vue';
import { useAuth } from '@/stores/auth';
import ChatItem from './ChatItem.vue';
import { useInfiniteScroll } from '@vueuse/core';
import { useMessage } from '@/stores/messageStore';
import { useMessageReply } from '@/stores/messageReplyStore';

const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})

const auth = useAuth();
const generalMessageStore = useGeneralMessage();
const replyStore = useMessageReply();
const messageStore = useMessage();
const isActionLoaded = ref(false);
const isLoadingMore = ref(false);
const isReplyMode = ref(false);
const messageToReply = ref({});
const messagesContainer = ref(null);

const channelHandler = {
    general: async (values) => {
        if(isActionLoaded.value) return;
        isActionLoaded.value = true;
        try {
           return await generalMessageStore.storeMessage(values.content, values.replyTo?.id)
        } finally {
            isActionLoaded.value = false
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
const onMessageSend = async (values) => {
    const handler = channelHandler[props.channel.type] || (() => console.log('Unknown type'));
    const response = await handler(values);
    if (values.replyTo?.id) {
        replyStore.appendReply(values.replyTo.id, response.message);
    } else {
        // Regular message
        messageStore.appendMessage(response.message);
        await nextTick();
        scrollToBottom();

    }
}
const onReplyMode = (message) => {
    if (!message) return;
    isReplyMode.value = true
    messageToReply.value = message
}

const onLikeMessage = async (messageId) => {
    if (isActionLoaded.value) return;
    isActionLoaded.value = true
    try {
        await messageStore.onLikeMessage(messageId)
    } finally {
        isActionLoaded.value = false
    }
}
const cancelReply = () => {
    isReplyMode.value = false
    messageToReply.value = {}
}
useInfiniteScroll(
    messagesContainer,
    async () => {
        if (isLoadingMore.value || !messageStore.messages?.hasMore) return;
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
const getReplies = async (id) => {
    if(!id) return;
    await replyStore.getReplies(id);
}
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
                :id="m.id"
                :author-name="m.user?.name"
                :avatar="m.user?.avatar?.['thumb-60']"
                :created_at="m.created_at"
                :isActionLoaded="isActionLoaded"
                :content="m.content"
                :like_count="m.reaction_count"
                :replies="replyStore.replies[m.id]"
                @show-replies="getReplies"
                :reply_count="m.reply_count"
                :is_liked="m.is_liked"
                @on-reply="onReplyMode(m)"
                @on-like="onLikeMessage(m.id)"
            />
            <div v-if="isLoadingMore" class="text-center py-4 text-gray-500 flex items-center justify-center">
                <Icon icon="eos-icons:loading" width="30" height="30"/>
            </div>
            <div v-if="!messageStore.messages?.hasMore" class="text-center py-4 text-gray-500 flex items-center justify-center">
                No more message to load!
            </div>
        </div>
        <ChatForm 
            :isLoading="isActionLoaded" 
            @submit-message="onMessageSend"
            :reply-mode="isReplyMode"
            :reply-to="isReplyMode ? messageToReply : {}"
            @cancel-reply="cancelReply"
        />
    </div>
</template>