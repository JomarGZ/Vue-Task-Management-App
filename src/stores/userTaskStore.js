import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserTasks = defineStore('user-tasks', () => {
    const isLoading = ref(false);
    const isError = ref(false);
    const upcomingTasksDeadline = ref([]);
    const taskCounts = reactive({
        total: 0,
        in_progress: 0,
        completed: 0,
        over_due: 0
    });
    const total_tasks = computed(() => taskCounts.total);
    const in_progress_tasks = computed(() => taskCounts.in_progress);
    const completed_tasks = computed(() => taskCounts.completed);
    const over_due_tasks = computed(() => taskCounts.over_due);

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
    const fetchTaskCounts = async () => {
        try {
            const response = await getTaskCounts();
            setCountTask(response?.data?.data)
        } catch (error) {
            console.error("Error fetching tasks counts:", error);
        }
    }

    const fetchUpcomingTaskDeadlines = async () => {
        await handleAsyncOperation(getUpcomingTaskDeadlines, (response) => {
            setUpcomingTaskDeadlines(response.data?.data);
        });
    }

    const handleAsyncOperation = async (operation, onSuccess) => {
        if (isLoading.value) return;
        isLoading.value = true;
        isError.value = false;
    
        try {
            const response = await operation();
            onSuccess(response);
        } catch (error) {
            isError.value = true;
            console.error("Error:", error);
        } finally {
            isLoading.value = false;
        }
    };  

    const getTaskCounts = async () => {
        return window.axios.get("v1/user/task-status-counts");
    }

    const getUpcomingTaskDeadlines  = async () => {
        return window.axios.get("v1/user/upcoming-tasks-deadlines");
    }
    return {
        total_tasks,
        in_progress_tasks,
        completed_tasks,
        over_due_tasks,
        taskCounts,
        isLoading,
        isError,
        upcomingTasksDeadline,
        fetchUpcomingTaskDeadlines,
        fetchTaskCounts,
    }
});