import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskCompletionTrend = defineStore('tasks-completion-trend', () => {
    const fetching = ref();
    const error = ref(null);
    const series = ref([]);
    const setErrorNull = () => {
        error.value = null;
    }
    const getTasksCompletionTrend = async (timeframe = 'daily') => {
        if(fetching.value) return;
        fetching.value = true; 

        setErrorNull();
        try {
            const response = await window.axios.get(`api/v1/dashboard/task-completion/statistic?timeframe=${timeframe}`);
            setDataSeries(response.data?.data || [])
        } catch (e) {
            error.value = e.message
            throw e
        } finally {
            fetching.value = false
        }

    }

    const setDataSeries = (data) => {
        series.value = [
            {
                name: 'Completed',
                data: data ? data.map(item => [
                new Date(item.date.start_date).getTime(),
                item.completed
                ]) : []
            },
            {
                name: 'Target',
                data: data ? data.map(item => [
                new Date(item.date.start_date).getTime(),
                item.target
                ]) : []
            }
        ]
    }
    return {
        getTasksCompletionTrend,
        fetching,
        series,
        error,
    }
});