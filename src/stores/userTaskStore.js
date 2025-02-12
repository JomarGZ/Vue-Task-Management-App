import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useUserTasks = defineStore('user-tasks', () => {
    const isLoading = ref(false);
    const isError = ref(false);
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

    const setLoadingState = (loading = true, error = false) => {
        if (isLoading.value) return false;

        isLoading.value = loading;
        isError.value = error;
    }

    const setCountTask = (data) => {
        if (!data) return;
        console.log(data)
        taskCounts.total = data?.total_tasks || 0;
        taskCounts.in_progress = data?.in_progress || 0;
        taskCounts.completed = data?.completed || 0;
        taskCounts.over_due = data?.over_due || 0;
    }
    const fetchTaskCounts = async () => {
        setLoadingState()
        try {
            const response = await getTaskCounts();
            setCountTask(response?.data?.data)
        } catch (error) {
            console.error("Error fetching tasks counts:", error);
        }
    }
    const getTaskCounts = async () => {
        return window.axios.get("v1/user/task-status-counts");
    }
    return {
        total_tasks,
        in_progress_tasks,
        completed_tasks,
        over_due_tasks,
        taskCounts,
        fetchTaskCounts
    }
});