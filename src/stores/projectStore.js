import { useSweetAlert } from "@/composables/useSweetAlert2";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useProjectStore = defineStore("project", () => {
    const errors = reactive({});
    const projects = ref(null);
    const router = useRouter();
    const route = useRoute();
    const project = ref({});
    const searchInput = ref(route.query.search || '');
    const {showToast} = useSweetAlert();
    const loading = ref(false);
    const form = reactive({
        name: '',
        description: ''
    });

    const resetForm = () => {
        form.name = '';
        form.description = '';

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
      const changePage = (pageUrl) => {
        if (!pageUrl) return
  
        const params = new URLSearchParams(new URL(pageUrl).search)
        const page = params.get('page')
  
        if (page) {
            updateQueryAndFetchPosts({ page: page })
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
        updateQueryAndFetchPosts({ column, direction: toggleDirection })
    }
    const updateQueryAndFetchPosts = (params = {}) => {
        router
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
                console.log(data);
                if (editMode) {
                    form.name = data.name;
                    form.description = data.description;
                } else {
                    project.value = data;
                }
            })
            .catch(error => {
                console.error('Error on fetching project:', error);
            });
    }
    const getProjects = () => {
        return window.axios
            .get("v1/projects", {params: route.query})
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
                router.push({name: 'projects.index'});
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
    return {
        getProjects,
        handleSubmit,
        resetForm,
        changePage,
        getProject,
        updateProject,
        orderBy,
        project,
        debounceSearch,
        searchInput,
        loading,
        projects,
        pagination,
        errors,
        form,
    }
});