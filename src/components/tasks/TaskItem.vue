<script setup>
import { formatDateOnly, getInitials } from '@/composables/useFormatters';
import { capWords } from '@/composables/useUtil';
import { computed } from 'vue';

const props = defineProps({
    task: Object
})
const hasAssignees = computed(() => props.task?.assigned_users?.length > 0);

const formattedDeadline = computed(() => {
    const date = props.task?.deadline_at;
    if (!date) return 'No Deadline';
    return formatDateOnly(date);
})
</script>
<template>
    <RouterLink :to="{name: 'tasks.show', params: { projectId: task.project?.id, taskId: task.id }}" class="border-b border-gray-200 hover:bg-gray-700">
        <div class="p-4 hover:bg-blue-100">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-3 flex-grow min-w-0">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ task?.project?.name }}</span>
                    <h3 class=" min-w-0 text-lg truncate font-medium text-gray-900">{{ task?.title }}</h3>
                </div>
                <span class="bg-yellow-100 shrink-0 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ capWords(task?.status) }}</span>
            </div>
            <p class="text-gray-600 mb-4 truncate">{{ task?.description }}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <!-- Assigned Dev -->
                   <template v-if="hasAssignees">
                        <div v-for="assignee in task?.assigned_users" :key="assignee?.id" class="flex items-center space-x-2">
                            <img v-if="assignee.avatar?.['thumb-60']" class="h-8 w-8 rounded-full border-2 border-white outline outline-2 outline-blue-400" :src="assignee.avatar?.['thumb-60']" alt="">
                            <div v-else class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="text-blue-600 text-sm font-medium">{{ getInitials(assignee.name) }}</span>
                            </div>
                            <span class="text-sm text-gray-600">{{ assignee?.name }}</span>
                        </div>
                   </template>
                   <template v-else>
                        <p class="text-center text-gray-500">Unassigned</p>
                   </template>
                </div>
                
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600">Due: {{ formattedDeadline }}</span>
                    <span class="text-sm font-medium text-blue-600">{{ task?.priority_level }} Priority</span>
                </div>
            </div>
        </div>
    </RouterLink>
</template>