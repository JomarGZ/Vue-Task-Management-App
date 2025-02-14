<script setup>
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
                    <div>
                        <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name *</label>
                        <input v-model="projectStore.form.name" type="text" id="project_name" name="project_name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <ValidationError :errors="projectStore.errors" field="name"/>    
                    </div>

                    <!-- Client -->
                    <div>
                        <label for="client" class="block text-sm font-medium text-gray-700">Client Name *</label>
                        <input v-model="projectStore.form.client_name" type="text" id="client" name="client"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <ValidationError :errors="projectStore.errors" field="client_name"/>
                    </div>

                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Project Description</label>
                        <textarea v-model="projectStore.form.description" id="description" name="description" rows="4"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe the project objectives and scope..."></textarea>
                        <ValidationError :errors="projectStore.errors" field="description"/>    
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                        <select v-model="projectStore.form.manager" class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Project Manager</option>
                            <option v-for="member in projectTeamStore?.teamMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
                        </select>
                    </div>
                </div>

                <!-- Project Details -->
                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Project Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="start_date" class="block text-sm font-medium text-gray-700">Start Date *</label>
                            <input v-model="projectStore.form.started_at" type="date" id="start_date" name="start_date"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <ValidationError :errors="projectStore.errors" field="started_at"/>
                        </div>

                        <div>
                            <label for="end_date" class="block text-sm font-medium text-gray-700">End Date *</label>
                            <input v-model="projectStore.form.ended_at" type="date" id="end_date" name="end_date"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <ValidationError :errors="projectStore.errors" field="ended_at"/>
                        </div>
                        <div>
                            <label for="priority" class="block text-sm font-medium text-gray-700">Priority *</label>
                            <select v-model="projectStore.form.priority" id="priority" name="priority"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select priority</option>
                                <option v-for="priority in projectStore.projectPriorityLevels" :key="priority" :value="priority">{{ priority }}</option>
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
                                    {{ status }}
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
                    <button
                        :disabled="projectStore.loading" 
                        type="submit" 
                        :class="{
                            'px-4 py-2 border border-transparent flex items-center gap-2 justify-center rounded-md shadow-sm text-sm font-medium text-white focus:outline-none': true,
                            'bg-blue-600 hover:bg-blue-700':! projectStore.loading,
                            'bg-blue-300': projectStore.loading,
                        }">
                        <IconSpinner name="white-spinner" v-if="projectStore.loading"/>
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>