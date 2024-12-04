import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export const useTasks = defineStore("tasks", () => {
    const router = useRouter();
    const taskData = ref({});
    const statuses = reactive({});
    const tasks = reactive({});
    const loading = ref(false);
    const errors = reactive({});
    const categories = reactive({});

    // const task = reactive({});

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
        per_page: 10,
        total: 0,
    });


    async function fetchStatuses () {
        return window.axios.get('tasks-statuses')
            .then((response) => {
                statuses.value = response.data.statuses;
            })
            .catch((error) => {
                console.log("errors",error)
            });
    }


    async function getTask(task, editMode = false) {
        window.axios.get(`tasks/${task.id}`).then(response => {
            const data = response.data.data;
            if (editMode) {
                form.title = data.title;
                form.description = data.description;
                form.status = data.status;
                form.deadline_at = data.deadline_at;
                form.category_id = data.category?.id;
                form.completed_at = data.completed_at;
            } else {
                taskData.value = data;
            }
        })
    }

    function getTasks(page = 1) {
        return window.axios.get(`tasks?page=${page}`)
            .then(response => {
                console.log(response)
                tasks.value = response.data;

                pagination.current_page = response.data.meta.current_page
                pagination.last_page = response.data.meta.last_page
                pagination.per_page = response.data.meta.per_page
                pagination.total = response.data.meta.total
            })
            .catch((error) => console.error('error on getting the tasks data:', error));
    }

    function goToPage(page) {
        if (page > 0 && page <= pagination.last_page) {
            router.push({ 
                name: 'tasks.index', 
                query: { page: page } 
              })
            getTasks(page);
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

    async function storeTask () {
        if (loading.value) return;
        errors.value = {};
        loading.value = true;

        return window.axios.post("tasks", form)
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

        return window.axios.put(`tasks/${task.id}`, form)
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
        window.axios.delete(`tasks/${task.id}`)
            .then(() => {
                getTasks();
            })
            .catch(error => {
                console.error("Error on deleting a task:", error);
            })
            .finally(() => (loading.value = false));
    }
    
    async function updateStatus (task) {
        return window.axios.put(`tasks/${task}/status/update`, statusInput)
            .then(response => {
                console.log(response);
            })
    }

    async function fetchCategories () {
        return window.axios.get('categories')
            .then(response => {
                categories.value = response.data;
            })
    }

    return {
        fetchStatuses,
        updateTask,
        storeTask,
        deleteTask,
        goToPage,
        updateStatus,
        fetchCategories,
        getTask,
        getTasks,
        resetForm,
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