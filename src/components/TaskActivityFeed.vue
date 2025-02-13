<script setup>
import { computed, onMounted, ref } from "vue";
import ModernPagination from "./ModernPagination.vue";
import { capWords, snakeCaseWord } from "@/composables/useUtil";
import { useTaskStore } from "@/stores/taskStore";

const props = defineProps({
  activities: Array,
  searchQuery: String,
  selectedStatus: String,
  selectedPriority: String,
  isLoading: Boolean,
  isError: Boolean
});

const emit = defineEmits(["update:searchQuery", "update:selectedStatus", "update:selectedPriority"]);

const taskStore = useTaskStore();

const isLoadingTask = computed(() => props.isLoading);
const isErrorTask = computed(() => props.isError);
const hasActivities = computed(() => props.activities.length > 0);
const getPriorityBgColor = computed(() => (priority) => {
    return {
        low: "bg-green-200 text-green-700",
        medium: "bg-yellow-200 text-yellow-700",
        high: "bg-orange-200 text-orange-700",
        urgent: "bg-red-200 text-red-700",
    }[priority.toLowerCase()] || "bg-gray-200 text-gray-700";
});

const setPriorityIcon = computed(() => (priority) => {
    return {
        low: "M12 14h.01M12 10h.01M12 6h.01M12 18h.01", 
        medium: "M12 2L2 22h20L12 2zm0 16h-1v-4h2v4zm0-6h-2v-2h2v2z",
        high: "M12 2s2 2 2 6-2 6-2 6-2-2-2-6 2-6 2-6z", 
        urgent: "M3 12h18m-9-9v18", 
    }[priority.toLowerCase()] || "";
});

const setIcon = computed(() => (status) => {
    return {
        not_started: "M12 6v6m0 0v6m0-6h6m-6 0H6", 
        to_do: "M4 6h16M4 12h16M4 18h16", 
        planning: "M4 4h16v16H4V4zm4 8h8m-4 4v-8", 
        in_progress: "M12 6v6m0 0v6m0-6h6m-6 0H6", 
        on_hold: "M6 4h4v16H6V4zM14 4h4v16h-4V4z",
        completed: "M5 13l4 4L19 7", 
        cancelled: "M6 18L18 6M6 6l12 12", 
        review: "M15 15l5 5m-5-5a7 7 0 1 0-10 0",
        testing: "M9 3v2h6V3m-3 5v10", 
        deployed: "M12 2L2 22h20L12 2zM12 9v4m0 4h.01", 
        pending_approval: "M2 12a10 10 0 1 1 20 0", 
        backlog: "M3 5h18l-3 4H6l-3-4", 
        blocked: "M18 6L6 18M6 6l12 12", 
        archived: "M5 8l7-4 7 4v8l-7 4-7-4V8z", 
        reopened: "M12 6V2M6 12H2m4 4v4m12-4h4m-4-4V6", 
        scheduled: "M8 2v4M16 2v4m-8 4h8", 
        draft: "M12 2l4 4-4 4-4-4 4-4zM2 12h4m4 0h4m4 0h4", 
        overdue: "M12 2L2 22h20L12 2zm0 16h-1v-4h2v4zm0-6h-2v-2h2v2z",
    }[snakeCaseWord(status)] || "";
});

const getStatusBgColor = computed(() => (status) => {
    return {
        not_started: "bg-gray-200 text-gray-700",
        to_do: "bg-blue-200 text-blue-700",
        planning: "bg-purple-200 text-purple-700",
        in_progress: "bg-yellow-200 text-yellow-700",
        on_hold: "bg-orange-200 text-orange-700",
        completed: "bg-green-200 text-green-700",
        cancelled: "bg-red-200 text-red-700",
        review: "bg-indigo-200 text-indigo-700",
        testing: "bg-teal-200 text-teal-700",
        deployed: "bg-cyan-200 text-cyan-700",
        pending_approval: "bg-yellow-300 text-yellow-800",
        backlog: "bg-gray-300 text-gray-800",
        blocked: "bg-red-400 text-red-800",
        archived: "bg-gray-500 text-gray-900",
        reopened: "bg-green-400 text-green-800",
        scheduled: "bg-blue-300 text-blue-800",
        draft: "bg-gray-400 text-gray-900",
        overdue: "bg-red-300 text-red-700",
    }[snakeCaseWord(status)] || "bg-gray-200 text-gray-700";
});

onMounted(async () => {
  await Promise.all([
    taskStore.fetchPriorityLevels(),
    taskStore.fetchStatuses()
  ]);
})

const searchQueryModel = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value)
});
const selectedStatusModel = computed({
  get: () => props.selectedStatus,
  set: (value) => emit('update:selectedStatus', value)
});
const selectedPriorityModel = computed({
  get: () => props.selectedPriority,
  set: (value) => emit('update:selectedPriority', value)
});
</script>
<template>
    <div class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-xl font-semibold">Recent Activity</h2>
  
      <!-- Search and Filters -->
      <div class="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <!-- Search Box -->
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            v-model="searchQueryModel"
          />
        </div>
  
        <!-- Status Filter -->
        <div>
          <select
            class="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            v-model="selectedStatusModel"
          >
            <option value="">All Statuses</option>
            <option v-for="(status, index) in taskStore.statuses" :key="index" :value="status">{{ capWords(status) }}</option>
          </select>
        </div>
  
        <!-- Priority Filter -->
        <div>
          <select
            class="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            v-model="selectedPriorityModel"
          >
            <option value="">All Priorities</option>
            <option v-for="(priority, index) in taskStore.priorityLevels" :key="index" :value="priority">{{ capWords(priority) }}</option>
          </select>
        </div>
      </div>
  
      <!-- Activity List -->
      <div class="space-y-4">
        <div v-if="isLoadingTask" class="flex items-center justify-center w-full p-4">
            <IconSpinner class="h-10 w-10 text-gray-500 opacity-30" name="custom-spinner" />
        </div>
        <div v-else-if="isErrorTask" class="flex items-center justify-center w-full p-4">
            <p>Failed to load assigned tasks</p>
        </div>
        <template v-else-if="hasActivities">
          <div class="flex items-start gap-4" v-for="activity in activities" :key="activity.id">
              <div class="flex h-8 w-8 items-center justify-center rounded-full" :class="getStatusBgColor(activity.status)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="setIcon(activity.status)" />
                </svg>
              </div>
              <div>
              <p class="font-medium">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.time }}</p>
              <div class="mt-1 flex space-x-2">
                  <span class="rounded-full px-2 py-1 text-xs" :class="getStatusBgColor(activity.status)">{{ capWords(activity.status) }}</span>
                  <span class="rounded-full px-2 py-1 text-xs flex items-center gap-1" :class="getPriorityBgColor(activity.priority_level)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="setPriorityIcon(activity.priority_level)" />
                  </svg>
                  {{ capWords(activity.priority_level) }}
                  </span>
              </div>
              </div>
          </div>
        </template>
        <div v-else class="flex items-center justify-center w-full p-4">
            <p>No Assigned Task Found</p>
        </div>
        </div>
      <!-- Pagination -->
      <ModernPagination v-if="hasActivities" />
    </div>
  </template>