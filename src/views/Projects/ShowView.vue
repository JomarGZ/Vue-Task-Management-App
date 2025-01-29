<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import { onMounted, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const projectStore = useProjectStore();
const taskStore = useTaskStore();
const route = useRoute();
watchEffect(async () => {
    projectStore.getProject({id: route?.params?.projectId})
});
watch(
    () => taskStore.searchInput, 
    (newSearch) => {
        taskStore.debounceSearch(newSearch)    
    }
)
onMounted(() => {
    taskStore.getTasks();
});
</script>
<template>
        <div class="max-w-7xl mx-auto">
        <!-- Header with Actions -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold text-gray-800">{{ projectStore?.project?.name }}</h1>
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
                           {{ projectStore?.project?.description }}
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
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <h2 class="text-2xl font-semibold text-gray-800">Project Tasks</h2>
                        <RouterLink :to="{name: 'tasks.create', params: {projectId: projectStore?.project?.id}}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                            <IconSVG name="plus-svg"/>
                            Add Task
                        </RouterLink>
                    </div>
                       <!-- Search and Filter Bar -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <!-- Search -->
                            <div class="relative flex-1">
                                <input
                                    v-model="taskStore.searchInput" 
                                    type="text" 
                                    placeholder="Search tasks..." 
                                    class="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                                >
                                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            <!-- Filters -->
                            <div class="flex gap-3">
                                <select class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                </select>
                                <select class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                    <option value="">All Dates</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div v-for="task in taskStore?.tasks" :key="task.id" class="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md">
                            <RouterLink :to="{name: 'tasks.show', params: {taskId: task.id, projectId: projectStore?.project?.id}}" class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-4 ring-blue-100">
                                        <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900">{{ task.title }}</h3>
                                        <span class="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">{{ task.status }}</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <time class="text-sm text-gray-500">Mar 15</time>
                                    <div class="mt-1">
                                        <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/50" alt="User avatar" />
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                    <PaginationComponent :pagination="taskStore.pagination" size="sm" :onPageChange="taskStore.changePage"/>
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
                <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
                <div class="border-b border-gray-200 bg-gray-50 p-4 rounded-t-lg">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-800">Comments</h3>
                        <span class="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">12</span>
                    </div>
                </div>

                <!-- Comments Thread -->
                <div class="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                    <!-- Comment 1 -->
                    <div class="p-4 bg-white">
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full" alt="User avatar">
                                <div class="flex-1 space-y-1">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
                                        <span class="text-xs text-gray-500">Product Manager</span>
                                    </div>
                                    <span class="text-xs text-gray-500">Yesterday at 2:34 PM</span>
                                </div>
                            </div>
                            
                            <!-- Referenced Task -->
                            <div class="ml-11 p-2 bg-gray-50 rounded-md text-xs text-gray-600 border-l-2 border-blue-500">
                                Re: <span class="font-medium">Homepage Redesign - Navigation Updates</span>
                            </div>

                            <!-- Comment Content -->
                            <div class="ml-11">
                                <p class="text-sm text-gray-700">The navigation layout looks much better now. Can we make sure all the dropdown menus have consistent spacing?</p>
                                <div class="mt-3 flex items-center gap-4">
                                    <button class="text-xs text-gray-600 hover:text-gray-900">Reply</button>
                                    <button class="text-xs text-gray-600 hover:text-gray-900">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comment 2 with thread -->
                    <div class="p-4 bg-white">
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full" alt="User avatar">
                                <div class="flex-1 space-y-1">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-medium text-gray-900">Alex Chen</span>
                                        <span class="text-xs text-gray-500">Developer</span>
                                    </div>
                                    <span class="text-xs text-gray-500">Yesterday at 3:15 PM</span>
                                </div>
                            </div>

                            <!-- Comment Content -->
                            <div class="ml-11">
                                <p class="text-sm text-gray-700">I've updated the spacing to 16px across all dropdown menus. Also fixed the hover states for better consistency.</p>
                                
                                <!-- Code Snippet -->
                                <div class="mt-2 p-2 bg-gray-800 rounded-md">
                                    <code class="text-xs text-gray-200">
                                        .dropdown-menu { padding: 16px; }
                                    </code>
                                </div>

                                <div class="mt-3 flex items-center gap-4">
                                    <button class="text-xs text-gray-600 hover:text-gray-900">Reply</button>
                                    <button class="text-xs text-gray-600 hover:text-gray-900">Edit</button>
                                </div>
                            </div>
                        </div>

                        <!-- Nested Reply -->
                        <div class="mt-4 ml-11 pl-4 border-l-2 border-gray-100">
                            <div class="flex items-start gap-3">
                                <img src="https://i.pravatar.cc/32" class="w-6 h-6 rounded-full" alt="User avatar">
                                <div class="flex-1 space-y-2">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-medium text-gray-900">Sarah Johnson</span>
                                        <span class="text-xs text-gray-500">Just now</span>
                                    </div>
                                    <p class="text-sm text-gray-700">Perfect, thank you! This looks much better now.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Add Comment -->
                    <div class="p-4 bg-gray-50">
                        <div class="flex gap-3">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full" alt="Your avatar">
                            <div class="flex-1 space-y-3">
                                <textarea 
                                    rows="3" 
                                    class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    placeholder="Add your comment..."
                                ></textarea>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <button class="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                        </button>
                                        <button class="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>