<script setup>
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { z } from 'zod'
import debounce from 'lodash.debounce'

// Custom HTTPS validation function
const requireHttps = (value) => {
  if (!value) return true // Skip if empty
  return value.startsWith('https://') || "URL must start with https://"
}

// Zod validation schema
const schema = z.object({
  pr_link: z.string()
    .url('Must be a valid URL')
    .refine(requireHttps, { message: "Must use HTTPS" })
    .optional(),
  issue_link: z.string()
    .url('Must be a valid URL')
    .refine(requireHttps, { message: "Must use HTTPS" })
    .optional(),
  doc_link: z.string()
    .url('Must be a valid URL')
    .refine(requireHttps, { message: "Must use HTTPS" })
    .optional(),
  other_link: z.string()
    .url('Must be a valid URL')
    .refine(requireHttps, { message: "Must use HTTPS" })
    .optional()
})

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toFormValidator(schema)
})

// Debounced auto-save function
const autoSave = debounce(async (fieldName, value) => {
  if (!value) return // Don't save empty values
  
  console.log(`Saving ${fieldName}:`, value)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`${fieldName} saved successfully`)
  } catch (error) {
    console.error('Failed to save:', error)
    setFieldValue(fieldName, '')
  }
}, 1000)

const handleChange = (fieldName, event) => {
  const value = event.target.value
  setFieldValue(fieldName, value)
  autoSave(fieldName, value)
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label for="pr_link" class="block mb-1 font-medium">Pull Request Link</label>
      <Field name="pr_link" v-slot="{ field, errorMessage }">
        <input
          type="url"
          id="pr_link"
          v-bind="field"
          @input="(e) => handleChange('pr_link', e)"
          class="w-full p-2 border rounded-lg focus:ring-2"
          :class="errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
          placeholder="https://github.com/user/repo/pull/123"
        />
        <span v-if="errorMessage" class="mt-1 text-sm text-red-600 block">
          {{ errorMessage }}
        </span>
      </Field>
    </div>

    <div>
      <label for="issue_link" class="block mb-1 font-medium">Issue Link</label>
      <Field name="issue_link" v-slot="{ field, errorMessage }">
        <input
          type="url"
          id="issue_link"
          v-bind="field"
          @input="(e) => handleChange('issue_link', e)"
          class="w-full p-2 border rounded-lg focus:ring-2"
          :class="errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
          placeholder="https://github.com/user/repo/issues/456"
        />
        <span v-if="errorMessage" class="mt-1 text-sm text-red-600 block">
          {{ errorMessage }}
        </span>
      </Field>
    </div>

    <div>
      <label for="doc_link" class="block mb-1 font-medium">Documentation Link</label>
      <Field name="doc_link" v-slot="{ field, errorMessage }">
        <input
          type="url"
          id="doc_link"
          v-bind="field"
          @input="(e) => handleChange('doc_link', e)"
          class="w-full p-2 border rounded-lg focus:ring-2"
          :class="errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
          placeholder="https://docs.example.com"
        />
        <span v-if="errorMessage" class="mt-1 text-sm text-red-600 block">
          {{ errorMessage }}
        </span>
      </Field>
    </div>

    <div>
      <label for="other_link" class="block mb-1 font-medium">Other Link</label>
      <Field name="other_link" v-slot="{ field, errorMessage }">
        <input
          type="url"
          id="other_link"
          v-bind="field"
          @input="(e) => handleChange('other_link', e)"
          class="w-full p-2 border rounded-lg focus:ring-2"
          :class="errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
          placeholder="https://example.com"
        />
        <span v-if="errorMessage" class="mt-1 text-sm text-red-600 block">
          {{ errorMessage }}
        </span>
      </Field>
    </div>
  </div>
</template>