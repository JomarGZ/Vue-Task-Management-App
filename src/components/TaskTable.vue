<script setup>
import TaskItem from '@/components/TaskItem.vue'
import {Icon} from '@iconify/vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import TaskFilter from './TaskFilter.vue';
const props = defineProps({
    projectId: {
        type: [Number, String],
        default: ''
    },
    tasks: {
        type: Object,
        default: () => ({})
    },
    error: {
        type: Object,
        default: () => ({})

    },
    loading: {
        type: Boolean,
        default: false
    },
    isFetching: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['submit-filters', 'delete-task', 'onPaginate', 'retry']);
const handleFilters = (filters) => {
    emit('submit-filters', filters);
}
</script>
<template>
     <div class="p-6">
        <div v-if="projectId" class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Tasks</h3>
            <router-link :to="{name: 'tasks.create', params: {projectId: projectId}}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
                <Icon icon="line-md:plus" width="24" height="24" />Create Task
            </router-link>
        </div>
        
        <!-- Task Filters -->
         <div class="flex flex-wrap items-center justify-between mb-4 gap-2">
            <TaskFilter @submit-filters="handleFilters"/>
        </div>
        <!-- Tasks Table -->
        <div class="relative">
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
                        :id="task.id"
                        :title="task.title"
                        :deadline="task.deadline_at"
                        :priority="task.priority_level"
                        :status="task.status"
                        :category="task.category"
                        @delete-task="(taskId) => $emit('delete-task', taskId)"
                        :loading="loading"
                        :assignees="task.assigned_users"
                        :projectId="projectId || task.project?.id"
                    />
                </tbody>
            </table>
                <div 
                    v-if="isFetching" 
                    class="absolute inset-0 flex items-center text-gray-400 justify-center bg-white bg-opacity-70"
                >
                    <Icon icon="eos-icons:loading" width="50" height="50" />
                </div>
                <div 
                    v-if="tasks.data?.length === 0" 
                    class="absolute inset-0 flex items-center text-gray-400 justify-center bg-white bg-opacity-70"
                >
                    <p>No task found!</p>
                </div>
                <div 
                    v-if="Object.keys(error).length > 0" 
                    class="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 p-4"
                >
                    <Icon icon="mdi:alert-circle-outline" width="50" height="50" class="text-red-500" />
                    <p class="mt-2 text-red-400 font-medium">{{ error.message || 'Oops! Error. Please try again later!' }}</p>
                </div>

        </div>
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-500">
                Showing <span class="font-medium">{{ tasks.meta?.from }}</span> to <span class="font-medium">{{ tasks.meta?.to }}</span> of <span class="font-medium">{{ tasks.meta?.total }}</span> tasks
            </div>
              <TailwindPagination
                    :item-classes="['cursor-pointer', 'border-gray-300', 'hover:bg-blue-100']"
                    :data="tasks"
                    @pagination-change-page="(page) => $emit('onPaginate', page)"
                />
        </div>
    </div>
</template>