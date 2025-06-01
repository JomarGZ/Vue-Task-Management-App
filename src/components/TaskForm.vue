<script setup>
import { cleanHTML } from '@/composables/useUtil';
import { getTaskCategoryOptions, getTaskPriorityOptions, getTaskStatusOptions, VALID_TASK_CATEGORIES, VALID_TASK_STATUS, VALID_TASK_PRIORITY } from '@/constants/task';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { Icon } from '@iconify/vue';
import { toTypedSchema } from '@vee-validate/zod';
import Editor from 'primevue/editor';
import { ErrorMessage, Field, useField, useForm } from 'vee-validate';
import { computed, onMounted, ref, watch } from 'vue';
import { z } from 'zod';
const props = defineProps({
    projectId: {
        type: [Number, String],
        required: true
    },
    isEditMode: {
        type: Boolean,
        default: false
    },
    task: {
        type: Object,
        default: () => ({
            title: '',
            description: '',
            deadline_at: '',
            started_at: '',
            priority_level: '',
            status: '',
            category: '',
        })
    }
})
const emit = defineEmits(['submit']);
const projectTaskStore = useProjectTaskStore();
const today = ref('');

const isHtmlEmpty = (html) => {
    if (!html) return true;
    
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    
    return textContent.length === 0;
};
const nonEmptyHtml = z.string().max(700, 'Description must be 700 characters or less').refine(val => !isHtmlEmpty(val), {
    message: 'Task description is required'
})
const schema = z.object({
    title: z.string().min(1, 'Task title is required.').max(255, 'Task title must be 255 characters or less!'),
    description: nonEmptyHtml,
    deadline_at: z.string().optional(),
    started_at: z.string().optional(),
   priority_level: z
    .union([
        z.literal(''), // Allow empty string
        z.enum(VALID_TASK_PRIORITY, {
            errorMap: () => ({message: 'Invalid task priority'})
        })
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
    status: z
        .union([
        z.literal(''), // Allow empty string
        z.enum(VALID_TASK_STATUS, {
            errorMap: () => ({message: 'Invalid task status'})
        })
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
    category: z.string()
        .min(1, 'Category is required')
        .transform((val) => (val === "" ? undefined : val)) // Treat empty as undefined
        .pipe(
            z.enum(VALID_TASK_CATEGORIES, { 
                errorMap: () => ({ message: 'Invalid task category' }) 
            })
        ),
})

const { handleSubmit, isSubmitting, values, setFieldValue, resetForm } =  useForm({
    validationSchema: toTypedSchema(schema)
})

useField('description');

const prefilledForm = (task) => {
    resetForm({
        values: {
            title: task?.title ?? '',
            description: task?.description ? cleanHTML(task?.description) : '',
            status: task?.status ?? '',
            category: task?.category ?? '',
            priority_level: task?.priority_level ?? '',
            started_at: task?.started_at ? new Date(task?.started_at).toISOString().split('T')[0] : '',
            deadline_at: task?.deadline_at ? new Date(task?.deadline_at).toISOString().split('T')[0] : '',
        }
    })
}
watch(() => props.task, prefilledForm, {immediate: true})
const onEditorChange = (value) => {
    setFieldValue('description', cleanHTML(value));
}

const isDeadlineInputDisabled = computed(() => values.started_at?.trim().length > 0 ? false : true);
const emitSubmit = handleSubmit((values) => {
    emit('submit', values);
})
watch(() => props.task.started_at, (startedDate) => {
    if (startedDate) {
        today.value = props.task.started_at ?  new Date(props.task.started_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    }
})
onMounted(() => {
    today.value = props.task.started_at ?  new Date(props.task.started_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
})
</script>
<template>
    <form @submit.prevent="emitSubmit">
        <fieldset class="space-y-4">
            <div>
                <label for="title">Title <span class="text-xs text-red-600">*</span></label>
                <Field type="text" name="title" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                <ErrorMessage name="title" class="mt-1 text-sm text-red-600" />
            </div>
            <div>
                <label for="title">Description<span class="text-xs text-red-600">*</span></label>
                <Editor 
                    :modelValue="values.description" 
                    @value-change="onEditorChange" 
                    editorStyle="height: 320px" 
                    class="prose w-full max-w-full">
                    <template v-slot:toolbar>
                    <span class="ql-formats">
                        <select class="ql-header" v-tooltip.bottom="'Text Size'">
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="">Normal</option>
                        </select>
                        <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                        <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                        <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                        <button v-tooltip.bottom="'Bullet List'" class="ql-list" value="bullet"></button>
                        <button v-tooltip.bottom="'Numbered List'" class="ql-list" value="ordered"></button>
                    </span>
                    </template>
                </Editor>
                 <ErrorMessage name="description" class="mt-1 text-sm text-red-600" />
            </div>
            <div class="flex items-center justify-start gap-3">
                 <div>
                    <label for="priority">Priority</label>
                    <Field v-slot="{ field, errors }" name="priority_level">
                        <select 
                            v-bind="field"
                            id="priority"
                            class="mt-1  block w-full capitalize px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'border-red-500': errors.length }"
                            >
                            <option value="" selected disabled>Select priority</option>
                            <option 
                                v-for="priority in getTaskPriorityOptions()" 
                                :key="priority.value" 
                                :value="priority.value"
                            >
                                {{ priority.label }}
                            </option>
                        </select>
                        <ErrorMessage name="priority_level" class="mt-1 text-sm text-red-600" />
                    </Field>
                </div>
                 <div>
                    <label for="status">Status</label>
                    <Field v-slot="{ field, errors }" name="status">
                        <select 
                            v-bind="field"
                            id="status"
                            class="mt-1 capitalize block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'border-red-500': errors.length }"
                            >
                            <option value="" selected disabled>Select status</option>
                            <option 
                                v-for="status in getTaskStatusOptions()" 
                                :key="status.value" 
                                :value="status.value"
                            >
                                {{ status.value }}
                            </option>
                        </select>
                        <ErrorMessage name="status" class="mt-1 text-sm text-red-600" />
                    </Field>
                </div>
                 <div>
                    <label for="status">Category<span class="text-xs text-red-600">*</span></label>
                    <Field v-slot="{ field, errors }" name="category">
                        <select 
                            v-bind="field"
                            id="status"
                            class="mt-1 capitalize block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'border-red-500': errors.length }"
                            >
                            <option value="" selected disabled>Select category</option>
                            <option 
                                v-for="category in getTaskCategoryOptions()" 
                                :key="category.value" 
                                :value="category.value"
                            >
                                {{ category.label }}
                            </option>
                        </select>
                        <ErrorMessage name="category" class="mt-1 text-sm text-red-600" />
                    </Field>
                </div>
                 <div>
                    <label for="started_at">Start Date</label>
                    <Field id="started_at" type="date"  name="started_at" :min="today" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    <ErrorMessage name="started_at" class="mt-1 text-sm text-red-600 block" />
                </div>
                <div>
                    <label for="deadline_at">Deadline</label>
                    <Field id="deadline_at" name="deadline_at"  type="date" :min="values.started_at" :disabled="isDeadlineInputDisabled"  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    <ErrorMessage name="deadline_at" class="mt-1 text-sm text-red-600 block" />
                </div>
            </div>
        </fieldset>
        <div class="item-center flex items-center justify-start">
            <button @click="$router.back()"
                type="button"
                class="px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
            </button>
             <button type="submit" :disabled="isSubmitting || projectTaskStore.loading" class="bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl text-white m-5 px-4 py-2 text-sm font-medium">
                <span v-if="isSubmitting || projectTaskStore.loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                <span v-else>
                    {{ isEditMode ? 'Update Task' : 'Create Task' }}
                </span>
            </button>
        </div>
    </form>
</template>