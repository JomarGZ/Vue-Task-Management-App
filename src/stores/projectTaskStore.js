import { useSweetAlert } from "@/composables/useSweetAlert2";

import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useProjectTaskStore = defineStore("project-tasks", () => {
    const task = ref({});
    const selectedStatus = ref('');
    const selectedPriority = ref('');
    const statuses = ref([]);
    const priorityLevels = ref([]);
    const tasks = ref({});
    const loading = ref(false);
    const errors = reactive({});
    const categories = reactive({});
    const { showToast } = useSweetAlert();

    const getTask = async (taskId) => {
        if (!taskId) {
            throw new Error(`taskId is required to fetch task. Received: ${taskId}`);
        }
        if (loading.value) return;
        loading.value = true;

        try {
            const response = await window.axios.get(`api/v1/tasks/${taskId}`);
            task.value = response.data?.data || {}
        } catch (e) {
            console.error('Error on fetching task', e);
            throw e;
        } finally {
            loading.value = false;
        }
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
            showToast('Task created successfully');
            return true;
        } catch (e) {
            console.error('Failed to create a task', e);
            showToast('Task created failed', 'error');
            throw e;
        } finally {
            loading.value = false;
        }
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

    const updateTask = async (taskId, values) => {
        if (!taskId) {
            throw new Error(`taskId is required to update a task. Received ${taskId}`);
        }
        if (!values || typeof values !== 'object' || Array.isArray(values)) {
            throw new Error('values must be an object containing task data');
        }
        if (loading.value) return;
        loading.value = true;

        try {
            await window.axios.put(`api/v1/tasks/${taskId}`, values)
            showToast('Task updated successfully');
            return true;
        } catch (e) {
            console.error('Error on updating task', e);
            showToast('Task update failed', 'error')
            throw e;
        } finally {
            loading.value = false
        }
      
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
        getTask,
        getTasks,
        task,
        selectedPriority,
        selectedStatus,
        priorityLevels,
        categories,
        tasks,
        errors,
        loading,
        statuses
    }
});