import { useSweetAlert } from "@/composables/useSweetAlert2";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useProjectStore = defineStore("project", () => {
    const errors = reactive({});
    const isLoading = ref(false);
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
        return router
          .push({
            query: {
              ...route.query,
              ...params,
            },
          })
          .then(() => getProjects())
      }

    const getProject = async (projectId) => {
        if (!projectId) console.warn('Project ID is required to get single project');
        if(isLoading.value) return;
        isLoading.value = true;
        try {
            const response = await window.axios.get(`api/v1/projects/${projectId}`);
            project.value = response.data?.data || {}
        } catch (e) {
            console.error('Error on fetching single project', e);
        } finally {
            isLoading.value = false
        }
    }

    const getProjects = () => {
        if (isFetchingProjects.value) return;
        isFetchingProjects.value = true

        hasFetchProjectsError.value = false;
        return window.axios
            .get("api/v1/projects", {params: route.query})
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

    const storeProject = async (data) => {
        if (loading.value) return;
        loading.value = true
        try {
            await window.axios.post("api/v1/projects", data);
            showToast('Project created successfully');
            return true;
        } catch(e) {
            console.error('Failed to create project', e);
            showToast('Project created failed', 'error');
            return false;
        } finally {
            loading.value = false
        }
    }
    
    const updateProject = async (projectId, data) => {
        if (!projectId) return;
        if (loading.value) return;
        loading.value = true

       try {
            const response = await window.axios.put(`api/v1/projects/${projectId}`, data)
            showToast('Project updated successfully');
            return true;
       } catch(e) {
            console.error('Project update failed', e)
            showToast('Project update failed', 'error');
            return false
       } finally {
            loading.value = false
       }
    }

    const getStatuses = async () => {
        try {
            const response = await window.axios.get("api/v1/project-statuses");
            projectStatuses.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error on fetching project statuses', error);
        }
    } 

    const getPriorityLevels = async () => {
        try {
            const response = await window.axios.get("api/v1/project-priority-levels");
            projectPriorityLevels.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error on fetching project statuses', error);
        }
    } 
    
    return {
        getProjects,
        storeProject,
        changePage,
        getProject,
        updateProject,
        getStatuses,
        orderBy,
        filterProjects,
        getPriorityLevels,
        project,
        isLoading,
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