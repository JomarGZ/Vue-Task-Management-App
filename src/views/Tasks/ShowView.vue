<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectStore = useProjectStore();
const taskStore = useTaskStore();
watchEffect(() => {
    projectStore.getProject({id: route?.params?.projectId});
    taskStore.getTask({id: route?.params?.taskId});
})
</script>
<template>
        <!-- Breadcrumb -->
        <nav class="mb-8 text-sm">
            <ol class="flex items-center space-x-2">
                <li><RouterLink :to="{name: 'projects.index'}" class="text-blue-600 hover:text-blue-800">Projects</RouterLink></li>
                <li class="text-gray-500">/</li>
                <li><RouterLink :to="{name: 'projects.show', params: {projectId: projectStore?.project?.id}}" class="text-blue-600 hover:text-blue-800">{{ projectStore?.project?.name }}</RouterLink></li>
                <li class="text-gray-500">/</li>
                <li class="text-gray-500">TASK-123</li>
            </ol>
        </nav>

        <!-- Task Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{ taskStore?.taskData?.title }}</h1>
                    <p class="text-gray-500 mt-1">TASK-123</p>
                </div>
                <span class="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">{{ taskStore?.taskData?.status }}</span>
            </div>

            <!-- Project Info -->
            <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    {{ projectStore?.project?.name }}
                </span>
                <span>Created: {{ taskStore?.taskData?.created_at || '--.--' }}</span>
                <span>Due: {{ taskStore?.taskData?.deadline_at || '--.--' }}</span>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-3 gap-6">
            <!-- Left Column -->
            <div class="col-span-2 space-y-6">
                <!-- Description -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Description</h2>
                    <p class="text-gray-700">{{ taskStore?.taskData?.description }}</p>
                </div>

                <!-- Links -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Related Links</h2>
                    <div class="space-y-3">
                        <a href="#" class="block text-blue-600 hover:text-blue-800">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                                </svg>
                                Pull Request #456
                            </div>
                        </a>
                        <a href="#" class="block text-blue-600 hover:text-blue-800">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                                </svg>
                                Documentation
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Comments -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Comments</h2>
                    <!-- Comment List -->
                    <div class="space-y-6">
                        <div class="flex space-x-3">
                            <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full" alt="User avatar">
                            <div class="flex-1">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-medium text-gray-900">Sarah Chen</span>
                                        <span class="text-sm text-gray-500">2 hours ago</span>
                                    </div>
                                    <p class="text-gray-700">Design specs have been updated. Please check the latest Figma file.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- New Comment Form -->
                    <div class="mt-6">
                        <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Add a comment..."></textarea>
                        <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- Status -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Status</h2>
                    <select class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>To Do</option>
                        <option selected>In Progress</option>
                        <option>In Review</option>
                        <option>Done</option>
                    </select>
                </div>

                <!-- Assignments -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Assignments</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Developer</label>
                            <div class="flex items-center space-x-2">
                                <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full" alt="Developer avatar">
                                <span class="text-gray-900">John Doe</span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">QA Engineer</label>
                            <div class="flex items-center space-x-2">
                                <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full" alt="QA avatar">
                                <span class="text-gray-900">Alice Smith</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Metadata -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-lg font-semibold mb-4">Details</h2>
                    <div class="space-y-3 text-sm">
                        <div>
                            <span class="text-gray-500">Priority:</span>
                            <span class="ml-2 text-gray-900">{{ taskStore?.taskData?.priority_level }}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Story Points:</span>
                            <span class="ml-2 text-gray-900">5</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Sprint:</span>
                            <span class="ml-2 text-gray-900">Sprint 23</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </template>