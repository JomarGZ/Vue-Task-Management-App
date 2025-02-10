import { useUtil } from "@/composables/useUtil";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useTaskStore = defineStore('tasks', () => {
    const { getPageNumber, updateRouteParams, replaceParams } = useUtil();
    const route = useRoute();
    const statuses = ref([]);
    const tasks = ref([]);
    const priorityLevels = ref([]);
    const selectedAssigneeId = ref(route?.params?.assigneeId || '');
    const selectedPriority = ref(route?.query?.priority_level || '');
    const selectedStatus = ref(route?.query?.status || '');
    const searchInput = ref(route?.query?.search || '');
    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
    })

    const resetFilters = () => {
        selectedAssigneeId.value = '';
        selectedPriority.value = '';
        selectedStatus.value = '';
        searchInput.value = '';
    }
    const changePage = (pageUrl) => {
        if (!pageUrl) return;
        const page = getPageNumber(pageUrl)
        updateRouteParams({page: page}).then(() => fetchTasks())
    }

    const onChangeFilter = (filterParam) => {
        if (!filterParam) return;
        updateRouteParams(filterParam).then(() => fetchTasks());
    }

    const debounceSearch = debounce( async (newSearch) => {
        return replaceParams(newSearch).then(() => fetchTasks())
    }, 300);

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

    const fetchStatuses = async () => {
        return window.axios.get('v1/tasks-statuses')
            .then((response) => {
                statuses.value = response?.data?.data;
            })
            .catch((error) => {
                console.error("errors",error)
            });
    }

    const fetchPriorityLevels = async () => {
        return window.axios.get('v1/task-priority-levels')
            .then((response) => {
                priorityLevels.value = response?.data?.data || [];
            })
            .catch((error) => {
                console.error("there is an error on fetching the priority levels:", error)
            });
    }

    return {
        tasks,
        pagination,
        debounceSearch,
        searchInput,
        priorityLevels,
        selectedAssigneeId,
        statuses,
        selectedPriority,
        selectedStatus,
        resetFilters,
        fetchStatuses,
        onChangeFilter,
        fetchPriorityLevels,
        fetchTasks,
        changePage,
    }
});