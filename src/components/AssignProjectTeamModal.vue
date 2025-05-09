<script setup>
import { computed, watch } from 'vue';
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import { Icon } from '@iconify/vue'
import DefaultUserPic from './DefaultUserPic.vue';
const props = defineProps({
    isModalShow: Boolean,
    project: Object,
    teamAssignees: {
        type: Array,
        default: () => ([])
    },
    show: {
        type: Boolean,
        default: false
    }
})
defineEmits(['update:isModalShow', 'data-added', 'close-modal', 'open-modal', 'submit']);

const projectTeamStore = useProjectTeamStore();
projectTeamStore.project = props.project;

const onSelectMember = (member) => {
    projectTeamStore.selectedMembers.push(member)
    projectTeamStore.searchQuery = ''
}

const onRemoveSelectedMember = (selected) => {
    projectTeamStore.selectedMembers = projectTeamStore.selectedMembers.filter(m => m.id !== selected.id);
}

watch(() => props.show, (bool) => bool ?  projectTeamStore.fetchMembers() : '');
watch(() => props.show, (bool) => !bool ?  projectTeamStore.selectedMembers = [] : '');

const memberList = computed(() => {
    let filteredMembers = props.teamAssignees
        ? projectTeamStore.teamMembers.filter(member => !props.teamAssignees.some(assignee => assignee.id === member.id)) 
        : projectTeamStore.teamMembers;
    if(props.teamAssignees) {
        const query = projectTeamStore.searchQuery.toLowerCase();
        filteredMembers = filteredMembers.filter(member => member.name.toLowerCase().includes(query))
    }
    if(projectTeamStore.selectedMembers) {
        filteredMembers = filteredMembers.filter(member => !projectTeamStore.selectedMembers.some(selected => selected.id === member.id))
    }
  
    return filteredMembers;
})
</script>

<template>
     <button @click="$emit('open-modal')" class="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm">
        <i class="fas fa-user-plus mr-1"></i>Add Member
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
                                <template v-if="projectTeamStore.selectedMembers.length > 0">
                                    <span v-for="selectedMember in projectTeamStore.selectedMembers" :key="selectedMember.id" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        <img v-if="selectedMember.avatar?.['thumb-60']" :src="selectedMember.avatar?.['thumb-60']" class="w-6 h-6 rounded-full mr-3">
                                        <DefaultUserPic v-else class="w-7 h-7 mr-3" :name="selectedMember.name"/>
                                        <p class="capitalize">{{ selectedMember.name }}</p>
                                        <button @click="onRemoveSelectedMember(selectedMember)" class="ml-1.5 inline-flex text-blue-500 cursor-pointer hover:text-blue-700">
                                            &times;
                                        </button>
                                    </span>
                                </template>
                            </div>
                                <!-- Member Search -->
                            <div class="relative">
                                <input
                                    type="text"
                                    v-model="projectTeamStore.searchQuery"
                                    placeholder="Search members..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                
                                <!-- Dropdown Results -->
                                <div v-if="projectTeamStore.searchQuery" class="absolute z-10 mt-1 w-full overflow-y-auto bg-white shadow-lg rounded-md max-h-[200px] py-1 border border-gray-200">
                                    <div v-for="member in memberList" :key="member.id" @click="onSelectMember(member)" class="cursor-pointer hover:bg-blue-50 px-4 py-2">
                                        <div class="flex items-center">
                                            <img v-if="member.avatar?.['thumb-60']" :src="member.avatar?.['thumb-60']" class="w-6 h-6 rounded-full mr-3">
                                            <DefaultUserPic v-else class="w-7 h-7 mr-3" :name="member.name"/>
                                            <span class="capitalize">{{ member.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="$emit('submit')"
                            :disabled="projectTeamStore.loading"
                            class="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >   
                            <span v-if="projectTeamStore.loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                            <span v-else>
                                Assign Members
                            </span>
                        </button>
                    </div>
                </div>
        </transition>
    </teleport>
</template>