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
    async function getTasks(projectId, page = 1, filters = {}) {
        if (typeof projectId !== 'string' || !projectId.trim()) {
            throw new Error('A valid non-empty projectId (string) is required');
        }
        if (loading.value) return;
        loading.value = true;
        try {
            const params = new URLSearchParams({
                page: page
            });
            const response = await window.axios.get(`api/v1/projects/${projectId}/tasks?${params.toString()}`)
            tasks.value = response.data || {}
        } catch (e) {
            console.error('Failed to fetch project tasks', e);
            throw e;
        } finally {
            loading.value = false;
        }

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

    async function storeTask (projectId, values) {
        if (typeof projectId !== 'string' || !projectId.trim()) {
            throw new  Error('A valid projectId is required to create a task');
        }
        if (!values || typeof values !== 'object' || Array.isArray(values)) {
            throw new Error('Values must be an object containing task data')
        }
        if (loading.value) return;
        loading.value = true;
        try {
            await window.axios.post(`api/v1/projects/${projectId}/tasks`, values)
            return true;
        } catch (e) {
            console.error('Failed to create a task', e);
            throw e;
        } finally {
            loading.value = false;
        }
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
    const updateTaskLinks = async (task, links) => {
        try {
            const response = await window.axios.post(`api/v1/tasks/${task.id}}/links`, links);
            showToast("Links has been added successfully");
        } catch (error) {
            console.error("Error adding links:", error);
            showToast("Error adding links", "error");
        } 
    }

    return {
        fetchStatuses,
        updateTaskLinks,
        updateTask,
        storeTask,
        deleteTask,
        updateStatus,
        fetchCategories,
        fetchPriorityLevels,
        updatePriorityLevel,
        getTask,
        getTasks,
        resetForm,
        resetTaskData,
        updateParams,
        selectedPriority,
        selectedStatus,
        priorityLevels,
        searchInput,
        taskData,
        categories,
        tasks,
        form,
        errors,
        loading,
        statuses
    }
});