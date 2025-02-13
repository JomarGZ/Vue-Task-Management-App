<script setup>
import TaskActivityFeed from "@/components/TaskActivityFeed.vue";
import UpcomingTaskDeadlines from "@/components/UpcomingTaskDeadlines.vue";
import { useUserTasks } from "@/stores/userTaskStore";
import debounce from "lodash.debounce";
import { ref, onMounted, watch, provide } from "vue";

const userTaskStore = useUserTasks();

// Reactive filters
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedPriority = ref("");

// Fetch tasks when the component is mounted
onMounted(async () => {
  await Promise.all([
    userTaskStore.fetchTaskCounts(),
    userTaskStore.fetchAssignedTasks(),
    userTaskStore.fetchUpcomingTaskDeadlines(),
  ]);
});

// Watch for changes in filters and fetch updated activities
const debounceSearch = debounce(async() => {
  await userTaskStore.fetchAssignedTasks({
    search: searchQuery.value,
    status: selectedStatus.value,
    priority_level: selectedPriority.value,
  });
}, 300);
watch([searchQuery, selectedStatus, selectedPriority], debounceSearch);

const handlePageChange = (page) => {
  userTaskStore.fetchAssignedTasks({page: page});
};

provide('pagination', userTaskStore.pagination);
provide('handlePageChange', handlePageChange);
</script>
<template>
    <div class="grid grid-cols-4 gap-4 mb-4">
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
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Project Progress</h2>
                <div class="flex gap-2">
                    <button class="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">Week</button>
                    <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded-full">Month</button>
                    <button class="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">Year</button>
                </div>
            </div>
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <h4 class="font-medium">Website Redesign</h4>
                            <p class="text-sm text-gray-500">Design Team</p>
                        </div>
                        <span class="text-green-500 font-medium">85%</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 rounded-full">
                        <div class="h-full bg-green-500 rounded-full" style="width: 85%"></div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <h4 class="font-medium">Mobile App Development</h4>
                            <p class="text-sm text-gray-500">Development Team</p>
                        </div>
                        <span class="text-blue-500 font-medium">62%</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 rounded-full">
                        <div class="h-full bg-blue-500 rounded-full" style="width: 62%"></div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <h4 class="font-medium">Marketing Campaign</h4>
                            <p class="text-sm text-gray-500">Marketing Team</p>
                        </div>
                        <span class="text-yellow-500 font-medium">45%</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 rounded-full">
                        <div class="h-full bg-yellow-500 rounded-full" style="width: 45%"></div>
                    </div>
                </div>
            </div>
        </div>
          <!-- Recent Activity -->
          <TaskActivityFeed
              :activities="userTaskStore.assignedTasks"
              :searchQuery="searchQuery"
              :selectedStatus="selectedStatus"
              :selectedPriority="selectedPriority"
              :isLoading="userTaskStore.isAssignedTasksLoading"
              :isError="userTaskStore.isAssignedTasksError"
              @update:searchQuery="searchQuery = $event"
              @update:selectedStatus="selectedStatus = $event"
              @update:selectedPriority="selectedPriority = $event"
            />
        </div>

        <!-- Right Column -->
        <div class="col-span-12 space-y-6 lg:col-span-4">
          <!-- Team Performance -->
          <div class="rounded-xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold">Team Performance</h2>
            <div class="space-y-6">
              <div class="text-center">
                <div class="inline-block rounded-full bg-blue-50 p-4">
                  <svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="mt-4">
                  <div class="text-3xl font-bold">89%</div>
                  <div class="text-sm text-gray-500">Team Efficiency</div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <div class="mb-1 flex justify-between text-sm">
                    <span>Tasks Completed</span>
                    <span class="font-medium">45/50</span>
                  </div>
                  <div class="h-2 w-full rounded-full bg-gray-200">
                    <div class="h-2 rounded-full bg-green-500" style="width: 90%"></div>
                  </div>
                </div>
                <div>
                  <div class="mb-1 flex justify-between text-sm">
                    <span>On-time Delivery</span>
                    <span class="font-medium">38/45</span>
                  </div>
                  <div class="h-2 w-full rounded-full bg-gray-200">
                    <div class="h-2 rounded-full bg-blue-500" style="width: 84%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="mb-4 text-lg font-semibold">Task Categories</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Development</span>
                  <div class="h-2 w-32 rounded-full bg-gray-200">
                    <div class="h-2 w-3/4 rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Design</span>
                  <div class="h-2 w-32 rounded-full bg-gray-200">
                    <div class="h-2 w-1/2 rounded-full bg-pink-500"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Marketing</span>
                  <div class="h-2 w-32 rounded-full bg-gray-200">
                    <div class="h-2 w-1/4 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="mb-4 text-lg font-semibold">Priority Distribution</h3>
              <div class="flex h-32 items-center justify-between">
                <div class="flex flex-col items-center">
                  <div class="w-16 rounded-t-lg bg-red-100" style="height: 80%;">
                    <div class="w-full rounded-t-lg bg-red-500" style="height: 70%;"></div>
                  </div>
                  <span class="mt-2 text-sm">High</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-16 rounded-t-lg bg-yellow-100" style="height: 80%;">
                    <div class="w-full rounded-t-lg bg-yellow-500" style="height: 45%;"></div>
                  </div>
                  <span class="mt-2 text-sm">Medium</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-16 rounded-t-lg bg-green-100" style="height: 80%;">
                    <div class="w-full rounded-t-lg bg-green-500" style="height: 25%;"></div>
                  </div>
                  <span class="mt-2 text-sm">Low</span>
                </div>
              </div>
            </div>
        </div>
      </div>
</template>