<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import {Icon} from '@iconify/vue';
import { TailwindPagination } from 'laravel-vue-pagination';
defineProps({
    projectId: {
        type: [Number, String],
        required: true
    },
    tasks: {
        type: Object,
        default: () => ({})
    }
})
const projectTaskStore = useProjectTaskStore();
</script>
<template>
     <div class="p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Tasks</h3>
            <router-link :to="{name: 'tasks.create', params: {projectId: projectId}}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
                <Icon icon="line-md:plus" width="24" height="24" />Create Task
            </router-link>
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
                        v-for="task in tasks.data"
                        :key="task.id"
                        :title="task.title"
                        :assignee="{name: 'Emma Wilson'}"
                        :deadline="task.deadline_at"
                        :priority="task.priority_level"
                        :status="task.status"
                    />
                </tbody>
            </table>
        </div>
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-500">
                Showing <span class="font-medium">{{ tasks.meta?.from }}</span> to <span class="font-medium">{{ tasks.meta?.to }}</span> of <span class="font-medium">{{ tasks.meta?.total }}</span> tasks
            </div>
              <TailwindPagination
                    :item-classes="['cursor-pointer', 'border-gray-300']"
                    :data="tasks"
                    @pagination-change-page="(page) => projectTaskStore.getTasks(projectId, page, {})"
                />
        </div>
    </div>
</template>