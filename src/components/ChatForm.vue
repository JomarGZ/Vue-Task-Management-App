<script setup>
import { Icon } from '@iconify/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { computed } from 'vue';
import {z} from 'zod';
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['submit-message'])
const schema = z.object({
    content: z.string().min(1, 'Message is required').max(1000, 'Message must be 1000 characteres or less')
})
const {handleSubmit, isSubmitting, resetForm} = useForm({
    validationSchema: toTypedSchema(schema)
})
const isDisabled = computed(() => props.isLoading || isSubmitting.value);
const onSubmit = handleSubmit((value) => {
    emit('submit-message', value)
    resetForm()
})
</script>
<template>
    <div class="bg-white border-t border-gray-200 p-4">
        <form @submit.prevent="onSubmit" class="flex items-center bg-gray-50 rounded-xl px-4 py-2">
            <div class="flex-1 mx-2">
                <Field type="text" name="content" placeholder="Type a message..." class="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"/>
                <ErrorMessage  name="content" class="mt-1 text-sm text-red-600" />
            </div>
            <button 
                type="submit" 
                :disabled="isDisabled" 
                class="ml-2 bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 flex gap-1 cursor-pointer hover:bg-sky-600 items-center"
            >
                <span v-if="isDisabled">
                    <Icon icon="eos-icons:loading" width="24" height="24" />
                </span>
                <span v-else class="flex items-center justify-center gap-1">
                    Send<Icon icon="fa:send" width="18" height="18" />
                </span>
            </button>
        </form>
    </div>
</template>