import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProjectTeamStore = defineStore("projectTeam", () => {
    const selectedMembers = ref([]);
    const project = ref({});
    const searchQuery = ref('');
    const teamMembers = ref([]); 
    const filteredOutMemberIds = ref([]);
    const filteredMembers = computed(() => {
        if (!searchQuery.value) return [];
        return teamMembers.value.filter((member) =>
            member.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
    const selectMember = (member) => {
        selectedMembers.value.push(member);
        searchQuery.value = ''; 
    };

    const removeMember = (index) => {
        selectedMembers.value.splice(index, 1);
    };
    console.log(filteredOutMemberIds.value);
  
    const resetForm = () => {
        selectedMembers.value = [];
        searchQuery.value = '';
    };

    const fetchMembers = async () => {
        try {
            const response = await window.axios.get('v1/tenant/members/list', {params: {filtered_out_member_ids: filteredOutMemberIds.value}});
            teamMembers.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching member list:', error);
        }
    };

    const handleAssignMembers = async () => {
        try {
            const response = await window.axios.post(`v1/projects/1/assignment`)
        } catch (error) {
            console.error('Error assigning members:', error);
        }
    }

    return {
        project,
        selectedMembers,
        filteredOutMemberIds,
        searchQuery,
        teamMembers,
        filteredMembers,
        handleAssignMembers,
        selectMember,
        removeMember,
        resetForm,
        fetchMembers,
    };
});