import { useSweetAlert } from "@/composables/useSweetAlert2";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectTeamStore = defineStore("projectTeam", () => {
    const selectedMembers = ref([]);
    const loading = ref(false);
    const project = ref({});
    const searchQuery = ref('');
    const teamMembers = ref([]);
    const {showToast, showConfirmDialog} = useSweetAlert();
    const validationError = ref('');
    const clearSelectedMembers = () => {
        selectedMembers.value = [];
    }
        
    const removeAssignedMember = async (projectId, userId) => {
        if (!projectId || !userId) {
            console.warn(`${!projectId ? 'Project ID' : 'User ID'} is required to remove assigned member`);
            return false;
        }

        if (loading.value) return;
        loading.value = true
        const options = {
            text: 'You will be removing this member to the project team!',
            confirmButtonText: 'Yes, remove it!'
        }
        try {
            return await showConfirmDialog(options)
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
            const response = await window.axios.get('api/v1/tenant/members/list');
            teamMembers.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching member list:', error);
        }
    };

    const handleAssignMembers = async (projectId) => {
        if (loading.value) return;
        loading.value = true;

        try {
            await window.axios.post(
                `api/v1/projects/${projectId}/assignment`, 
                {assign_team_members: selectedMembers.value.map(member => member.id)}
            )
            showToast('Member assigned successfully');
            return true;
        } catch (error) {
            if (error && error.response && error.response.status === 422) {
                validationError.value = error.response?.data?.message || 'Action is not allowed!'
            } else {
                console.error('Error assigning members:', error);
            }
            return false
        } finally {
            loading.value = false;
        }
    }

    return {
        project,
        selectedMembers,
        searchQuery,
        teamMembers,
        loading,
        removeAssignedMember,
        handleAssignMembers,
        clearSelectedMembers,
        validationError,
        resetForm,
        fetchMembers,
    };
});