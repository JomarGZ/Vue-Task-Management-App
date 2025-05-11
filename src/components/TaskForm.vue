<script setup>
import { cleanHTML } from '@/composables/useUtil';
import { useTaskStore } from '@/stores/taskStore';
import { toTypedSchema } from '@vee-validate/zod';
import Editor from 'primevue/editor';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { z } from 'zod';
defineProps({
    projectId: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits(['submit']);
const taskStore = useTaskStore();
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
    priority_level: z.string().optional(),
    status: z.string().optional(),
})

const { handleSubmit, isSubmitting, values, meta, setFieldValue } =  useForm({
    validationSchema: toTypedSchema(schema)
})

const onEditorChange = (value) => {
    setFieldValue('description', cleanHTML(value));
}

const emitSubmit = handleSubmit((values) => {
    emit('submit', values);
})
onMounted(() => {
    taskStore.fetchPriorityLevels();
    taskStore.fetchStatuses();
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
                <Editor :modelValue="values.description" @value-change="onEditorChange" editorStyle="height: 320px" class="prose w-full max-w-full">
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
                 <ErrorMessage v-if="meta.touched" name="description" class="mt-1 text-sm text-red-600" />
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
                                v-for="priority in taskStore.priorityLevels" 
                                :key="priority" 
                                :value="priority"
                            >
                                {{ priority }}
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
                            <option value="" selected disabled>Select priority</option>
                            <option 
                                v-for="status in taskStore.statuses" 
                                :key="status" 
                                :value="status"
                            >
                                {{ status }}
                            </option>
                        </select>
                        <ErrorMessage name="status" class="mt-1 text-sm text-red-600" />
                    </Field>
                </div>
                 <div>
                    <label for="started_at">Start Date</label>
                    <Field id="started_at" type="date"  name="started_at" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    <ErrorMessage name="started_at" class="mt-1 text-sm text-red-600 block" />
                </div>
                <div>
                    <label for="deadline_at">Deadline</label>
                    <Field id="deadline_at" name="deadline_at"  type="date"  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    <ErrorMessage name="deadline_at" class="mt-1 text-sm text-red-600 block" />
                </div>
            </div>
        </fieldset>
        <div class="item-center">
            <RouterLink :to="{name: 'projects.show', params: {projectId: projectId}}"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
            </RouterLink>
             <button type="submit" :disabled="isSubmitting" class="bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl text-white m-5 px-4 py-2 text-sm font-medium">
                <span v-if="isSubmitting"></span>
                <span v-else>Create Task</span>
            </button>
        </div>
    </form>
</template>