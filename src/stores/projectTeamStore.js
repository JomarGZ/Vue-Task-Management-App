import team from "@/router/team";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProjectTeamStore = defineStore("projectTeam", () => {
    const projectManager = ref('');
    const selectedMembers = ref([]);
    const searchQuery = ref('');
    const teamMembers = ref([]); 

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

    const setProjectManager = (manager) => {
        projectManager.value = manager;
    };

    const resetForm = () => {
        projectManager.value = '';
        selectedMembers.value = [];
        searchQuery.value = '';
    };

    const fetchMembers = async () => {
        try {
            const response = await window.axios.get('v1/tenant/members/list');
            teamMembers.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching member list:', error);
        }
    };

    return {
        projectManager,
        selectedMembers,
        searchQuery,
        teamMembers,
        filteredMembers,
        selectMember,
        removeMember,
        setProjectManager,
        resetForm,
        fetchMembers,
    };
});