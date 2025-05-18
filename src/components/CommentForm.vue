<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { z } from 'zod';
import UserAvatar from './UserAvatar.vue';
import { Icon } from '@iconify/vue';
import { useAuth } from '@/stores/auth';
import { computed, watch } from 'vue';
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    editingComment: {
        type: Object,
        default: () => ({})
    }
})
const isEditMode = computed(() => !!props.editingComment);
const auth = useAuth();
const emit = defineEmits(['comment-submit', 'cancel-editing'])
const schema = z.object({
    content: z.string().min(1, 'Comment is required').max(500, 'Comment exceeded maximum of 500 characters')
})


const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema)
})
const prefilledForm = (comment) => resetForm({values: {content: comment?.content || ''}});

watch(() => props.editingComment, (comment) => {
    prefilledForm(comment)
});

const onSubmit = handleSubmit((value) => {
    emit('comment-submit', value)
    resetForm();
})
</script>
<template>
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
                    <span v-if="isEditMode" class="text-sm text-gray-600">
                        <button 
                            @click.stop="$emit('cancel-editing')"
                            type="button"
                            class="cursor-pointer hover:text-gray-800 hover:font-semibold"
                        >
                            Cancel Editing
                        </button>
                    </span>
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
</template>