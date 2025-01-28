import { useFormatters } from "@/composables/useFormatters";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useTaskStore = defineStore("tasks", () => {
    const router = useRouter();
    const route = useRoute();
    const formatter = useFormatters();
    const taskData = ref({});
    const statuses = reactive({});
    const priorityLevels = ref(null);
    const tasks = ref({});
    const loading = ref(false);
    const errors = reactive({});
    const categories = reactive({});

    const form = reactive({
        title: "",
        description: "",
        category_id: "",
        deadline_at: "",
        completed_at: "",
        status: "",

    });

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
      })

    const routeParams = computed(() => ({
        page: route.query.page ? Number(route.query.page) : 1,
        search: route.query.search || '',
        filter: {},
        per_page: route.query.per_page ? Number(route.query.per_page) : 10
    }))

    if (route.query.status) {
        routeParams.value.filter.status = route.query.status
    }
    if (route.query.priority) {
        routeParams.value.filter.priority = route.query.priority
    }



    async function getTask(task, editMode = false) {
        window.axios.get(`v1/tasks/${task.id}`).then(response => {
            const data = response.data.data;
            if (editMode) {
                form.title = data.title;
                form.description = data.description;
                form.status = data.status;
                form.deadline_at = formatter.formatDateOnly(data.deadline_at);
                form.category_id = data.category?.id;
                form.completed_at = data.completed_at;
            } else {
                taskData.value = data;
            }
        })
    }
    const changePage = (pageUrl) => {
        if (!pageUrl) return
  
        const params = new URLSearchParams(new URL(pageUrl).search)
        const page = params.get('page')
  
        if (page) {
            updateQueryAndFetchPosts({ page: page })
        }
    }
    const updateQueryAndFetchPosts = (params = {}) => {
        router
          .push({
            query: {
              ...route.query,
              ...params,
            },
          })
          .then(() => getTasks())
      }
    async function getTasks() {
        return window.axios
            .get(`v1/projects/${route.params.projectId}/tasks`, {params: route.query})
            .then(response => {
                const tasksData = response?.data;
                if (tasksData) {
                    tasks.value = tasksData.data;
                    pagination.current_page = tasksData.meta.current_page || 1
                    pagination.links = tasksData.meta?.links || {}
                    pagination.last_page = tasksData.meta?.last_page || 0
                    pagination.total = tasksData.meta?.total || 0
                    pagination.from = tasksData.meta?.from || 0
                    pagination.to = tasksData.meta?.to || 0
                }
            })
            .catch(error => {
                console.error("Error on fetching project tasks", error);
            })
    }
   

    function searchTasks(searchTerm) {
        getTasks({
            search: searchTerm,
            page: 1
        });
    }

    function applyFilter(filters) {
        getTasks({
            filter: filters,
            page: 1
        });
    }

    function resetForm(){
        form.title = "";
        form.description = "";
        form.status = "";
        form.deadline_at = "";
        form.category_id = "";
        form.completed_at = "";
        
        errors.value = {};
    }

    function resetTaskData() {
        taskData.value = {};
    }

    async function storeTask () {
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        return window.axios.post("v1/tasks", form)
            .then(() => {
                router.push({ name : 'tasks.index' })
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    async function updateTask (task) {
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        return window.axios.put(`v1/tasks/${task.id}`, form)
            .then(() => {
                router.push({ name : 'tasks.index' })
            })
            .catch(error => {
                console.log("errors", error)
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    async function deleteTask(task) {
        if (loading.value) return;
        if (! confirm("Are you sure you want to delete?")) {
            return;
        }
        loading.value = true;
        window.axios.delete(`v1/tasks/${task.id}`)
            .then(() => {
                getTasks();
            })
            .catch(error => {
                console.error("Error on deleting a task:", error);
            })
            .finally(() => (loading.value = false));
    }
    
    async function updateStatus (status) {
        return window.axios.put(`v1/tasks/${taskData.value.id}/status/update`, {status: status})
            .then(response => {
                updateStartedAt(response.data.data.started_at);
            })
            .catch((error) => console.log("error:", error))
    }

    function updateStartedAt(startedAt) {
        taskData.value.started_at = startedAt;
    }

    
    async function fetchStatuses () {
        return window.axios.get('v1/tasks-statuses')
            .then((response) => {
                statuses.value = response.data.statuses;
            })
            .catch((error) => {
                console.log("errors",error)
            });
    }
    async function fetchPriorityLevels () {
        return window.axios.get('v1/tasks-priority-levels')
            .then((response) => {
                priorityLevels.value = response.data.priority_levels;
            })
            .catch((error) => {
                console.error("there is an error on fetching the priority levels:", error)
            });
    }


    async function updatePriorityLevel (level) {
        return window.axios.put(`v1/tasks/${taskData.value.id}/priority/update`, { priority: level })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There is an error on updating the task priority level', error)
            })
    }


    async function fetchCategories () {
        return window.axios.get('v1/categories')
            .then(response => {
                categories.value = response.data;
            })
    }

    return {
        fetchStatuses,
        updateTask,
        storeTask,
        deleteTask,
        changePage,
        updateStatus,
        fetchCategories,
        fetchPriorityLevels,
        updatePriorityLevel,
        getTask,
        getTasks,
        resetForm,
        resetTaskData,
        applyFilter,
        searchTasks,
        priorityLevels,
        taskData,
        categories,
        pagination,
        tasks,
        form,
        errors,
        loading,
        statuses
    }
});