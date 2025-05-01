<script setup>
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { toFormValidator, toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({
      pr_link: '',
      issue_link: '',
      doc_link: '',
      other_link: ''
    })
  }
});

const route = useRoute();
const projectTask = useProjectTaskStore();

const schema = z.object({
  pr_link: z.string().url('Invalid URL format').optional(),
  issue_link: z.string().url('Invalid URL format').optional(),
  doc_link: z.string().url('Invalid URL format').optional(),
  other_link: z.string().url('Invalid URL format').optional()
});
const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: props.task,
  validationSchema: toTypedSchema(schema)
});

watch(
    () => props.task,
    (newTask) => {
        resetForm({ values: newTask });
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (values) => {
  try {
    await projectTask.updateTaskLinks({id: route.params.taskId}, values);
  } catch (error) {
    console.error('Error updating task links:', error);
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div>
      <label for="pr_link" class="block mb-1 font-medium">Pull Request Link</label>
      <Field
        type="url"
        id="pr_link"
        name="pr_link"
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://github.com/user/repo/pull/123"
      />
      <ErrorMessage name="pr_link" class="mt-1 text-sm text-red-600 block" />
    </div>

    <div>
      <label for="issue_link" class="block mb-1 font-medium">Issue Link</label>
      <Field
        type="url"
        id="issue_link"
        name="issue_link"
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://github.com/user/repo/issues/456"
      />
      <ErrorMessage name="issue_link" class="mt-1 text-sm text-red-600 block" />
    </div>

    <div>
      <label for="doc_link" class="block mb-1 font-medium">Documentation Link</label>
      <Field
        type="url"
        id="doc_link"
        name="doc_link"
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://docs.example.com"
      />
      <ErrorMessage name="doc_link" class="mt-1 text-sm text-red-600 block" />
    </div>

    <div>
      <label for="other_link" class="block mb-1 font-medium">Other Link</label>
      <Field
        type="url"
        id="other_link"
        name="other_link"
        class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="https://example.com"
      />
      <ErrorMessage name="other_link" class="mt-1 text-sm text-red-600 block" />
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
    >
      {{ isSubmitting ? 'Saving...' : 'Save Links' }}
    </button>
  </form>
</template>