<script setup>
import { formatDateDistance } from '@/composables/useFormatters';
import SimpleAvatar from './SimpleAvatar.vue';
import { Icon } from '@iconify/vue';
import ChatMessageReaction from './ChatMessageReaction.vue';
import { ref, watch } from 'vue';
import ChatReplies from './ChatReplies.vue';

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

watch(() => props.replies, (newReplies) => {
    if (newReplies.length > 0) {
        showReplies.value = true;
    }
}, { deep: true });

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
               <ChatReplies :showReplies="showReplies" :replies="replies"/>
                <div class="flex justify-end mt-2">
                    <ChatMessageReaction
                        :like_count="like_count"
                        :reply_count="reply_count"
                        @on-reply="$emit('on-reply')"
                    />
                    <button v-if="reply_count > 0" 
                            @click="onShowReplies"
                            class="ml-2 text-xs text-sky-500 cursor-pointer hover:text-sky-700">
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
                <ChatReplies :showReplies="showReplies" :replies="replies"/>
                <div class="flex items-center mt-2">
                    <ChatMessageReaction
                        :like_count="like_count"
                        :reply_count="reply_count"
                        @on-reply="$emit('on-reply')"

                    />
                    <button v-if="reply_count > 0" 
                            @click="onShowReplies"
                            class="ml-2 text-xs text-sky-500 cursor-pointer hover:text-sky-700">
                        {{ showReplies ? 'Hide replies' : `Show replies (${reply_count})` }}
                    </button>
                </div>
            </div>
        </div>
    </template>
</template>