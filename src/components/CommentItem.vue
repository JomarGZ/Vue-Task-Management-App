<script setup>
import { computed, ref } from 'vue';
import CommentForm from './forms/CommentForm.vue';
import CommentOption from './CommentOption.vue';
import CommentBlock from './CommentBlock.vue';
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
</script>
<template>
    <div class="flex gap-4 group">
        <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
        <div class="flex-grow">
            <CommentBlock
              :comment="comment"
              :author="comment?.author" />
            <div v-if="hasReplies" class="ml-4">
                <button @click="handleToggleReplies" class="hover:underline text-gray-700">{{ repliedLabel }}</button>
             </div>
            <!-- Nested Reply -->
             <template v-if="hasReplies && isRepliesOpen">
                <div class="mt-4 ml-6 flex flex-col gap-4">
                    <div v-for="reply in replies" :key="reply" class="flex gap-4">
                        <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full shadow-sm" alt="User avatar"/>
                        <div class="flex-grow">
                            <CommentBlock :comment="reply" :author="reply?.author"/>
                        </div>
                    </div>
                <CommentForm class="flex gap-4"/>
                </div>
             </template>
           
        </div>
    </div>
</template>