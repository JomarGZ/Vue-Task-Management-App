import { useSweetAlert } from "@/composables/useSweetAlert2";
import { AxiosError } from "axios";

import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useProjectTaskStore = defineStore("project-tasks", () => {
    const task = ref({});
    const selectedStatus = ref('');
    const selectedPriority = ref('');
    const statuses = ref([]);
    const priorityLevels = ref([]);
    const projectTeamMembers = ref([]);
    const tasks = ref({});
    const isFetching = ref(false);
    const selectedTaskAssignees = ref([]);
    const loading = ref(false);
    const error = ref({});
    const categories = reactive({});
    const { showToast, showConfirmDialog } = useSweetAlert();
    const search = ref('');

    const clearSelectedAssignees = () => {
        selectedTaskAssignees.value = [];
    }
    const onSelectTaskAssignee = (member) => {
        if (!member && typeof member !== 'object') {
            console.warn('Member is required and must be an object to add in selected assignees')
            return;
        }
        const alreadyExists = selectedTaskAssignees.value.some(
            existing => existing.id === member.id  
        )
        if (alreadyExists) {
            showToast("Already exist on the selected assignee", 'warning');
            return;
        }
        selectedTaskAssignees.value.push(member)
        search.value = ''
    }
    const onRemoveSelectedTaskAssignee = (selected) => {
        if (!selected && typeof selected !== 'object') {
            console.warn('Selected assignee is required and must be an object to remove selected assignee');
            return;
        }
        const isExists = selectedTaskAssignees.value.some(
            existing => existing.id === selected.id
        )
        if (isExists) {
            selectedTaskAssignees.value = selectedTaskAssignees.value.filter(s => s.id !== selected.id);
        }
    }
    const getTask = async (taskId) => {
        if (loading.value) return;
        isFetching.value = true;

        try {
            if (!taskId) {
                throw new Error(`taskId is required to fetch task. Received: ${taskId}`);
            }
            const response = await window.axios.get(`api/v1/tasks/${taskId}`);
            task.value = response.data?.data || {}
        } catch (e) {
            console.error('Error on fetching task', e);
            throw e;
        } finally {
            isFetching.value = false;
        }
    }
  
    async function getTasks(projectId, page = 1, filters = {}) {
       
        if (isFetching.value) return;
        isFetching.value = true;
        error.value = {};
        try {
             if (typeof projectId !== 'string' || !projectId.trim()) {
                throw new Error('A valid non-empty projectId (string) is required');
            }
            const params = new URLSearchParams({
                page: page,
                ...(filters.search?.trim().length > 0 && {
                    search: filters.search?.trim()
                }),
                ...(filters.status?.trim().length > 0 && {
                    status: filters.status?.trim()
                }),
                ...(filters.priority?.trim().length > 0 && {
                    priority_level: filters.priority?.trim()
                })
            });
            const response = await window.axios.get(`api/v1/projects/${projectId}/tasks?${params.toString()}`)
            tasks.value = response.data || {}
        } catch (e) {
            console.error('Failed to fetch project tasks', e);
            error.value = e;
            throw e;
        } finally {
            isFetching.value = false;
        }

    }

    async function storeTask (projectId, values) {
      
        if (loading.value) return;
        loading.value = true;
        try {
            if (typeof projectId !== 'string' || !projectId.trim()) {
                throw new  Error('A valid projectId is required to create a task');
            }
            if (!values || typeof values !== 'object' || Array.isArray(values)) {
                throw new Error('Values must be an object containing task data')
            }
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

    async function deleteTask(taskId) {
     
        if (loading.value) return;
        loading.value = true;
        try {
            if (!taskId) {
                throw new Error(`taskId is required to delete a task. Received: ${taskId}`)
            }
            return await showConfirmDialog()
                .then((async result => {
                    if (!result.isConfirmed) {
                        return false;
                    }
                    try {
                        await window.axios.delete(`api/v1/tasks/${taskId}`);
                        showToast('Task deleted succussfully')
                        return true;
                    } catch (e) {
                        console.error('Failed to delete a task');
                        showToast('Task deletion failed', 'error');
                        throw e;
                    }
                }))
        } finally {
            loading.value = false
        }
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
       
        if (loading.value) return;
        loading.value = true;

        try {
            if (!taskId) {
                throw new Error(`taskId is required to update a task. Received ${taskId}`);
            }
            if (!values || typeof values !== 'object' || Array.isArray(values)) {
                throw new Error('values must be an object containing task data');
            }
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

    const getProjectTeamMembers = async (projectId) => {
        if (isFetching.value) return;
        isFetching.value = true;
        error.value = {}
        try {
            if (!projectId) {
                throw new Error(`Project ID is required. Recieved: ${projectId}`)
            }
            const response = await window.axios.get(`api/v1/projects/${projectId}/team-members`)
            projectTeamMembers.value = response.data?.data || []
        } catch (e) {
            console.error('Failed to fetch project team members', e)
            throw e;
        } finally {
            isFetching.value = false
        }
    }
    return {
        fetchStatuses,
        updateTaskLinks,
        updateTask,
        selectedTaskAssignees,
        storeTask,
        deleteTask,
        updateStatus,
        fetchCategories,
        fetchPriorityLevels,
        getTask,
        getTasks,
        getProjectTeamMembers,
        onSelectTaskAssignee,
        onRemoveSelectedTaskAssignee,
        clearSelectedAssignees,
        projectTeamMembers,
        search,
        task,
        selectedPriority,
        selectedStatus,
        priorityLevels,
        categories,
        tasks,
        error,
        loading,
        isFetching,
        statuses
    }
});