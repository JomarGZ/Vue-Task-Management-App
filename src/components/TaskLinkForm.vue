<script setup>
import { getTaskLinkTypeOptions, getTaskLinkTypeValue, VALID_TASK_LINKS } from '@/constants/task';
import { Icon } from '@iconify/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { z } from 'zod';
const props = defineProps({
    editinglink: {
        type: Object,
        default: () => ({})
    },
    isEditMode: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})
const typeIcon = ref('formkit:link');
const validLink = ref('');
const emit = defineEmits(['submit-link'])
const schema = z.object({
    type: z
        .string()
        .min(1, 'Type is required')
        .transform((val) => (val === "" ? undefined : val))
        .pipe(
            z.enum(VALID_TASK_LINKS, {
                errorMap: () => ({message: 'Ivalid task link'})
            })
        ),
    title: z
        .string()
        .min(1, 'Title is required')
        .max(50, 'Title must not exceed to 50 characters'),
    url: z.string()
        .min(1, 'URL is required')
        .url('Invalid URL format')
        .refine(val => val.startsWith('https://'), {
            message: 'URL must use HTTPS'
        })
       .superRefine((val, ctx) => {
            if (!validLink.value?.pattern) return;
            
            if (!validLink.value.pattern.test(val)) {
                ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Must be a valid ${validLink.value.label} URL`
                });
            }
        }),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(100, 'Description must not exceed to 100 characters')
    
})

const { handleSubmit, values, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema)
})

watch(() => props.editinglink, (editinglink) => {
    if (editinglink) {
        resetForm({
            values: {
                type: editinglink.type || '',
                description: editinglink.description || '',
                title: editinglink.title || '',
                url: editinglink.url || ''
            }
        })
    }
}, {immediate: true})

watch(values, (values) => {
    if (!values?.type) {
        return;
    }
    let typeLink = getTaskLinkTypeValue(values.type);
    typeIcon.value = typeLink.icon || 'formkit:link'
    validLink.value = typeLink
})
const onSubmit = handleSubmit((value) => {
    emit('submit-link', value);
})
</script>

<template>
    <form class="p-6 space-y-6" @submit.prevent="onSubmit">
        <div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Link Type</label>
                <div class="relative">
                    <Field v-slot="{ field, errors }" name="type">
                        <select 
                            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                            v-bind="field"
                        >
                            <option value="" disabled selected>Select a link type</option>
                            <option 
                                v-for="type in getTaskLinkTypeOptions()"
                                :key="type.value"
                                :value="type.value"    
                        >{{ type.label }}</option>
                        </select>
                        <ErrorMessage name="type" class="mt-1 text-sm text-red-600" />
                    </Field>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Field type="text" name="title" class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="What link is for?"/>
                <ErrorMessage name="title" class="mt-1 text-sm text-red-600" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paste Link</label>
                <div class="flex">
                    <span class="inline-flex  items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <Icon :icon="typeIcon" width="20" height="20" class="mr-1"/> <span>https://</span>
                    </span>
                    <Field type="url" :disabled="!values.type" name="url" class="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" :placeholder="validLink.placeholder || 'Please fill in a valid URL..'"/>
                </div>
                <ErrorMessage name="url" class="mt-1 text-sm text-red-600" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Field type="text" name="description" class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Briefly describe this resource (e.g., 'API Design Doc v2')"/>
                <ErrorMessage name="description" class="mt-1 text-sm text-red-600" />
            </div>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
            <button :disabled="isSubmitting || loading" type="submit" class="px-4 py-2.5 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
             <span v-if="isSubmitting || loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span> 
             <span v-else>{{ isEditMode ? 'Edit' : 'Save' }} link</span>
            </button>
        </div>
    </form>
</template>