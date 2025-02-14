import { useSweetAlert } from "@/composables/useSweetAlert2";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useProjectStore = defineStore("project", () => {
    const errors = reactive({});
    const projects = ref(null);
    const router = useRouter();
    const projectStatuses = ref([]);
    const isFetchingProjects = ref(false);
    const hasFetchProjectsError = ref(false);
    const projectPriorityLevels = ref([]);
    const selectedPriority = ref("");
    const selectedStatus = ref("");
    const route = useRoute();
    const project = ref({});
    const searchInput = ref(route.query.search || '');
    const {showToast} = useSweetAlert();
    const loading = ref(false);
    const form = reactive({
        name: '',
        description: '',
        manager: '',
        client_name: '',
        status: '',
        priority: '',
        started_at: '',
        ended_at: '',
        budget: ''
    });

    const resetForm = () => {
        form.name = '';
        form.description = '';
        form.manager = '';
        form.client_name = '';
        form.status = '';
        form.priority = '';
        form.started_at = '';
        form.ended_at = '';
        form.budget = '';

        errors.value = {}
    }

    const pagination = reactive({
        current_page: 1,
        last_page: 0,
        links: {},
        from: 0,
        to: 0,
        total: 0,
      })
    const setProjects = (data) => {
        if (!data) return;
        projects.value = data;
    }
    const setProject = (data) => {
        if (!data) return;
        project.value = data;
    }
    const setProjectDataOnEditMode = (editMode, data) => {
        if (editMode) {
            if (typeof data !== 'object' && data === null) return;
            form.name = data?.name || '';
            form.description = data?.description || '';
            form.manager = data?.manager?.id || ''
            form.client_name = data?.client_name || '';
            form.status = data?.status || ''
            form.priority = data?.priority || '';
            form.started_at = data?.started_at ? data.started_at.split('T')[0] : '';
            form.ended_at = data?.ended_at ? data.ended_at.split('T')[0] : '';
            form.budget = data?.budget || '';
        }
    }
    const setPagination = (projectsData) => {
        if (!projectsData) return;
            pagination.current_page = projectsData.current_page || 1
            pagination.links = projectsData.links || {}
            pagination.last_page = projectsData.last_page || 0
            pagination.total = projectsData.total || 0
            pagination.from = projectsData.from || 0
            pagination.to = projectsData.to || 0
    }
    const changePage = (pageUrl) => {
        if (!pageUrl) return
  
        const params = new URLSearchParams(new URL(pageUrl).search)
        const page = params.get('page')
  
        if (page) {
            updateRouteQuery({ page: page })
        }
    }

    const debounceSearch = debounce((newSearch) => {
        router
        .replace({
            query: newSearch ? { search: newSearch } : {},
        })
        .then(() => {
            getProjects()
        })
    }, 300)

    const orderBy = (column = 'created_at') => {
        const toggleDirection = route.query.direction === 'desc' ? 'asc' : 'desc'
        updateRouteQuery({ column, direction: toggleDirection })
    }
    const filterProjects = (params) => {
        updateRouteQuery(params);
    }
    const updateRouteQuery = (params = {}) => {
        console.log(params);
        return router
          .push({
            query: {
              ...route.query,
              ...params,
            },
          })
          .then(() => getProjects())
      }

    const getProject = async (projectData, editMode = false) => {
        return window.axios
            .get(`v1/projects/${projectData?.id}`)
            .then(response => {
                const data = response?.data?.data;
                setProjectDataOnEditMode(editMode, data);
                setProject(data);
            })
            .catch(error => {
                console.error('Error on fetching project:', error);
            });
    }

    const getProjects = () => {
        if (isFetchingProjects.value) return;
        isFetchingProjects.value = true

        hasFetchProjectsError.value = false;
        return window.axios
            .get("v1/projects", {params: route.query})
            .then((response) => {
                const projectsData = response?.data;
                setProjects(projectsData.data)
                setPagination(projectsData.meta);
            })
            .catch((error) => {
                hasFetchProjectsError.value = true;
                console.error('Error on fetching projects:', error)
            }).finally(() => isFetchingProjects.value = false)
    }

    const handleSubmit = async () => {
        if(loading.value) return;

        loading.value = true;

        errors.value = {};
        return window.axios
            .post("v1/projects", form)
            .then(response => {
                showToast("Project Added Successfully");
                resetForm()
                router.push({name: 'projects.index'})
            })
            .catch(error => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                } else {
                    console.error('Error on adding project:', error)
                    showToast('Project Added Failed', 'error');
                }
            })
            .finally(() => loading.value = false);
    }
    
    const updateProject = async (projectData) => {
        if (loading.value) return;
        loading.value = true;
        errors.value = {};
        return window.axios
            .put(`v1/projects/${projectData?.id}`, form)
            .then(response => {
                resetForm()
                showToast("Project Updated successfully");
                router.push({name: 'projects.show', params: {projectId: projectData?.id}});
            })
            .catch(error => {
                if (error?.response?.status === 422) {
                    errors.value = error?.response?.data?.errors;
                } else {
                    console.error('Error on updating project', error)
                }
            })
            .finally(() => loading.value = false)
    }

    const getStatuses = async () => {
        try {
            const response = await window.axios.get("v1/project-statuses");
            projectStatuses.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error on fetching project statuses', error);
        }
    } 

    const getPriorityLevels = async () => {
        try {
            const response = await window.axios.get("v1/project-priority-levels");
            projectPriorityLevels.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error on fetching project statuses', error);
        }
    } 
    
    return {
        getProjects,
        handleSubmit,
        resetForm,
        changePage,
        getProject,
        updateProject,
        getStatuses,
        orderBy,
        filterProjects,
        getPriorityLevels,
        project,
        selectedPriority,
        selectedStatus,
        hasFetchProjectsError,
        isFetchingProjects,
        projectPriorityLevels,
        projectStatuses,
        debounceSearch,
        searchInput,
        loading,
        projects,
        pagination,
        errors,
        form,
    }
});