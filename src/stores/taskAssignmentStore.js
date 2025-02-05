import { useSweetAlert } from "@/composables/useSweetAlert2";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTaskAssignmentStore = defineStore('TaskAssignment', () => {
    const loading = ref(false);
    const errors = ref({});
    const teamMembers = ref([]);
    const selectedAssignees = ref([]);
    const filteredOutMemberIds = ref([]);
    const searchQuery = ref('');
    const {showToast} = useSweetAlert();

    const resetForm = () => {
        searchQuery.value = '';
        selectedAssignees.value = [];
        errors.value = {};
    }
    const removeSelectedAssignees = (member) => {
        if (isExistsOnSelectedAssignees(member)) {
            const index = selectedAssignees.value.findIndex(m => m.id === member.id);
            if (index !== -1) {
                selectedAssignees.value.splice(index, 1);
            }
        }
    }
    const selectAssignee = (assignee) => {
        selectedAssignees.value.push(assignee);
        searchQuery.value = '';
    }

    const filteredMembers = computed(() => {
        if (!searchQuery.value) return [];
        return teamMembers.value.filter((member) =>
            member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
            !selectedAssignees.value.some(assignee => assignee.id === member.id)

        );
    });
    const assignUserToTask = async (task) => {
        if (loading.value) return false;
        loading.value = true;
        errors.value = {};
        
        try {
            const response = await assignmentRequest(task);
            if (response) {
                showToast('Task assigned successfully');
                return true;
            }
            showToast('Task assigned failed', 'error');
            return false;
        } catch (error) {
            return false;
        } finally {
            loading.value = false;
        }
    }

    const initializeSelectedAssignees = (assignees) => {
        const uniqueAssignees = assignees?.filter(assignee => !isExistsOnSelectedAssignees(assignee))
        selectedAssignees.value.push(...uniqueAssignees);
    }

    const isExistsOnSelectedAssignees = (assignee) => {
        return selectedAssignees.value.some(a => a.id === assignee.id);
    }


    const assignmentRequest = async (task) => {
        return await window.axios.post(`v1/tasks/${task?.id}/assignment`, 
            {assignees: selectedAssignees.value.map(assignee => assignee.id)}
        )
            .catch(error => {
                console.error('Error on assigning task', error);
            })
    }

    const fetchMembers = async () => {
        try {
            const response = await memberListRequest(filteredOutMemberIds.value);
            teamMembers.value = response?.data?.data || [];
        } catch (error) {
            console.error('Error fetching member list:', error);
        }   
    };
    
    const memberListRequest = async (filteredOutMemberIds) => {
        try {
            const response = await window.axios.get('v1/tenant/members/list', {
                params: { filtered_out_member_ids: filteredOutMemberIds }
            });
            return response;
        } catch (error) {
            console.error('Error on fetching members', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    };
    return {
        selectedAssignees,
        searchQuery,
        filteredMembers,
        loading,
        fetchMembers,
        selectAssignee,
        initializeSelectedAssignees,
        removeSelectedAssignees,
        assignUserToTask,
        resetForm
    }
});