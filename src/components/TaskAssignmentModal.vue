<script setup>
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { Icon } from '@iconify/vue'
import { computed, watch } from 'vue';
import UserAvatar from './UserAvatar.vue';
import AppParticipantTag from './AppParticipantTag.vue';
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: [String, Number],
        required: true
    },
    taskAssignees: {
        type: Array,
        default: () => ([])
    },
    isMaxxAssignees: {
        type: Boolean,
        default: false
    }
})



const emit = defineEmits(['open-modal', 'close-modal', 'submit']);
const projectTaskStore = useProjectTaskStore();
watch(() => props.show, (isVisible) => {
    if (isVisible) {
        projectTaskStore.getProjectTeamMembers(props.projectId)
        projectTaskStore.clearSelectedAssignees()
    } else {
        projectTaskStore.validationError = ''
    }
});

const projectTeams = computed(() => {
    let filteredProjectMembers = projectTaskStore.projectTeamMembers?.length > 0 ? projectTaskStore.projectTeamMembers : [];

    if (projectTaskStore.search.trim().length > 0) {
        const query = projectTaskStore.search.toLowerCase();
        filteredProjectMembers = filteredProjectMembers.filter(m => m.name.toLowerCase().includes(query));
    }
    if (props.taskAssignees?.length > 0) {
        filteredProjectMembers = filteredProjectMembers.filter(projectMember => !props.taskAssignees.some(taskAssignee => taskAssignee.id === projectMember.id));
    }
    if (projectTaskStore.selectedTaskAssignees?.length > 0) {
        filteredProjectMembers = filteredProjectMembers.filter(m => !projectTaskStore.selectedTaskAssignees.some(selected => selected.id === m.id));
    }
    return filteredProjectMembers;
})
const emitSubmit = () => {
    if (projectTaskStore.selectedTaskAssignees?.length > 0) {
        emit('submit')
    } else {
        projectTaskStore.validationError = 'Please search and select a member to assign';
    }
}
</script>
<template>
     <button @click="$emit('open-modal')" v-if="!isMaxxAssignees" class="px-3 py-1 cursor-pointer gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm">
        <Icon icon="heroicons-solid:user-add" width="20" height="20" />
        <span>Assign a Member</span>
    </button>
    <teleport to='body'>
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform opacity-0 scale-125"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-125"
        >
            <div v-if="show" class="fixed inset-0 bg-gray-900/50 z-40 flex items-center justify-center">
                    <div class="p-6 bg-white rounded-lg shadow-md min-w-2xl max-w-3xl">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-semibold text-gray-800">Assign Team Members</h2>

                            <button @click="$emit('close-modal')" class="text-gray-500 hover:text-gray-600 cursor-pointer transform duration-300 transition-all hover:scale-110"><Icon icon="typcn:delete-outline" width="35" height="35" /></button>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Team Members *</label>
                            
                            <!-- Selected Members Tags -->
                            <div class="flex flex-wrap gap-2 mb-2 min-w-0">
                                <template v-if="projectTaskStore.selectedTaskAssignees?.length > 0">
                                   <AppParticipantTag
                                        v-for="s in projectTaskStore.selectedTaskAssignees"
                                        :key="s.id"
                                        :name="s.name"
                                        :avatar="s.avatar?.['thumb-60']"
                                        @remove-selected-user-tag="projectTaskStore.onRemoveSelectedTaskAssignee(s)"
                                   />
                                </template>
                            </div>
                                <!-- Member Search -->
                            <div class="relative">
                                <input
                                    type="text"
                                    v-model="projectTaskStore.search"
                                    placeholder="Search members..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                <p v-if="projectTaskStore.validationError?.trim().length > 0" class="text-red-600 text-xs p-2">{{ projectTaskStore.validationError }}</p>
                                <div v-if="projectTaskStore.search" class="absolute z-10 mt-1 w-full overflow-y-auto bg-white shadow-lg rounded-md max-h-[200px] py-1 border border-gray-200">
                                    <div v-for="member in projectTeams" :key="member.id" @click="projectTaskStore.onSelectTaskAssignee(member)" class="cursor-pointer hover:bg-blue-50 px-4 py-2">
                                        <div class="flex items-center">
                                            <user-avatar :name="member.name" :avatar="member.avatar?.['thumb-60']"/>
                                            <span class="capitalize">{{ member.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="emitSubmit"
                            :disabled="projectTaskStore.loading"
                            class="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >   
                            <span v-if="projectTaskStore.loading" ><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                            <span  v-else>
                                Assign Members
                            </span>
                        </button>
                    </div>
                </div>
        </transition>
    </teleport>
</template>