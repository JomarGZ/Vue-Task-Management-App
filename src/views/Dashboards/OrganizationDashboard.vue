<script setup>
import TaskActivityFeed from "@/components/TaskActivityFeed.vue";
import UpcomingTaskDeadlines from "@/components/UpcomingTaskDeadlines.vue";
import { useUserTasks } from "@/stores/userTaskStore";
import debounce from "lodash.debounce";
import { onMounted, watch, provide, onBeforeUnmount, ref, computed } from "vue";
import CountsPanel from "@/components/CountsPanel.vue";
import TaskStatusDistributionChart from "@/components/PieChart.vue";
import AreaChart from "@/components/AreaChart.vue";
const userTaskStore = useUserTasks();


onMounted(async () => {
  await Promise.all([
    userTaskStore.getTaskCounts(),
    userTaskStore.fetchPriorityTimeline(),
    userTaskStore.fetchAssignedTasks(),
    userTaskStore.fetchUpcomingTaskDeadlines(),
  ]);
});

const taskCountSData = computed(() => {
  return [
    { value: userTaskStore.taskCounts?.current_totals?.completed || 0, name: 'Task Completed' },
    { value: userTaskStore.taskCounts?.current_totals?.in_progress || 0, name: 'Task In Progress' },
  ]
})

const handleDebounceSearch = debounce(async(search) => {
  userTaskStore.clearFilters()
  await userTaskStore.fetchAssignedTasks({
    search: search,
  });
}, 300);

const handleFilterTask = ([selectedStatus, selectedPriority]) => {

   userTaskStore.fetchAssignedTasks({
    status: selectedStatus,
    priority_level: selectedPriority,
  });
}

watch(() => [
    userTaskStore.selectedStatus, 
    userTaskStore.selectedPriority
  ],handleFilterTask, { immediate: false });

watch(() => userTaskStore.searchQuery, 
  handleDebounceSearch
);

provide('pagination', userTaskStore.pagination);
provide('handlePageChange', userTaskStore.handlePageChange);
onBeforeUnmount(() => {
  userTaskStore.clearFilters();
})
</script>
<template>
    <CountsPanel :taskCounts="userTaskStore.taskCounts"/>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 space-y-6 lg:col-span-8">
          <div class="bg-gray-50 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-2xl font-bold text-gray-800">Task Done</h2>
                <ul class="flex items-center justify-center gap-2">
                  <li>
                    <div>
                      <label for="daily">Daily</label>
                      <input type="radio" id="daily" name="timeframe" checked>
                    </div>
                  </li>
                  <li>
                    <div>
                      <label for="weekly">Weekly</label>
                      <input type="radio" id="weekly" name="timeframe">
                    </div>
                  </li>
                  <li>
                    <div>
                      <label for="monthly">Monthly</label>
                      <input type="radio" id="monthly" name="timeframe">
                    </div>
                  </li>
                </ul>
            </div>
            <AreaChart/>
          </div>
          <div class="rounded-xl shadow-md bg-white p-6">
            <h2 class="mb-4 text-xl font-semibold">Priority Timeline</h2>
            <div class="space-y-4">
              <template v-if="userTaskStore.priorityTimeline?.today?.length > 0 || userTaskStore.priorityTimeline?.tomorrow?.length > 0">
                <div v-for="(timeline, day) in userTaskStore.priorityTimeline" :key="day" class="flex items-center gap-4">
                  <div v-if="timeline.length > 0" class="w-24 shrink-0 text-sm text-gray-600 capitalize">{{ day }}</div>
                  <div v-if="timeline.length > 0" class="min-w-0 flex-grow rounded-lg bg-gray-100 p-4">
                    <div v-for="task in timeline" :key="task.id" class="mb-2 flex items-center gap-3">
                      <span v-if="day == 'tomorrow'" class="h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
                      <span v-if="day == 'today'" class="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
                      <router-link :to="{name: 'tasks.show', params: { projectId: task.project?.id, taskId: task?.id }}" class="min-w-0 truncate font-medium capitalize">
                        {{ task?.title }}
                      </router-link>
                      <span class="shrink-0 text-sm text-gray-500">
                        {{ task?.deadline_at }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else>
                <p class="text-center text-gray-500">No Priority Timeline</p>
              </div>
            </div>
          </div>
          <TaskActivityFeed
              :activities="userTaskStore.assignedTasks"
              :isLoading="userTaskStore.isAssignedTasksLoading"
              :isError="userTaskStore.isAssignedTasksError"
              v-model:searchQuery="userTaskStore.searchQuery"
              v-model:selectedStatus="userTaskStore.selectedStatus"
              v-model:selectedPriority="userTaskStore.selectedPriority"
            />
        </div>

        <div class="col-span-12 space-y-6 lg:col-span-4">
          <UpcomingTaskDeadlines
              :isUpcomingDeadlinesLoading="userTaskStore.isUpcomingDeadlinesLoading"
              :isUpcomingDeadlinesError="userTaskStore.isUpcomingDeadlinesError"
              :upcomingTasksDeadline="userTaskStore.upcomingTasksDeadline"
          />
          <TaskStatusDistributionChart
              v-if="!userTaskStore.isTaskCountsLoading"
              :chartData="taskCountSData" 
              title="Task Status Distribution" 
              subtitle="January 2025"
            />
        </div>
      </div>
</template>