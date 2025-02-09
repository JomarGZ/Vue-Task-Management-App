import { useUtil } from "@/composables/useUtil";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useTaskStore = defineStore('tasks', () => {
    const { getPageNumber, updateRouteParams } = useUtil();
    const route = useRoute();
    const tasks = ref([]);

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
    })
    const changePage = (pageUrl) => {
        if (!pageUrl) return;
        const page = getPageNumber(pageUrl)
        updateRouteParams({page: page}).then(() => fetchTasks())
    }
    const fetchTasks = async () => {
        getTasks().then(response => {
            const data = response?.data;
            if (data) {
                tasks.value = data?.data;
                pagination.current_page = data?.meta?.current_page || 1;
                pagination.links = data?.meta?.links || {};
                pagination.last_page = data?.meta?.last_page || 0;
                pagination.total = data?.meta?.total || 0;
                pagination.from = data?.meta?.from || 0;
                pagination.to = data?.meta?.to || 0;
            }
        })
    }

    const getTasks = async () => {
        return window.axios.get("v1/standalone/tasks", {params: route?.query})
            .catch(error => {
                console.error('Error on fetching tasks:', error)
            });
    }

    return {
        fetchTasks,
        tasks,
        pagination,
        changePage
    }
});