<script setup>
import TaskItem from '@/components/TaskItem.vue'
import {Icon} from '@iconify/vue';

</script>
<template>
     <div class="p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Tasks</h3>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
                <Icon icon="line-md:plus" width="24" height="24" />Create Task
            </button>
        </div>
        
        <!-- Task Filters -->
        <div class="flex flex-wrap items-center justify-between mb-4 gap-2">
            <div class="flex space-x-2">
                <button class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">All</button>
                <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Active</button>
                <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Completed</button>
                <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">High Priority</button>
            </div>
            <div class="relative">
                <input type="text" placeholder="Search tasks..." class="pl-8 pr-4 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <i class="fas fa-search absolute left-3 top-2 text-gray-400"></i>
            </div>
        </div>
        
        <!-- Tasks Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <task-item
                        title="Design Homepage Layout"
                        :category="{name: 'UX/UI Design'}"
                        :assignee="{name: 'Emma Wilson'}"
                        deadline="May 20, 2023"
                        priority="High"
                        status="In Progress"
                    />
                    <task-item
                        title="Design Homepage Layout"
                        :category="{name: 'UX/UI Design'}"
                        :assignee="{name: 'Emma Wilson'}"
                        deadline="May 20, 2023"
                        priority="High"
                        status="In Progress"
                    />
                    <task-item
                        title="Design Homepage Layout"
                        :category="{name: 'UX/UI Design'}"
                        :assignee="{name: 'Emma Wilson'}"
                        deadline="May 20, 2023"
                        priority="High"
                        status="In Progress"
                    />
                    <task-item
                        title="Design Homepage Layout"
                        :category="{name: 'UX/UI Design'}"
                        :assignee="{name: 'Emma Wilson'}"
                        deadline="May 20, 2023"
                        priority="High"
                        status="In Progress"
                    />
                </tbody>
            </table>
        </div>
        
        <!-- Pagination -->
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-500">
                Showing <span class="font-medium">1</span> to <span class="font-medium">4</span> of <span class="font-medium">12</span> tasks
            </div>
            <div class="flex space-x-1">
                <button class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
                <button class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
                <button class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>