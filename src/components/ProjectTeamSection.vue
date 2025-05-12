<script setup>
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import AssigneeItem from './AssigneeItem.vue';
import { useProjectStore } from '@/stores/projectStore';
import AssignProjectTeamModal from './AssignProjectTeamModal.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    teamAssignees: {
        type: Array,
        default: () => ([])
    },
    projectId: {
        type: [Number, String],
        required: true
    }
})
const route = useRoute();
const projectTeamStore = useProjectTeamStore();
const projectStore = useProjectStore();
const isAddAssigneeFormModalShow = ref(false);


const handleRemoveAssignedMember = async (userId) => {
    const success = await projectTeamStore.removeAssignedMember(props.projectId, userId)
    if (success) projectStore.getProject(props.projectId)
}
const handleAssignSubmission = async () => {
    const success = await projectTeamStore.handleAssignMembers(route.params?.projectId);
    if (success) {
        projectStore.getProject(props.projectId)
        isAddAssigneeFormModalShow.value = false;
    }
}
</script>
<template>
    <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Team</h3>
            <AssignProjectTeamModal 
                @submit="handleAssignSubmission"
                :teamAssignees="teamAssignees"
                @open-modal="isAddAssigneeFormModalShow = !isAddAssigneeFormModalShow" 
                @close-modal="isAddAssigneeFormModalShow = false" 
                :show="isAddAssigneeFormModalShow"/>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="teamAssignees.length > 0">
                 <AssigneeItem
                    v-for="assignee in teamAssignees"
                    :id="assignee.id"
                    :key="assignee.id"
                    :name="assignee.name"
                    :avatar="assignee.avatar?.['thumb-60']"
                    :position="assignee.position?.name"
                    @remove-member="handleRemoveAssignedMember"
                />
            </template>
            <div v-else class="col-span-full text-center text-gray-700 text-xl">
                <p>No team members assigned to the project!</p>
            </div>
        </div>
    </div>
</template>