<script setup>
import BaseButton from '@/components/forms/BaseButton.vue';
import DateInputField from '@/components/forms/DateInputField.vue';
import InputField from '@/components/forms/InputField.vue';
import TextAreaField from '@/components/forms/TextAreaField.vue';
import { capWords } from '@/composables/useUtil';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import { onBeforeUnmount, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const projectStore = useProjectStore();
const projectTeamStore = useProjectTeamStore();
const route = useRoute();

watchEffect(async () => {
    projectStore.getProject({id: route?.params?.projectId}, true)
})
onBeforeUnmount(() => {
    projectStore.resetForm()
});
onMounted(() => {
    projectTeamStore.fetchMembers();
    projectStore.getPriorityLevels();
    projectStore.getStatuses()
})
</script>
<template>
     <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Edit Project</h1>
            <p class="mt-2 text-gray-600">Fill in the project details to get started.</p>
        </div>
        <!-- Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent="projectStore.updateProject({id: route?.params?.projectId})" class="space-y-6">
                <!-- Basic Information -->
                <div class="space-y-4">
                    <h2 class="text-lg font-medium text-gray-900">Basic Information</h2>
                    
                    <!-- Project Name -->
                    <InputField
                        name="name"
                        label="Project Name"
                        type="text"
                        :isRequired="true"
                        v-model="projectStore.form.name"
                        :errors="projectStore.errors"
                        :clientErrors="projectStore.v$.name"
                        @input="projectStore.v$.name.$touch()"
                        required
                     />
                     <InputField
                        name="client_name"
                        label="Client Name"
                        type="text"
                        :isRequired="true"
                        v-model="projectStore.form.client_name"
                        :errors="projectStore.errors"
                        :clientErrors="projectStore.v$.client_name"
                        @input="projectStore.v$.client_name.$touch()"
                        required
                     />
                     <TextAreaField
                        name="description"
                        label="Description"
                        placeholder="Describe the project objectives and scope..."
                        v-model="projectStore.form.description"
                        :required="true"
                        :is-required="true"
                        :errors="projectStore.errors"
                        :client-errors="projectStore.v$.description"
                        @input="projectStore.v$.description.$touch()"
                        rows="6"
                    />
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                        <select v-model="projectStore.form.manager" class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Project Manager</option>
                            <option v-for="member in projectTeamStore?.teamMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Project Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DateInputField
                            name="start_date"
                            label="Start Date"
                            v-model="projectStore.form.started_at"
                            :restrictToCurrentAndFutureDates="true"
                            :required="true"
                            :errors="projectStore.errors"
                            :client-errors="projectStore.v$.started_at"
                            @input="projectStore.v$.started_at.$touch()"
                        />
                        <DateInputField
                            name="ended_at"
                            label="End Date"
                            v-model="projectStore.form.ended_at"
                            :restrictToCurrentAndFutureDates="true"
                            :required="true"
                            :errors="projectStore.errors"
                            :client-errors="projectStore.v$.ended_at"
                            @input="projectStore.v$.ended_at.$touch()"
                        />
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700">Priority *</label>
                            <select v-model="projectStore.form.priority" id="priority" name="priority"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select priority</option>
                                <option v-for="priority in projectStore.projectPriorityLevels" :key="priority" :value="priority">{{ capWords(priority) }}</option>
                            </select>
                            <ValidationError :errors="projectStore.errors" field="priority"/>
                        </div>
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700">Status *</label>
                            <select v-model="projectStore.form.status" id="priority" name="priority"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select Status</option>
                                <option
                                  v-for="status in projectStore.projectStatuses"
                                  :key="status"
                                  :value="status">
                                    {{ capWords(status) }}
                                </option>
                                <ValidationError :errors="projectStore.errors" field="status"/>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="budget" class="block text-sm font-medium text-gray-700">Budget</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input v-model="projectStore.form.budget" type="number" id="budget" name="budget"
                                class="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00">
                            <ValidationError :errors="projectStore.errors" field="budget"/>
                        </div>
                    </div>
                </div>

                <div class="space-y-4 pt-6 border-t">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                        <select v-model="projectStore.form.manager" class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Project Manager</option>
                            <option v-for="member in projectTeamStore?.teamMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center justify-end space-x-4 pt-6 border-t">
                    <RouterLink :to="{name: 'projects.show', params: {projectId: route?.params?.projectId}}"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </RouterLink>
                    <BaseButton
                        :isActionDisabled="projectStore.isActionDisabled"
                        :isLoading="projectStore.loading"
                        type="submit"
                    >
                        Update Project
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>