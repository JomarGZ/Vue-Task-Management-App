<script setup>
import { formatDateDistance } from '@/composables/useFormatters';
import SimpleAvatar from './SimpleAvatar.vue';
import { Icon } from '@iconify/vue';
import ChatReaction from './ChatReaction.vue';
import { ref } from 'vue';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    IsChatOwner: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    like_count: {
        type: Number,
        default: 0
    },
    reply_count: {
        type: Number,
        default: 0
    },
    replies: {
        type: Array,
        default: () => ([])
    }
});
const emit = defineEmits(['show-replies', 'on-reply'])
const showReplies = ref(false);

const onShowReplies = () => {
    if (!showReplies.value) {
        emit('show-replies', props.id)
    }
    showReplies.value = !showReplies.value
}
</script>

<template>
    <template v-if="IsChatOwner">
        <div class="flex mb-6 group justify-end">
            <div class="flex-1 max-w-3xl">
                <div class="flex items-center mb-1 justify-end">
                    <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity mr-2">
                        <Icon icon="bi:three-dots" width="16" height="16" />
                    </button>
                    <span class="text-xs text-gray-500 mr-2">{{ formatDateDistance(created_at) }}</span>
                    <span class="font-medium">You</span>
                </div>
                <div class="bg-sky-500 text-white p-4 rounded-lg shadow-xs max-w-3xl">
                    <p>{{ content }}</p>
                </div>
                
                <!-- Reply List -->
                <div v-if="showReplies && replies.length" class="mt-4 pl-6 border-l-2 border-sky-200 overflow-y-auto max-h-[400px]">
                    <div v-for="reply in replies" :key="reply.id" class="mb-4">
                        <div class="flex items-center mb-1">
                            <SimpleAvatar :name="reply.user?.name" :avatar="reply.user?.avatar?.['thumb-60']" size="xs" class="mr-2"/>
                            <span class="font-medium text-sm mr-2">{{ reply.user?.name }}</span>
                            <span class="text-xs text-gray-500">{{ formatDateDistance(reply.created_at) }}</span>
                        </div>
                        <div class="bg-sky-50 p-3 rounded-lg text-sm text-gray-800">
                            {{ reply.content }}
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-2">
                    <ChatReaction
                        :like_count="like_count"
                        :reply_count="reply_count"
                        @on-reply="$emit('on-reply')"
                    />
                    <button v-if="reply_count > 0" 
                            @click="onShowReplies"
                            class="ml-2 text-xs text-sky-500 hover:text-sky-700">
                        {{ showReplies ? 'Hide replies' : `Show replies (${reply_count})` }}
                    </button>
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
                    <span class="text-xs text-gray-500">{{ formatDateDistance(created_at) }}</span>
                    <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl">
                    <p>{{ content }}</p>
                </div>
                
                <!-- Reply List -->
                <div v-if="showReplies && replies.length" class="mt-4 pl-6 border-l-2 border-gray-200 overflow-y-auto max-h-[400px]">
                    <div v-for="reply in replies" :key="reply.id" class="mb-4">
                        <div class="flex items-center mb-1">
                            <SimpleAvatar :name="reply?.user?.name" :avatar="reply?.user?.avatar?.['thumb-60']" size="xs" class="mr-2"/>
                            <span class="font-medium text-sm mr-2">{{ reply.user?.name }}</span>
                            <span class="text-xs text-gray-500">{{ formatDateDistance(created_at) }}</span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg text-sm">
                            {{ reply.content }}
                        </div>
                    </div>
                </div>

                <div class="flex items-center mt-2">
                    <ChatReaction
                        :like_count="like_count"
                        :reply_count="reply_count"
                        @on-reply="$emit('on-reply')"

                    />
                    <button v-if="reply_count > 0" 
                            @click="onShowReplies"
                            class="ml-2 text-xs text-sky-500 hover:text-sky-700">
                        {{ showReplies ? 'Hide replies' : `Show replies (${reply_count})` }}
                    </button>
                </div>
            </div>
        </div>
    </template>
</template>