<template>
     <div class="rounded-xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">Upcoming Deadlines</h2>
        <div class="space-y-4">
            <div v-if="isUpcomingDeadlinesLoading" class="flex items-center justify-center w-full p-4">
                <IconSpinner class="h-10 w-10 text-gray-500 opacity-30" name="custom-spinner" />
            </div>
            <div v-else-if="isUpcomingDeadlinesError" class="flex items-center justify-center w-full p-4">
                <p>Failed to load upcoming task deadlines</p>
            </div>
            <template v-else-if="upcomingTasksDeadline?.length > 0">
                <RouterLink
                  :to="{name: 'tasks.show', params: { projectId: task.project?.id, taskId: task.id }}"
                  v-for="task in upcomingTasksDeadline"
                  :key="task.id"
                  class="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                    <div class="w-12 h-12 flex flex-col items-center justify-center bg-white rounded-lg">
                        <span class="text-sm font-medium">{{ getMonth(task.deadline_at) }}</span>
                        <span class="text-lg font-bold text-red-500">{{ getDay(task.deadline_at) }}</span>
                    </div>
                    <div>
                        <h4 class="font-medium">{{ task.title }}</h4>
                        <p class="text-sm text-gray-500">{{ formatDateOnly(task.deadline_at) }}</p>
                    </div>
                </RouterLink>
            </template>
            <div v-else class="ml-2">
                <p>No Upcoming task deadlines</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { formatDateOnly } from '@/composables/useFormatters';
import { getDay, getMonth } from '@/composables/useUtil';
defineProps({
    isUpcomingDeadlinesLoading: Boolean,
    isUpcomingDeadlinesError: Boolean,
    upcomingTasksDeadline: Array
})

</script>