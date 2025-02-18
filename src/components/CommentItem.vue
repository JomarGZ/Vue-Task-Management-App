<script setup>
import { computed, ref } from 'vue';
import CommentForm from './forms/CommentForm.vue';
import CommentOption from './CommentOption.vue';
import CommentBlock from './CommentBlock.vue';
const replies = [
    {
        id: 1,
        user: {
            id: 1,
            name: 'jomar'
        },
        body: 'this is comment sdjasoiduhasiodhuadiabdadbasdahbdd'
    },
    {
        id: 1,
        user: {
            id: 1,
            name: 'jomar'
        },
        body: 'this is comment sdjasoiduhasiodhuadiabdadbasdahbdd'
    },
    {
        id: 1,
        user: {
            id: 1,
            name: 'jomar'
        },
        body: 'this is comment sdjasoiduhasiodhuadiabdadbasdahbdd'
    },
]
const hasReplies = computed(() => replies.length > 0);
const isRepliesOpen = ref(false);

const handleToggleReplies = () => {
    isRepliesOpen.value = ! isRepliesOpen.value;
}
</script>
<template>
    <div class="flex gap-4 group">
        <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
        <div class="flex-grow">
            <CommentBlock/>
            <div v-if="hasReplies" class="ml-4">
                <button @click="handleToggleReplies" class="hover:underline text-gray-700">John Doe replied • 1 Reply</button>
             </div>
            <!-- Nested Reply -->
             <template v-if="hasReplies && isRepliesOpen">

                <div class="mt-4 ml-6 flex flex-col gap-4">
                    <div class="flex gap-4">
                        <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full shadow-sm" alt="User avatar"/>
                        <div class="flex-grow">
                            <CommentBlock/>
                        </div>
                    </div>
                <CommentForm class="flex gap-4"/>
                </div>
             </template>
           
        </div>
    </div>
</template>