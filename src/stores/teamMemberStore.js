import { useSweetAlert } from "@/composables/useSweetAlert2";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useTeamMemberStore = defineStore("teamMembrs", () => {
    const teamMembers = ref({});
    const route = useRoute();
    const teams = ref({});
    const router = useRouter();
    const {showToast} = useSweetAlert();
    const searchInput = ref(route.query.search || '');
    const form = reactive({
        member_id: ''
    });
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
            updateRouteQuery({ page: page })
        }
    }
    const onSelectTeam = (team) => {
        console.log(team);

    }
    const updateRouteQuery = (params = {}) => {
        router
          .push({
            query: {
              ...route.query,
              ...params,
            },
          })
          .then(() => getTeamMembers())
    }

     const debounceSearch = debounce((newSearch) => {
        router
        .replace({
            query: newSearch ? { search: newSearch } : {},
        })
        .then(() => {
            getTeamMembers()
        })
    }, 300)

    const getTeamMembers = async () => {
        return window.axios
            .get(`api/v1/teams/${route.params.teamId}/members`, {params: router.query})
            .then(response => {
                const teamMembersData = response?.data;
                if (teamMembersData) {
                    teamMembers.value = teamMembersData.data
                    pagination.current_page = teamMembersData.meta.current_page || 1
                    pagination.links = teamMembersData.meta?.links || {}
                    pagination.last_page = teamMembersData.meta?.last_page || 0
                    pagination.total = teamMembersData.meta?.total || 0
                    pagination.from = teamMembersData.meta?.from || 0
                    pagination.to = teamMembersData.meta?.to || 0
                  }
            })
            .catch(error => {
                console.error('Error on fetching team members: ', error);
            })
    };

    const getTeamMemberCounts = async (team) => {
        return window.axios
            .get(`api/v1/teams/${team.id}/statistic`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('Error on fetching team member counts: ', error);
            });
    } 

    const getTeams = async () => {
        return window.axios
            .get(`api/v1/teams`)
            .then(response => {
                teams.value = response.data.data;
                 
            })
            .catch(error => {
                console.error('Error on fetching teams: ', error);
            });
    }

    const addMemberToTeam = async (team) => {
        return window.axios
            .post(`api/v1/teams/${team.id}/members`, form)
            .then(response => {
                showToast('Member added to team successfully');
                router.push({name: 'teams.show', params: {teamId: team.id}});
            })
            .catch(error => {
                console.error('Error on adding member to team: ', error);
            });
    }
    
    return {
        getTeamMembers,
        getTeamMemberCounts,
        getTeams,
        changePage,
        onSelectTeam,
        addMemberToTeam,
        teams,
        form,
        debounceSearch,
        pagination,
        searchInput,
        teamMembers
    }
});