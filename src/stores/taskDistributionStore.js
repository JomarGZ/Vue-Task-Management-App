import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTaskDistrubutionStore = defineStore('taskDistribution', () => {
    const fetching = ref(false);
    const error = ref(null);
    const chartData = ref([]);

    const setErrorNull = () => {
        error.value = null;
    }

    const getTaskDistribution = async () => {
        if (fetching.value) return;
        fetching.value = true;

        setErrorNull();
        try {
            const response = await window.axios.get('api/v1/dashboard/stask-distribution');
            chartData.value = response.data?.data || [];
        } catch (e) {
            error.value = e.message;
            throw e;
        } finally {
            fetching.value = false;
        }
    }
    return {
        getTaskDistribution,
        fetching,
        error,
        chartData
    }
})