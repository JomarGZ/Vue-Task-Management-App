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
    
    const {showToast} = useSweetAlert();

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
    })
    
    const clearFilters = () => {
        selectedStatus.value = "";
        selectedPriority.value = "";
    };

    const setPagination = (data) => {
        if (!data) return;
        pagination.current_page = data.current_page;
        pagination.last_page = data.last_page;
        pagination.links = data.links;
        pagination.from = data.from;
        pagination.to = data.to;
        pagination.total = data.total;
    }
    const setAssignedTasks = (data) => {
        if (!data) return;
        assignedTasks.value = data
    }
  
    const setUpcomingTaskDeadlines = (data) => {
        if (!data) return;
        upcomingTasksDeadline.value = data;
    }

    const handlePageChange = async (page) => {
        await fetchAssignedTasks({page: page});
    };

    const fetchUpcomingTaskDeadlines = async () => {
        await handleAsyncRequestOperation(getUpcomingTaskDeadlines, (response) => {
            setUpcomingTaskDeadlines(response.data?.data);
        }, isUpcomingDeadlinesLoading, isUpcomingDeadlinesError);
    }

    const fetchAssignedTasks = async (params = {page: 1}) => {
        await handleAsyncRequestOperation(
            () => getAssignedTasks(params), (response) => {
            setAssignedTasks(response.data?.data)
            setPagination(response.data?.meta);
        }, isAssignedTasksLoading, isAssignedTasksError)
    }

    const getAssignedTasks = async (params = {}) => {
       
        if (typeof params === 'object' && params !== null) {
            return window.axios.get("api/v1/user/assigned-tasks", { params });
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
        isAssignedTasksError,
        searchQuery,
        selectedStatus,
        isTaskCountsLoading,
        isUpcomingDeadlinesError,
        isTaskCountsError,
        upcomingTasksDeadline,
        pagination,
        selectedPriority,
        handlePageChange,
        fetchPriorityTimeline,
        fetchAssignedTasks,
        fetchUpcomingTaskDeadlines,
        clearFilters,
    }
});