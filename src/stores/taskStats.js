import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStats = defineStore('taskStats', () => {
    const loading = ref(false);
    const fetching = ref(false);
    const error = ref(null);
    const currentTotals = ref({});
    const weeklyData = ref([]);
    const tasks = ref([]);

    const setErrorNull = () => {
        error.value = null
    }
    const getTaskStats = async () => {
        if (loading.value) return;
        loading.value = true;

       setErrorNull()

        try {
            const {data} = await window.axios.get('api/v1/dashboard/tasks-statistic/counts');
            currentTotals.value = data?.data?.current_totals || {};
            weeklyData.value = data?.data?.weekly_data || []
        } catch (e) {
            console.error('Failed to get task statistic data', e);
            error.value = e.message
            throw e;
        } finally {
            loading.value = false;
        }
    }



    return {
        getTaskStats,
        weeklyData,
        tasks,
        currentTotals,
        loading,
        fetching
    }
});