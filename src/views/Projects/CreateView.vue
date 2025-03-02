<script setup>
import BaseButton from '@/components/forms/BaseButton.vue';
import DateInputField from '@/components/forms/DateInputField.vue';
import InputField from '@/components/forms/InputField.vue';
import TextAreaField from '@/components/forms/TextAreaField.vue';
import ValidationError from '@/components/ValidationError.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import { onBeforeUnmount, onMounted } from 'vue';


const store = useProjectStore();
const projectTeamStore = useProjectTeamStore();
onBeforeUnmount(store.resetForm);
onMounted(() => {
    projectTeamStore.fetchMembers();
    store.getStatuses();
    store.getPriorityLevels();
})
</script>
<template>
     <div class="mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Create New Project</h1>
            <p class="mt-2 text-gray-600">Fill in the project details to get started.</p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent="store.handleSubmit()" class="space-y-6">
                <!-- Basic Information -->
                <div class="space-y-4">
                    <h2 class="text-lg font-medium text-gray-900">Basic Information</h2>
                    
                    <!-- Project Name -->
                     <InputField
                        name="name"
                        label="Project Name"
                        type="text"
                        :isRequired="true"
                        v-model="store.form.name"
                        :errors="store.errors"
                        :clientErrors="store.v$.name"
                        @input="store.v$.name.$touch()"
                        required
                     />
                     <InputField
                        name="client_name"
                        label="Client Name"
                        type="text"
                        :isRequired="true"
                        v-model="store.form.client_name"
                        :errors="store.errors"
                        :clientErrors="store.v$.client_name"
                        @input="store.v$.client_name.$touch()"
                        required
                     />
                     <TextAreaField
                        name="description"
                        label="Description"
                        placeholder="Describe the project objectives and scope..."
                        v-model="store.form.description"
                        :required="true"
                        :is-required="true"
                        :errors="store.errors"
                        :client-errors="store.v$.description"
                        @input="store.v$.description.$touch()"
                        rows="6"
                    />
                </div>

                <!-- Project Details -->
                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Project Details</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DateInputField
                            name="start_date"
                            label="Start Date"
                            v-model="store.form.started_at"
                            :restrictToCurrentAndFutureDates="true"
                            :required="true"
                            :errors="store.errors"
                            :client-errors="store.v$.started_at"
                            @input="store.v$.started_at.$touch()"
                        />
                        <DateInputField
                            name="ended_at"
                            label="End Date"
                            v-model="store.form.ended_at"
                            :restrictToCurrentAndFutureDates="true"
                            :required="true"
                            :errors="store.errors"
                            :client-errors="store.v$.ended_at"
                            @input="store.v$.ended_at.$touch()"
                        />
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
                            <select v-model="store.form.priority" id="priority" name="priority"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select priority</option>
                                <option v-for="priority in store.projectPriorityLevels" :key="priority" :value="priority">{{ priority }}</option>
                            </select>
                            <ValidationError :errors="store.errors" field="priority"/>
                        </div>
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700">Status</label>
                            <select v-model="store.form.status" id="priority" name="priority"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select Status</option>
                                <option
                                  v-for="status in store.projectStatuses"
                                  :key="status"
                                  :value="status">
                                    {{ status }}
                                </option>
                                <ValidationError :errors="store.errors" field="status"/>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="budget" class="block text-sm font-medium text-gray-700">Budget</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input v-model="store.form.budget" type="number" id="budget" name="budget"
                                class="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00">
                            <ValidationError :errors="store.errors" field="budget"/>
                        </div>
                    </div>
                </div>
                <div class="space-y-4 pt-6 border-t">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                        <select v-model="store.form.manager" class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Project Manager</option>
                            <option v-for="member in projectTeamStore?.teamMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center justify-end space-x-4 pt-6 border-t">
                    <RouterLink :to="{name: 'projects.index'}"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </RouterLink>
                    <BaseButton
                        :isActionDisabled="store.isActionDisabled"
                        :isLoading="store.loading"
                        type="submit"
                    >
                        Create Project
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>