<script setup>
import { useAuth } from '@/stores/auth';
import { useChangeProfile } from '@/stores/changeProfile';
import { usePosition } from '@/stores/positionStore';
import { Icon } from '@iconify/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { z } from 'zod';

const auth = useAuth();
const changeProfile = useChangeProfile();
const positionStore = usePosition();

const schema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Invalid email address').max(50, 'Email must be less than 50 characters'),
    position_id: z.number().optional()
})

const {handleSubmit, resetForm, isSubmitting, setFieldError} = useForm({validationSchema: toTypedSchema(schema)});

const submitForm = handleSubmit(async (values) => {
    const result = await changeProfile.updateProfile(values); 
    if (result === true) return;
    if (result.status === 422) {
        for (const [key, value] of Object.entries(result.errors)) {
            setFieldError(key, value[0]);
        }
    }
});
onMounted(() => {
    resetForm({
        values: {
            name: auth.user?.name || '',
            email: auth.user?.email || '', 
            position_id: auth.user?.position?.id || '', 
        }
    })
    positionStore.fetchUnpaginatedPositions();
})
</script>
<template>
    <div class="mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Update Account Details</h3>

        <form @submit="submitForm" class="space-y-6">
                <!-- Name Field -->
        <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <Field
                type="text"
                id="name"
                name="name"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <ErrorMessage name="name" class="mt-1 text-sm text-red-600 block"/>
        </div>
        <div class="mb-6">
            <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
            <Field
                as="select"
                id="position"
                name="position_id"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select a position</option>
                <option 
                    class="text-gray-900 capitalize"
                    v-for="position in positionStore.unpaginatedPositions" 
                    :key="position.id" 
                    :value="position.id">
                    {{ position.name }}
                </option>
            </Field>
            <ErrorMessage name="position_id" class="mt-1 text-sm text-red-600 block"/>
        </div>
        <!-- Email Field -->
        <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <Field
                type="text"
                id="email"
                name="email"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <ErrorMessage name="email" class="mt-1 text-sm text-red-600 block"/>
        </div>

        <!-- Save Changes Button -->
        <div class="flex justify-end">
            <button
                type="submit"
                :disabled="isSubmitting"
                class="px-4 py-2 flex items-center justify-center gap-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700"
                >
                <span v-if="isSubmitting"><Icon icon="gg:spinner" width="24" height="24" /></span>
               <span v-else> Save Changes</span>
            </button>
        </div>
        </form>
    </div>
</template>