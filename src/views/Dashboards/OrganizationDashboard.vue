<script setup>
import TaskActivityFeed from "@/components/TaskActivityFeed.vue";
import UpcomingTaskDeadlines from "@/components/UpcomingTaskDeadlines.vue";
import { useUserTasks } from "@/stores/userTaskStore";
import debounce from "lodash.debounce";
import { onMounted, watch, provide, onBeforeUnmount } from "vue";
import CountsPanel from "@/components/CountsPanel.vue";
const userTaskStore = useUserTasks();
onMounted(async () => {
  await Promise.all([
    userTaskStore.fetchPriorityTimeline(),
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
onBeforeUnmount(() => {
  userTaskStore.clearFilters();
})
</script>
<template>
    <CountsPanel/>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 space-y-6 lg:col-span-8">
          <div class="rounded-xl bg-white p-6 shadow-sm">
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

          <!-- <div class="rounded-xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold">Quick Notes</h2>
            <div class="space-y-4">
              <div class="rounded-lg bg-yellow-50 p-3">
                <p class="text-sm text-yellow-800">Team meeting at 3 PM to discuss project timeline</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
</template>