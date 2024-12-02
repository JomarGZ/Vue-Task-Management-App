import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export const useTasks = defineStore("tasks", () => {

    const statuses = reactive({});
    const tasks = reactive({});
    const loading = ref(false);
    const errors = reactive({});

    const statusInput = ({
        status: ""
    }) ;
    const form = ({
        title: "",
        description: "",
        status: "",
        category_id: "",
        deadline_at: "",
    });
    async function fetchStatuses () {
        return window.axios.get('tasks/statuses')
            .then((response) => {
                console.log(response);
                statuses.value = response.data.statuses;
            });
    }

    async function fetchTasks () {
        return window.axios.get("tasks")
            .then(response => {
                tasks.value = response.data;
            });
    }
    function resetForm(){
        form.title = "";
        form.description = "";
        form.status = "";
        form.category_id = "";
        form.deadline_at = "";
        
        errors.value = {};
    }

    async function handleSubmit () {
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        return window.axios.post("api/v1/tasks", form)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => {
                loading.value = false;
            })
    }
    
    async function updateStatus (task) {
        return window.axios.put(`tasks/${task}/status/update`, statusInput)
            .then(response => {
                console.log(response);
            })
    }

    return {
        fetchStatuses,
        updateStatus,
        fetchTasks,
        handleSubmit,
        resetForm,
        tasks,
        form,
        errors,
        loading,
        statusInput,
        statuses
    }
});