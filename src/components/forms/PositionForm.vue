<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { z } from 'zod';
const props = defineProps({
    isEditMode: {
        type: Boolean,
        default: false
    },
    position: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['submit']);
const schema = z.object({
    name: z.string().min(1, 'Position name is required').max(50, 'Position name must be less than 50 characters')
})
const {handleSubmit, iSubmitting, resetForm} = useForm({
    validationSchema: toTypedSchema(schema)
})
watch(() => props.position, (editPosition) => {
    resetForm({
        values: {
            name: editPosition.name || ''
        }
    });
}, { immediate: true });


const onSubmit = handleSubmit(async(values) => {
    emit('submit', values);
})
onBeforeUnmount(() => {
    resetForm();
});
</script>
<template>
    <form @submit="onSubmit" class="space-y-3">
        <div class="space-y-3">
            <label for="position_name">Position Name</label>
            <Field id="position_name" name="name" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            <ErrorMessage name="name" class="mt-1 text-sm text-red-600 block" />
        </div>
        <button type="submit" :disabled="iSubmitting" class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
            <span>
                {{ isEditMode ? 'Update Category' : 'Create Category' }}
            </span>
        </button>
    </form>
</template>