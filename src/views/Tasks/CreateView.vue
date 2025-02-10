<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { onBeforeUnmount, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const projectStore = useProjectStore();
const taskStore = useProjectTaskStore();
watchEffect(() => {
projectStore.getProject({id: route?.params?.projectId});
});
onBeforeUnmount(taskStore.resetForm)
</script>
<template>
    <div class="mx-auto space-y-6">
        <!-- Project Details Card -->
        <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="space-y-6">
                <!-- Project Header -->
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ projectStore?.project?.name }}</h3>
                        <p class="text-gray-600 mt-1">{{ projectStore?.project?.description }}</p>
                    </div>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Q1 2025</span>
                </div>

                <!-- Project Stats -->
                <div class="grid grid-cols-4 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Progress</p>
                        <p class="text-xl font-semibold text-gray-800">65%</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Tasks</p>
                        <p class="text-xl font-semibold text-gray-800">24/45</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Due Date</p>
                        <p class="text-xl font-semibold text-gray-800">Mar 15</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Team</p>
                        <div class="flex -space-x-2 mt-1">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 1">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 2">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 3">
                            <div class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                                <span class="text-xs text-gray-600">+2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Progress -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-sm font-medium text-gray-700">Project Progress</h4>
                        <span class="text-sm text-gray-600">65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: 65%"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Task Creation Form (Same as before with updated title) -->
        <div class="bg-white rounded-xl shadow-sm p-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Add New Task to Website Redesign Project</h3>
            <form @submit.prevent="taskStore.storeTask({id: projectStore?.project?.id})" class="space-y-6">
                <!-- Rest of the form remains the same -->
                <!-- Task Title -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="col-span-2">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                        <input v-model="taskStore.form.title" type="text" id="title" name="title"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <ValidationError :errors="taskStore.errors" field="title"/>
                    </div>

                    <!-- Description -->
                    <div class="col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea v-model="taskStore.form.description" id="description" name="description" rows="4"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        <ValidationError :errors="taskStore.errors" field="description"/>
                    </div>

                    <!-- Due Date -->
                    <!-- <div>
                        <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div> -->

                    <!-- Priority -->
                    <!-- <div>
                        <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select id="priority" name="priority"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div> -->

                    <!-- Assignee -->
                    <!-- <div class="col-span-2">
                        <label for="assignee" class="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                        <select id="assignee" name="assignee"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="john">John Doe (Project Lead)</option>
                            <option value="jane">Jane Smith (Frontend Developer)</option>
                            <option value="mike">Mike Johnson (UI Designer)</option>
                            <option value="sarah">Sarah Wilson (Backend Developer)</option>
                        </select>
                    </div> -->

                    <!-- Tags -->
                    <!-- <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Frontend</span>
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Design</span>
                            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">UI/UX</span>
                            <button type="button" class="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                                + Add Tag
                            </button>
                        </div>
                    </div> -->

                    <!-- Attachments -->
                    <!-- <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                            <div class="space-y-1 text-center">
                                <i class="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-3"></i>
                                <div class="flex text-sm text-gray-600">
                                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                    </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                            </div>
                        </div>
                    </div> -->
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-4">
                    <RouterLink :to="{name: 'projects.show', params: {projectId: projectStore?.project?.id}}" type="button" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        Cancel
                    </RouterLink>
                    <button 
                        :disabled="taskStore.loading" 
                        type="submit" 
                        :class="{
                        'px-6 py-3 flex items-center justify-center gap-2 text-white rounded-lg font-medium': true,
                        'hover:bg-indigo-700 bg-indigo-600':! taskStore.loading,
                        'bg-indigo-300': taskStore.loading 
                        }"
                    >
                        <IconSpinner name="white-spinner" v-if="taskStore.loading"/>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>