import { useSweetAlert } from "@/composables/useSweetAlert2";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProjectTeamStore = defineStore("projectTeam", () => {
    const selectedMembers = ref([]);
    const loading = ref(false);
    const project = ref({});
    const searchQuery = ref('');
    const teamMembers = ref([]); 
    const filteredOutMemberIds = ref([]);
    const {showToast, showConfirmDialog} = useSweetAlert();

    const filteredMembers = computed(() => {
        if (!searchQuery.value) return [];
        return teamMembers.value.filter((member) =>
            member.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
    const selectMember = (member) => {
        selectedMembers.value.push(member);
        filteredOutMemberIds.value.push(member.id);
        searchQuery.value = ''; 
        fetchMembers();
    };
    const resetSelectedMembers = () => {
        selectedMembers.value = [];
    };
    const resetFilteredOutMemberIds = () => {
        filteredOutMemberIds.value = [];
    };

    const removeMember = (index) => {
        if (isExistInSelectedMembers(index)) {
            removeSelectedMember(index);
        }
        removeIdFromFilteredOutMemberIds(index.id);
        fetchMembers();
    };
    const removeSelectedMember = (index) => {
        const foundIdIndex = selectedMembers.value.findIndex((member) => member.id === index.id);
        if (foundIdIndex !== -1) {
            selectedMembers.value.splice(foundIdIndex, 1);
        }
    }
    const isExistInFilteredOutMemberIds = (id) => {
        const foundIdIndex = filteredOutMemberIds.value.findIndex((filteredId) => filteredId === id);
        if (foundIdIndex !== -1) {
            return true;
        }
        return false;
    }
    const isExistInSelectedMembers = (element) => {
        return selectedMembers.value.some((member) => member.id === element.id);
    }
    const removeIdFromFilteredOutMemberIds = (id) => {
        const foundIdIndex = filteredOutMemberIds.value.findIndex((filteredId) => filteredId === id);
        if (foundIdIndex !== -1) {
            filteredOutMemberIds.value.splice(foundIdIndex, 1);
        }
    }
        
    const removeAssignedMember = async (projectId, userId) => {
        if (!projectId || !userId) {
            console.warn(`${!projectId ? 'Project ID' : 'User ID'} is required to remove assigned member`);
            return false;
        }

        if (loading.value) return;
        loading.value = true
        try {
            return await showConfirmDialog()
                .then((async result => {
                    if (!result.isConfirmed) {
                        return false;
                    }
                    try {
                        await window.axios.delete(`api/v1/projects/${projectId}/assignment?assignedMemberId=${userId}`)
                        showToast('Removed member successfully');
                        return true;
                    } catch(e) {
                        console.error('Error in removing assigned member of the project', e)
                        showToast('Remove member failed', 'error');
                        return false;
                    } 
                }))
        } finally {
            loading.value = false
        }
       
      
    }
    const resetForm = () => {
        selectedMembers.value = [];
        searchQuery.value = '';
    };

    const fetchMembers = async () => {
        try {
            const response = await window.axios.get('api/v1/tenant/members/list', {params: {filtered_out_member_ids: filteredOutMemberIds.value}});
            teamMembers.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching member list:', error);
        }
    };

    const handleAssignMembers = async (closeModal) => {
        try {
            const response = await window.axios.post(
                `api/v1/projects/${project.value.id}/assignment`, 
                {assign_team_members: selectedMembers.value.map(member => member.id)}
            )
            fetchMembers();
            showToast('Member assigned successfully');
            if (closeModal && typeof closeModal === 'function') {
                closeModal();
            }
            
        } catch (error) {
            console.error('Error assigning members:', error);
            showToast('Member assigned failed', 'error');

        }
    }

   

    return {
        project,
        selectedMembers,
        filteredOutMemberIds,
        searchQuery,
        teamMembers,
        filteredMembers,
        loading,
        removeAssignedMember,
        isExistInSelectedMembers,
        isExistInFilteredOutMemberIds,
        resetFilteredOutMemberIds,
        handleAssignMembers,
        selectMember,
        removeMember,
        resetSelectedMembers,
        resetForm,
        fetchMembers,
    };
});