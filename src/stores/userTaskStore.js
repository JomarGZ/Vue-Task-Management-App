import { useSweetAlert } from "@/composables/useSweetAlert2";
import { handleAsyncRequestOperation } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserTasks = defineStore('user-tasks', () => {
    const isTaskCountsLoading = ref(false);
    const isTaskCountsError = ref(false);
    const isUpcomingDeadlinesLoading = ref(false);
    const isUpcomingDeadlinesError = ref(false);
    const isAssignedTasksLoading = ref(false);
    const isAssignedTasksError = ref(false);
    const searchQuery = ref("");
    const selectedStatus = ref("");
    const selectedPriority = ref("");
    const upcomingTasksDeadline = ref([]);
    const assignedTasks = ref([]);
    const priorityTimeline = ref([]);
    const taskCounts = ref({});
    const error = ref();
    const {showToast} = useSweetAlert();
    const loading = ref(false);
    const tasks = ref([]);
    const clearFilters = () => {
        selectedStatus.value = "";
        selectedPriority.value = "";
    };

 
    const setUpcomingTaskDeadlines = (data) => {
        if (!data) return;
        upcomingTasksDeadline.value = data;
    }


    const fetchUpcomingTaskDeadlines = async () => {
        await handleAsyncRequestOperation(getUpcomingTaskDeadlines, (response) => {
            setUpcomingTaskDeadlines(response.data?.data);
        }, isUpcomingDeadlinesLoading, isUpcomingDeadlinesError);
    }

    const getAssignedTasks = async (userId, page = 1, filters = {}) => {
        if (isAssignedTasksLoading.value) return;
        isAssignedTasksLoading.value = true;
        error.value = {};
        try {
            if (!userId) {
                throw new Error(`User ID is required to get assigned tasks. Recieved: ${userId}`);
            }
              const params = new URLSearchParams({
                page: page,
                ...(filters.search?.trim().length > 0 && {
                    search: filters.search?.trim()
                }),
                ...(filters.status?.trim().length > 0 && {
                    status: filters.status?.trim()
                }),
                ...(filters.priority?.trim().length > 0 && {
                    priority_level: filters.priority?.trim()
                }),
                ...(filters.assigneeId && {
                    assigneeId: filters.assigneeId
                })
            });
            const response = await window.axios.get(`api/v1/user/${userId}/tasks?${params.toString()}`);
            tasks.value = response.data || []
        } catch (e) {
            console.error('Failed to get assigned tasks', e);
            error.value = e; 
            throw e;
        } finally {
            isAssignedTasksLoading.value = false
        }
    }
  
    const getTaskCounts = async () => {
        if (isTaskCountsLoading.value) return;
        isTaskCountsLoading.value = true;
        try {
            const response = await window.axios.get("api/v1/user/task-status-counts");
            taskCounts.value = response?.data?.data || {};
        } catch (e) {
            console.error("Error fetching task counts:", e);
            showToast('Failed to fetch task counts', 'error');
        } finally {
            isTaskCountsLoading.value = false;
        }
    }
    const getUpcomingTaskDeadlines  = async () => {
        return window.axios.get("api/v1/user/upcoming-tasks-deadlines");
    }

    const fetchPriorityTimeline = async () => {
        try {
            const response = await window.axios.get('api/v1/user/priority-timeline');
            priorityTimeline.value = response?.data || [];
        } catch(error) {
            console.error("Error fetching priority timeline:", error);
        }
    }


    return {
        getTaskCounts,
        priorityTimeline,
        taskCounts,
        assignedTasks,
        isAssignedTasksLoading,
        isUpcomingDeadlinesLoading,
        tasks,
        isAssignedTasksError,
        searchQuery,
        loading,
        selectedStatus,
        isTaskCountsLoading,
        isUpcomingDeadlinesError,
        isTaskCountsError,
        upcomingTasksDeadline,
        selectedPriority,
        getAssignedTasks,
        fetchPriorityTimeline,
        fetchUpcomingTaskDeadlines,
        clearFilters,
    }
});