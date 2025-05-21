import { getPageNumber, useUtil } from "@/composables/useUtil";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useTaskStore = defineStore('tasks', () => {
    const { updateRouteParams, replaceParams } = useUtil();
    const route = useRoute();
    const loading = ref(false);
    const isError = ref(false);
    const tasks = ref([]);
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

    const updatePagination = (meta) => {
        pagination.current_page = meta.current_page || 1;
        pagination.links = meta.links || {};
        pagination.last_page = meta.last_page || 0;
        pagination.total = meta.total || 0;
        pagination.from = meta.from || 0;
        pagination.to = meta.to || 0;
    }
    const fetchTasks = async () => {
        if (loading.value) return;

        loading.value = true;
        isError.value = false;
        getTasks().then(response => {
            const data = response?.data;
            loading.value = false;
            if (data) {
                tasks.value = data.data;
                updatePagination(data?.meta || {});
            }
        }).catch((error) => isError.value = true)
        .finally(() => loading.value = false)
    }

    const getTasks = async (page = 1, filters = {}) => {
        if (loading.value) return;
        loading.value = true;
        isError.value = false;
        try {
            const params = new URLSearchParams({
                page:  page,
                ...(filters.search?.trim().length > 0 && {
                    search: filters.search.trim()
                }),
                ...(filters.status?.trim().length > 0 && {
                    status: filters.status.trim()
                }),
                ...(filters.priority?.trim().length > 0 && {
                    priority_level: filters.priority.trim()
                }),
                ...(filters.assigneeId && {
                    assigneeId: filters.assigneeId
                }),
             });
            
            const response = await window.axios.get(`api/v1/standalone/tasks?${params.toString()}`);
            tasks.value = response.data || []
        } catch (e) {
            console.error('Error on fetching tasks:', e)
            isError.value = false;
        } finally {
            loading.value = false;
        }

    }
    return {
        tasks,
        pagination,
        getTasks,
        debounceSearch,
        searchInput,
        selectedAssigneeId,
        isError,
        loading,
        selectedPriority,
        selectedStatus,
        resetFilters,
        onChangeFilter,
        fetchTasks,
        changePage,
    }
});