<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const store = useProjectStore();
const route = useRoute();
watchEffect(async () => {
    store.getProject({id: route?.params?.id})
});
</script>
<template>
        <div class="max-w-7xl mx-auto">
        <!-- Header with Actions -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold text-gray-800">{{ store?.project?.name }}</h1>
                    <span class="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                </div>
                <p class="mt-1 text-gray-600">Client: Acme Corporation</p>
            </div>
            <div class="flex gap-3">
                <RouterLink :to="{ name: 'projects.index'}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                    <i class="fas fa-edit"></i>
                    Back
                </RouterLink>
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column - Project Info -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Overview Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Project Overview</h2>
                    <div class="space-y-4">
                        <p class="text-gray-700">
                           {{ store?.project?.description }}
                        </p>
                        
                        <!-- Key Details Grid -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <div>
                                <div class="text-sm text-gray-500">Start Date</div>
                                <div class="font-medium">Jan 15, 2024</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">End Date</div>
                                <div class="font-medium">Dec 31, 2024</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Budget</div>
                                <div class="font-medium">$75,000</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Priority</div>
                                <div class="font-medium text-red-600">High</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Progress Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Progress</h2>
                    <div class="space-y-4">
                        <!-- Overall Progress -->
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">Overall Progress</span>
                                <span class="text-sm font-medium text-gray-700">65%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 65%"></div>
                            </div>
                        </div>

                        <!-- Phase Progress -->
                        <div class="space-y-3">
                            <h3 class="text-sm font-medium text-gray-700">Phases</h3>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Planning</span>
                                    <span>100%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Design</span>
                                    <span>80%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Development</span>
                                    <span>45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm">
                                    <span>Testing</span>
                                    <span>20%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 20%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Timeline Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                    <div class="flow-root">
                        <ul class="-mb-8">
                            <li class="relative pb-8">
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                            <i class="fas fa-check text-white text-sm"></i>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Homepage design approved by client</p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time datetime="2024-03-15">Mar 15</time>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="relative pb-8">
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                            <i class="fas fa-tasks text-white text-sm"></i>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Frontend development phase started</p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time datetime="2024-03-10">Mar 10</time>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Right Column - Team & Resources -->
            <div class="space-y-6">
                <!-- Team Card -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Team</h2>
                    <div class="space-y-4">
                        <!-- Project Manager -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-500 mb-2">Project Manager</h3>
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span class="text-gray-600">JD</span>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">John Doe</p>
                                    <p class="text-sm text-gray-500">john@example.com</p>
                                </div>
                            </div>
                        </div>

                        <!-- Team Members -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-500 mb-2">Team Members</h3>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span class="text-blue-600">SW</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Sarah Wilson</p>
                                        <p class="text-xs text-gray-500">Lead Developer</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span class="text-green-600">TB</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Tom Brown</p>
                                        <p class="text-xs text-gray-500">UI Designer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Files & Resources -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Files & Resources</h2>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-file-pdf text-red-500"></i>
                                <span class="text-sm text-gray-700">Project Brief.pdf</span>
                            </div>
                            <button class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-file-image text-blue-500"></i>
                                <span class="text-sm text-gray-700">Design Mockups.zip</span>
                            </div>
                            <button class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-blue-600 text-2xl font-bold">24</div>
                            <div class="text-sm text-gray-600">Tasks</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-green-600 text-2xl font-bold">15</div>
                            <div class="text-sm text-gray-600">Completed</div>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <div class="text-yellow-600 text-2xl font-bold">6</div>
                            <div class="text-sm text-gray-600">Issues</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-purple-600 text-2xl font-bold">8</div>
                            <div class="text-sm text-gray-600">Updates</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>