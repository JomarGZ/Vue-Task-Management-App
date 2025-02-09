<script setup>
import PaginationArrow from '@/components/PaginationArrow.vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
import { useTaskStore } from '@/stores/taskStore';
import { onMounted } from 'vue';

const taskStore = useTaskStore();
onMounted(() => {
    taskStore.fetchTasks();
})
</script>
<template>
    <div class="mx-auto p-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Tasks</h1>
    </div>
    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="mb-4">
            <div class="relative">
                <input type="text" 
                       placeholder="Search tasks..." 
                       class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Project Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select Project</option>
                    <option value="1">E-commerce Platform</option>
                    <option value="2">Mobile Banking App</option>
                    <option value="3">CRM System</option>
                </select>
            </div>

            <!-- Developer Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Assignees</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select Assignee</option>
                    <option value="1">Sarah Chen</option>
                    <option value="2">Mike Brown</option>
                    <option value="3">Lisa Thompson</option>
                </select>
            </div>

            <!-- QA Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Priority Levels</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select Priority</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                </select>
            </div>

            <!-- Status Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select Status</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Tasks List -->
    <div class="bg-white rounded-lg shadow-sm">
        <template v-if="taskStore.tasks.length > 0">
            <TaskItem
                :key="task.id"
                v-for="task in taskStore.tasks"
                :task="task"
            />
        </template>
        <template v-else>
            <p class="text-center text-gray-500">No tasks found.</p>
        </template>

    </div>

    <!-- Pagination -->
   <PaginationArrow :pagination="taskStore?.pagination" :onChangePage="taskStore.changePage"/>
</div>
</template>