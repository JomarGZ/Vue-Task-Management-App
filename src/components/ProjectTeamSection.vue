<script setup>
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import AssigneeItem from './AssigneeItem.vue';
import { useProjectStore } from '@/stores/projectStore';
import AssignProjectTeamModal from './AssignProjectTeamModal.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

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
const showMore = ref(false);

const route = useRoute();
const projectTeamStore = useProjectTeamStore();
const projectStore = useProjectStore();
const isAddAssigneeFormModalShow = ref(false);

const firstSixMembers = computed(() => props.teamAssignees?.length > 0 ? props.teamAssignees?.slice(0, 6) : []);
const moreMembers = computed(() => props.teamAssignees?.length > 6 ? props.teamAssignees.slice(6, props.teamAssignees.length) : []);

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
            <h3 class="text-lg font-medium text-gray-800">Project Team ({{ teamAssignees.length }}/20)</h3>
            <AssignProjectTeamModal
                :isMaxAssignees="teamAssignees.length >= 20"
                @submit="handleAssignSubmission"
                :teamAssignees="teamAssignees"
                @open-modal="isAddAssigneeFormModalShow = !isAddAssigneeFormModalShow" 
                @close-modal="isAddAssigneeFormModalShow = false" 
                :show="isAddAssigneeFormModalShow"/>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="firstSixMembers.length > 0">
                 <AssigneeItem
                    v-for="assignee in firstSixMembers"
                    :id="assignee.id"
                    :key="assignee.id"
                    :name="assignee.name"
                    :avatar="assignee.avatar?.['thumb-60']"
                    :position="assignee.position"
                    @remove-member="handleRemoveAssignedMember"
                />
            </template>
            <div v-show="showMore" class="contents">
                <template v-if="moreMembers.length > 0">
                    <AssigneeItem
                        v-for="assignee in moreMembers"
                        :id="assignee.id"
                        :key="assignee.id"
                        :name="assignee.name"
                        :avatar="assignee.avatar?.['thumb-60']"
                        :position="assignee.position?.name"
                        @remove-member="handleRemoveAssignedMember"
                    />
                </template>
            </div>
            <div v-if="teamAssignees.length === 0" class="col-span-full text-center text-gray-600 font-semibold text-sm">No team members found!</div>
        </div>
         <div
            v-if="moreMembers.length > 0"
            class="flex items-center mt-5 justify-center"
        >
            <button @click="showMore = !showMore" class="font-semibold text-gray-500 flex text-sm hover:text-blue-800 cursor-pointer items-center justify-center py-1">
                <span v-text="showMore ? 'Show Less' : 'Show More'"></span>
                <Icon icon="ri:arrow-down-s-line" width="24" height="24" :class="{ 'transform rotate-180': showMore }" />
            </button>
        </div>
    </div>
</template>