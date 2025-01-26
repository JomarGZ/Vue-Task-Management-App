import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useProjectStore = defineStore("project", () => {
    const errors = reactive({});
    const projects = ref(null);
    const form = reactive({
        name: '',
        description: ''
    });

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
      })

    const getProjects = () => {
        return window.axios
            .get("v1/projects")
            .then((response) => {
                const projectsData = response?.data;
                if (projectsData) {
                    projects.value = projectsData.data
                    pagination.current_page = projectsData.meta.current_page || 1
                    pagination.links = projectsData.meta?.links || {}
                    pagination.last_page = projectsData.meta?.last_page || 0
                    pagination.total = projectsData.meta?.total || 0
                    pagination.from = projectsData.meta?.from || 0
                    pagination.to = projectsData.meta?.to || 0
                  }
            })
            .catch((error) => {
                console.error('Error on fetching projects:', error)
            })
    }
    return {
        getProjects,
        projects,
        pagination,
        errors,
        form,
    }
});