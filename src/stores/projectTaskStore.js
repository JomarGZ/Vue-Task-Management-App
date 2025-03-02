import { useSweetAlert } from "@/composables/useSweetAlert2";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useProjectTaskStore = defineStore("project-tasks", () => {
    const router = useRouter();
    const route = useRoute();
    const taskData = ref({});
    const selectedStatus = ref('');
    const selectedPriority = ref('');
    const statuses = ref([]);
    const priorityLevels = ref([]);
    const searchInput = ref(route.query.search || '');
    const tasks = ref({});
    const loading = ref(false);
    const errors = reactive({});
    const categories = reactive({});
    const { showToast } = useSweetAlert();
    const form = reactive({
        title: "",
        description: "",
        priority_level: "",
        deadline_at: "",
        completed_at: "",
        status: "",

    });
    
    const rules = computed(() => ({
        title: {
          required: helpers.withMessage('Title is required.', required),
          maxLength: helpers.withMessage('Title must not exceed 255 characters.', maxLength(255)),
        },
        description: {
          required: helpers.withMessage('Description is required.', required),
          maxLength: helpers.withMessage('Description must not exceed 500 characters.', maxLength(500)),
        },
    }));

    const v$ = useVuelidate(rules, form);
    const isActionDisabled = computed(() => loading.value || v$.value.$invalid);
    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
      })

     const debounceSearch = debounce((newSearch) => {
           router
           .replace({
               query: newSearch ? { search: newSearch } : {},
           })
           .then(() => {
               getTasks()
           })
       }, 300)


    const getTask = async (task, editMode = false) => {
        window.axios.get(`api/v1/tasks/${task.id}`).then(response => {
            const data = response.data.data;
            if (editMode) {
                form.title = data?.title;
                form.description = data?.description;
                form.status = data?.status;
                form.deadline_at = data?.deadline_at;
                form.priority_level = data?.priority_level
                form.completed_at = data?.completed_at;
            } else {
                taskData.value = data;
                selectedStatus.value = data?.status
            }
        })
    }
    const changePage = (pageUrl) => {
        if (!pageUrl) return
  
        const params = new URLSearchParams(new URL(pageUrl).search)
        const page = params.get('page')
  
        if (page) {
            updateParams({ page: page })
        }
    }
    const updateParams = (params = {}) => {
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
            .get(`api/v1/projects/${route.params.projectId}/tasks`, {params: route.query})
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
 
    function resetForm(){
        form.title = "";
        form.description = "";
        form.status = "";
        form.deadline_at = "";
        form.category_id = "";
        form.completed_at = "";
        v$.value.$reset();
        errors.value = {};
    }

    function resetTaskData() {
        taskData.value = {};
    }

    async function storeTask (project) {
        const isFormValidated = await v$.value.$validate();
        if (!isFormValidated) return;
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        return window.axios.post(`api/v1/projects/${project.id}/tasks`, form)
            .then((response) => {
                const data = response.data.data;
                showToast("Task added successfully")
                resetForm();
                router.push({ name : 'tasks.show', params: {projectId: data.project.id, taskId: data.id} })
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                } else {
                    console.error("Error on adding task:", error)
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }

    async function updateTask (task) {
        const isFormValidated = await v$.value.$validate();
        if (!isFormValidated) return;
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        updateRequest(task).then(response => {
            showToast('Task updated successfully')
            const data = response?.data?.data;
            if (data) {
                taskData.value = response?.data?.data;
            }
        })
        .finally(() => {
            loading.value = false
        })
    }

    async function deleteTask(task) {
        if (loading.value) return;
        if (! confirm("Are you sure you want to delete?")) {
            return;
        }
        loading.value = true;
        window.axios.delete(`api/v1/tasks/${task.id}`)
            .then(() => {
                getTasks();
            })
            .catch(error => {
                console.error("Error on deleting a task:", error);
            })
            .finally(() => (loading.value = false));
    }
    
    async function updateStatus (task) {
        return window.axios.patch(`api/v1/tasks/${task.id}/status`, {status: selectedStatus.value})
            .then(response => {
                showToast("Task status updated successfully");
                const data = response?.data?.data;
                if (data) {
                    taskData.value = data;
                }
            })
            .catch((error) => console.log("error:", error))
    }
    
    async function fetchStatuses () {
        return window.axios.get('api/v1/tasks-statuses')
            .then((response) => {
                statuses.value = response?.data?.data;
            })
            .catch((error) => {
                console.error("errors",error)
            });
    }
    async function fetchPriorityLevels () {
        return window.axios.get('api/v1/task-priority-levels')
            .then((response) => {
                priorityLevels.value = response?.data?.data || [];
            })
            .catch((error) => {
                console.error("there is an error on fetching the priority levels:", error)
            });
    }


    async function updatePriorityLevel (level) {
        return window.axios.put(`api/v1/tasks/${taskData.value.id}/priority/update`, { priority: level })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There is an error on updating the task priority level', error)
            })
    }

    const updateRequest = async (task) => {
        return window.axios.put(`api/v1/tasks/${task.id}`, form)
            .catch(error => {
                console.error("errors", error)
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
    }

    async function fetchCategories () {
        return window.axios.get('api/v1/categories')
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
        updateParams,
        v$,
        isActionDisabled,
        selectedPriority,
        selectedStatus,
        debounceSearch,
        priorityLevels,
        searchInput,
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