<script setup>
import TaskActivityFeed from "@/components/TaskActivityFeed.vue";
import UpcomingTaskDeadlines from "@/components/UpcomingTaskDeadlines.vue";
import { useUserTasks } from "@/stores/userTaskStore";
import debounce from "lodash.debounce";
import { onMounted, watch, provide } from "vue";

const userTaskStore = useUserTasks();
onMounted(async () => {
  await Promise.all([
    userTaskStore.fetchTaskCounts(),
    userTaskStore.fetchAssignedTasks(),
    userTaskStore.fetchUpcomingTaskDeadlines(),
  ]);
});

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
</script>
<template>
    <div class="grid md:grid-cols-4 gap-4 mb-4">
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">Total Tasks</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <div class="text-3xl font-bold">{{ userTaskStore.total_tasks }}</div>
            <div class="text-purple-100 text-sm mt-2">↑ 12% from last month</div>
        </div>
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">In Progress</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="text-3xl font-bold">{{ userTaskStore.in_progress_tasks }}</div>
            <div class="text-blue-100 text-sm mt-2">Active tasks this week</div>
        </div>
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">Completed</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="text-3xl font-bold">{{ userTaskStore.completed_tasks }}</div>
            <div class="text-green-100 text-sm mt-2">↑ 8% completion rate</div>
        </div>
        <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-sm p-6 text-white">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">Overdue</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="text-3xl font-bold">{{ userTaskStore.over_due_tasks }}</div>
            <div class="text-red-100 text-sm mt-2">Requires immediate attention</div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-6">
        <!-- Left Column -->
        <div class="col-span-12 space-y-6 lg:col-span-8">
          <!-- Priority Tasks Timeline -->
          <div class="rounded-xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold">Priority Timeline</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-24 text-sm text-gray-600">Today</div>
                <div class="flex-grow rounded-lg bg-gray-100 p-4">
                  <div class="mb-2 flex items-center gap-3">
                    <span class="h-2 w-2 rounded-full bg-red-500"></span>
                    <span class="font-medium">Database Migration</span>
                    <span class="text-sm text-gray-500">2 hours left</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span class="font-medium">API Documentation</span>
                    <span class="text-sm text-gray-500">5 hours left</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-24 text-sm text-gray-600">Tomorrow</div>
                <div class="flex-grow rounded-lg bg-gray-100 p-4">
                  <div class="flex items-center gap-3">
                    <span class="h-2 w-2 rounded-full bg-green-500"></span>
                    <span class="font-medium">Client Meeting</span>
                    <span class="text-sm text-gray-500">10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Recent Activity -->
          <TaskActivityFeed
              :activities="userTaskStore.assignedTasks"
              :isLoading="userTaskStore.isAssignedTasksLoading"
              :isError="userTaskStore.isAssignedTasksError"
              v-model:searchQuery="userTaskStore.searchQuery"
              v-model:selectedStatus="userTaskStore.selectedStatus"
              v-model:selectedPriority="userTaskStore.selectedPriority"
            />
        </div>

        <!-- Right Column -->
        <div class="col-span-12 space-y-6 lg:col-span-4">
          <!-- Upcoming Deadlines -->
         <UpcomingTaskDeadlines
            :isUpcomingDeadlinesLoading="userTaskStore.isUpcomingDeadlinesLoading"
            :isUpcomingDeadlinesError="userTaskStore.isUpcomingDeadlinesError"
            :upcomingTasksDeadline="userTaskStore.upcomingTasksDeadline"
         />

          <!-- Quick Notes -->
          <div class="rounded-xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold">Quick Notes</h2>
            <div class="space-y-4">
              <div class="rounded-lg bg-yellow-50 p-3">
                <p class="text-sm text-yellow-800">Team meeting at 3 PM to discuss project timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>