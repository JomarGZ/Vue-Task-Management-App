<script setup>
import { computed, ref } from 'vue';
import CommentForm from './forms/CommentForm.vue';
import CommentOption from './CommentOption.vue';
import CommentBlock from './CommentBlock.vue';
import CommentReplyForm from './forms/CommentReplyForm.vue';
import { getInitials } from '@/composables/useFormatters';
import { useAuth } from '@/stores/auth';
import DefaultUserPic from './DefaultUserPic.vue';
const props = defineProps({
    comment: Object,
    replies: Array
})
const hasReplies = computed(() => props.replies?.length > 0);
const replyCounts = computed(() => props.replies?.length || 0);
const repliedLabel = computed(() => 
  replyCounts.value > 1 ? `${props.replies[0]?.author?.name} and others replied • ${replyCounts.value} replies` : `${props.replies[0]?.author?.name} replied • ${replyCounts.value} reply`
);

const isRepliesOpen = ref(false);

const handleToggleReplies = () => {
    isRepliesOpen.value = ! isRepliesOpen.value;
}
const replyclicked = () => {
    handleToggleReplies()
}
</script>
<template>
    <div class="flex gap-4 group">
        <img v-if="comment.author?.avatar?.['thumb-60']" :src="comment.author?.avatar?.['thumb-60']" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
        <DefaultUserPic v-else :name="comment.author?.name" class="w-10 h-10 border-2"/>
        <div class="flex-grow">
            <CommentBlock
              :comment="comment"
              :author="comment?.author"
              @clicked-reply="replyclicked"
              />
            <div v-if="hasReplies" class="ml-4">
                <button @click="handleToggleReplies" class="hover:underline text-gray-700">{{ repliedLabel }}</button>
             </div>
            <!-- Nested Reply -->
            <div v-if="false" class="mt-4 ml-6 gap-4 flex flex-col">
                <template v-if="hasReplies && isRepliesOpen">
                    <div v-for="reply in replies" :key="reply" class="flex">
                        <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full shadow-sm" alt="User avatar"/>
                        <div class="flex-grow">
                            <CommentBlock :comment="reply" :author="reply?.author" @clicked-reply="handleToggleReplies"/>
                        </div>
                    </div>
                </template>
                <CommentReplyForm v-if="isRepliesOpen" class="flex gap-4"/>
            </div>
        </div>
    </div>
</template>