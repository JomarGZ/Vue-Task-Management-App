<script setup>
import { Icon } from '@iconify/vue';
import CommentItem from './CommentItem.vue';
import { computed } from 'vue';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { useAuth } from '@/stores/auth';
import UserAvatar from './UserAvatar.vue';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const props = defineProps({
    comments: {
        type: Object,
        default: () => ({})
    },
    isFetching: {
        type: Boolean,
        default: false
    },
    error: {
        type: Object,
        default: () => ({})
    },
    hasMore: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['load-more', 'comment-submit'])
const auth = useAuth();
const remainingCount = computed(() => props.comments?.data?.length > 0 ? props.comments?.meta?.total - props.comments?.data?.length : 0)

const schema = z.object({
    content: z.string().min(1, 'Comment is required').max(500, 'Comment exceeded maximum of 500 characters')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema)
})

const onSubmit = handleSubmit((value) => {
    emit('comment-submit', value)
    resetForm();
})
</script>

<template>
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Activity</h3>
            
            <div class="border-l relative border-gray-200 pl-6 pb-6 space-y-6 max-h-[600px] min-h-11 overflow-auto">
                <div v-if="error.hasError" class="text-center text-red-600 capitalize"><p>{{ error }}</p></div>
                <template v-else-if="comments?.data?.length">
                     <CommentItem
                        v-for="comment in comments.data"
                        :key="comment.id"
                        :id="comment.id"
                        :created_at="comment.created_at"
                        :content="comment.content"
                        :author_name="comment.user?.name"
                        :avatar="comment.avatar?.['thumb-60']"
                    />
                    <div class="flex justify-center mt-4">
                        <button 
                            v-if="hasMore && !isFetching"
                            @click="$emit('load-more')"
                            class="hover:text-blue-500 cursor-pointer"
                        >
                            Load More ( {{ remainingCount }} remaining)
                        </button>
                        <div v-if="isFetching" class="text-gray-400 text-2xl">
                            <Icon icon="eos-icons:three-dots-loading" width="100" height="50" />
                        </div>
                    </div>
                </template>
                <div v-else class="text-center text-gray-500">No comments yet. Be the first to comment!</div>
            </div>
            
            <div class="flex mt-6">
                <user-avatar :avatar="auth.user?.avatar?.['thumb-60']" :name="auth.user?.name" class="items-start"/>
                <div class="flex-1">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-4">
                            <label for="comment" class="block mb-2 font-medium">Your Comment</label>
                            <Field
                                name="content"
                                as="textarea"
                                id="comment"
                                class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="5"
                                placeholder="Write your thoughts..."
                                rules="required|min:10|max:500"
                            />
                            <ErrorMessage name="content" class="mt-1 text-sm text-red-600" />
                        </div>
                        <div class="flex justify-end items-center mt-2">
                            <button
                                :disabled="isSubmitting || loading" 
                                type="submit"  
                                class="cursor-pointer flex justify-between items-center mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                <span v-if="isSubmitting || loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                                <span v-else>Comment</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>