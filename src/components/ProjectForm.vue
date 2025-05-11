<script setup>
import Editor from 'primevue/editor';
import { z } from 'zod';
import { Field, ErrorMessage,  } from 'vee-validate';
import {useForm} from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { computed, onMounted, ref, watch } from 'vue';
import { useProjectStore } from '@/stores/projectStore';
import { Icon } from '@iconify/vue';
import { cleanHTML } from '@/composables/useUtil';
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    isEditMode: {
        type: Boolean,
        default: false
    },
    project: {
         type: Object,
         default: () => ({
            name: '',
            description: '',
            client_name: '',
            started_at: '',
            ended_at: '',
            priority: '',
            status: '',
            budget: '',
         })
    }
})
const emit = defineEmits(['form-submit'])
const store = useProjectStore();
const today = ref('');

const isHtmlEmpty = (html) => {
    if (!html) return true;
    
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    
    return textContent.length === 0;
};
const nonEmptyHtml = z.string().max(1000, 'Description must be 1000 characters or less').refine(val => !isHtmlEmpty(val), {
    message: 'Project description is required'
})
const schema = z.object({
    name: z.string().min(1, 'Project name is required').max(255, 'Project name must be 255 characters or less'),
    client_name: z.string().min(1, 'Client name is required').max(255, 'Client name must be 255 characters or less'),
    description: nonEmptyHtml,
    started_at: z.string().optional(),  
    ended_at: z.string().optional(),
    priority: z.string().optional(),
    status: z.string().optional(),
    budget: z.coerce
    .number()
    .max(9999999999, 'Budget must be 10 digits or less')
    .nonnegative('Budget must be positive')
    .optional()
    .optional()
    .refine(val => val === null || !isNaN(val), {
      message: 'Budget must be a valid number'
    }),
})

const { handleSubmit, isSubmitting, meta, resetForm, values, setFieldValue } = useForm({
    validationSchema: toTypedSchema(schema),
  
})

const isEndDateDisabled = computed(() => !values.started_at);
const disabledDaysBeforeStarted = computed(() => values.started_at)

const prefilledForm = (project) => {
  resetForm({
    values: {
      name: project.name ?? '',
      client_name: project.client_name ?? '',
      budget: project.budget ?? '',
      status: project.status ?? '',
      priority: project.priority ?? '',
      started_at: project.started_at ? new Date(project.started_at).toISOString().split('T')[0] : '',
      ended_at: project.ended_at ? new Date(project.ended_at).toISOString().split('T')[0] : '',
      description: project.description ? cleanHTML(project.description) : '',
    }
  });
};

watch(() => props.project, prefilledForm, { immediate: true });

const onEditorChange = (value) => {
  setFieldValue('description', cleanHTML(value));

};

const onSubmit = handleSubmit((values) => {
    emit('form-submit', values);
})
onMounted(() => {
    today.value = new Date().toISOString().split('T')[0];
    store.getStatuses();
    store.getPriorityLevels();
})
</script>
<template>
     <div class="bg-white rounded-lg shadow p-6">
        <form @submit="onSubmit" class="space-y-6">
            <div class="space-y-4">
                <h2 class="text-lg font-medium text-gray-900">Basic Information</h2>
                <fieldset class="space-y-7">
                    <div>
                        <label for="name">Project Name</label>
                        <Field id="name" name="name" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        <ErrorMessage name="name" class="mt-1 text-sm text-red-600 block" />
                    </div>
                    <div>
                        <label for="client_name">Client Name</label>
                        <Field id="client_name" name="client_name" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                        <ErrorMessage name="client_name" class="mt-1 text-sm text-red-600 block" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="description">Description</label>
                        <Editor 
                            :modelValue="values.description"
                             @value-change="onEditorChange"
                            class="rounded-md prose w-full max-w-full"
                            editorStyle="height: 320px" 
                        >
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
                        <ErrorMessage v-if="meta.touched" name="description" class="mt-1 text-sm text-red-600 block" />
                    </div>
                    <div class="flex gap-4 items-center justify-start">
                        <div>
                            <label for="started_at">Start Date</label>
                            <Field id="started_at" type="date" :min="today" name="started_at" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            <ErrorMessage name="started_at" class="mt-1 text-sm text-red-600 block" />
                        </div>
                        <div>
                            <label for="ended_at">End Date</label>
                            <Field id="ended_at" :disabled="isEndDateDisabled" type="date" :min="disabledDaysBeforeStarted" name="ended_at" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            <ErrorMessage name="ended_at" class="mt-1 text-sm text-red-600 block" />
                        </div>
                        <div>
                            <label for="">Priority</label>
                            <Field v-slot="{ field, errors }" name="priority">
                                <select 
                                    v-bind="field"
                                    id="priority"
                                    class="mt-1 capitalize block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': errors.length }"
                                    >
                                    <option value="">Select priority</option>
                                    <option 
                                        v-for="priority in store.projectPriorityLevels" 
                                        :key="priority" 
                                        :value="priority"
                                    >
                                        {{ priority }}
                                    </option>
                                </select>
                                <ErrorMessage name="priority" class="mt-1 text-sm text-red-600" />
                            </Field>
                        </div>
                        <div>
                            <label for="status">Status</label>
                            <Field v-slot="{field, errors}" name="status">
                                <select  v-bind="field" id="status" 
                                    class="mt-1 capitalize block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        :class="{ 'border-red-500': errors.length }"
                                    >
                                    <option value="">Select Status</option>
                                    <option
                                        v-for="status in store.projectStatuses"
                                        :key="status"
                                        :value="status">
                                        {{ status }}
                                    </option>
                                </select>
                                <ErrorMessage name="status" class="mt-1 text-sm text-red-600" />
                            </Field>
                        </div>
                        <div>
                            <label for="budget">Budget</label>
                            <Field id="budget" name="budget" type="number" min="0" placeholder="0" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                            <ErrorMessage name="budget" class="mt-1 text-sm text-red-600" />
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="flex items-center justify-end space-x-4 pt-6 border-t">
                <RouterLink :to="{name: 'projects.index'}"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                </RouterLink>
                <button type="submit" :disabled="isSubmitting || store.loading" class="bg-blue-700 rounded-md text-white py-2 px-4 hover:bg-blue-800">
                   <span v-if="isSubmitting || store.loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                    <span v-else>{{ isEditMode ? 'Update Project' : 'Create Project' }}</span>
                </button>
            </div>
        </form>
    </div>
</template>