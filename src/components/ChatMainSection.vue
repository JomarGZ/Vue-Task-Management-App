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
import { useDirectMessage } from '@/stores/directMessageStore';
import ChatHeader from './ChatHeader.vue';
import ChatChannelEditAndDeleteOptions from './ChatChannelEditAndDeleteOptions.vue';
import { useGroupMessage } from '@/stores/groupMessageStore';

const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
})

defineEmits(['remove-participant']);
const auth = useAuth();
const generalMessageStore = useGeneralMessage();
const directMessageStore = useDirectMessage();
const groupMessageStore = useGroupMessage();
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
    group: (values) => {
        if (!values.channelId) {
            console.error('Channel ID is required for group messages');
            throw new Error('Invalid channel: Channel ID missing');
        }
        return groupMessageStore.storeMessage(
            values.content, 
            values.channelId, 
            values.replyTo?.id
        );
    },
    direct: (values) => {
        if (!values.recipientId) {
            console.error('Recipient ID is required for direct messages');
            throw new Error('Invalid recipient: Recipient ID missing');
        }
        return directMessageStore.storeMessage(
            values.content, 
            values.recipientId, 
            values.replyTo?.id
        );
    }
}
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = 0; 
    }
  });
};
const onMessageSend = async (values) => {
    try {
        if (!values?.content) {
            throw new Error('Message content is required');
        }

        if (!props.channel?.type) {
            throw new Error('Channel type is missing');
        }

        const handler = channelHandler[props.channel.type];
        if (!handler) {
            throw new Error(`Unsupported channel type: ${props.channel.type}`);
        }

        const response = await handler(values);
        if (!response?.message) {
            throw new Error('Invalid response from message handler');
        }

        if (values.replyTo?.id) {
            if (!replyStore) {
                throw new Error('Reply store is not available');
            }
            replyStore.appendReply(values.replyTo.id, response.message);
        } else {
            if (!messageStore) {
                throw new Error('Message store is not available');
            }
            messageStore.appendMessage(response.message);
            await nextTick();
            scrollToBottom();
        }

    } catch (error) {
        console.error('Failed to send message:', error);
    }
};
const onReplyMode = (message) => {
    if (!message) return;
    isReplyMode.value = true
    messageToReply.value = message
}

const onLikeMessage = async (messageId) => {
    await messageStore.onLikeMessage(messageId)
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
                    <h2 v-if="channel.type === 'direct'" class="text-lg font-semibold">{{ channel.recipient?.name }}</h2>
                    <h2 v-else-if="channel.type === 'group'" class="text-lg font-semibold">{{ channel.name }}</h2>
                    <h2 v-else class="text-lg font-semibold">General Discussion</h2>
                    <!-- <p class="text-xs text-gray-500">Active now: 5 members</p> -->
                </div>
            </div>
            <div v-if="channel.type !== 'general'" class="flex space-x-4">
                <ChatChannelEditAndDeleteOptions 
                    :channel="channel" 
                    @remove-participant="(user) => $emit('remove-participant', user)"
                    @delete-channel="$emit('delete-channel', channel.id)"
                />
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
                :isActionLoaded="messageStore.isActionLoading"
                :likes_by="m.likes_by"
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
            <div v-if="!messageStore.messages?.hasMore" class="text-center py-4 text-gray-500 flex items-center border-b border-b-sky-200 mb-6 justify-center">
               <ChatHeader v-if="channel?.type" :type="channel?.type" :channel="channel"/>
            </div>
        </div>
        <ChatForm 
            :isLoading="isActionLoaded" 
            @submit-message="onMessageSend"
            :channel="channel"
            :reply-mode="isReplyMode"
            :reply-to="isReplyMode ? messageToReply : {}"
            @cancel-reply="cancelReply"
        />
    </div>
</template>