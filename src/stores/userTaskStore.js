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

    const taskCounts = reactive({
        total: 0,
        in_progress: 0,
        completed: 0,
        over_due: 0
    });

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
    })
    
    const total_tasks = computed(() => taskCounts.total);
    const in_progress_tasks = computed(() => taskCounts.in_progress);
    const completed_tasks = computed(() => taskCounts.completed);
    const over_due_tasks = computed(() => taskCounts.over_due);

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
    const setCountTask = (data) => {
        if (!data) return;
        taskCounts.total = data?.total_tasks || 0;
        taskCounts.in_progress = data?.in_progress || 0;
        taskCounts.completed = data?.completed || 0;
        taskCounts.over_due = data?.over_due || 0;
    }
    const setUpcomingTaskDeadlines = (data) => {
        if (!data) return;
        upcomingTasksDeadline.value = data;
    }

    const handlePageChange = async (page) => {
        await fetchAssignedTasks({page: page});
    };

    const fetchTaskCounts = async () => {
       await handleAsyncRequestOperation(getTaskCounts, (response) => {
            setCountTask(response.data?.data)
       }, isTaskCountsLoading, isTaskCountsError);
    }

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
        return window.axios.get("api/v1/user/task-status-counts");
    }
    const getUpcomingTaskDeadlines  = async () => {
        return window.axios.get("api/v1/user/upcoming-tasks-deadlines");
    }
    return {
        total_tasks,
        in_progress_tasks,
        completed_tasks,
        over_due_tasks,
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
        fetchAssignedTasks,
        fetchUpcomingTaskDeadlines,
        fetchTaskCounts,
        clearFilters,
    }
});