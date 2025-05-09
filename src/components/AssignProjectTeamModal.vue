<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useProjectTeamStore } from '@/stores/projectTeamStore';
import { Icon } from '@iconify/vue'
const props = defineProps({
    isModalShow: Boolean,
    project: Object,
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:isModalShow', 'data-added', 'close-modal', 'open-modal']);

const onCloseModalAfterSuccess = () => {
    emit('update:isModalShow', false);
    emit('data-added');
}
const projectTeamStore = useProjectTeamStore();
projectTeamStore.project = props.project;

props?.project?.assigned_members?.forEach(element => {
    if (! projectTeamStore.isExistInSelectedMembers(element)) {
        projectTeamStore.selectedMembers.push(element);
    }
    if (! projectTeamStore.isExistInFilteredOutMemberIds(element.id)) {
        projectTeamStore.filteredOutMemberIds.push(element.id);
    }
});

if (! projectTeamStore.isExistInFilteredOutMemberIds(props?.project?.manager?.id)) {
    projectTeamStore.filteredOutMemberIds.push(props?.project?.manager?.id)
}
onMounted(async () => {
    projectTeamStore.fetchMembers();
})
onBeforeUnmount(() => {
    projectTeamStore.resetForm();
    projectTeamStore.resetFilteredOutMemberIds();
    projectTeamStore.resetSelectedMembers();
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
                    <div class="p-6 bg-white rounded-lg shadow-md min-w-2xl">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-semibold text-gray-800">Assign Team Members</h2>
                            <button @click="$emit('close-modal')" class="text-gray-500 hover:text-gray-600 cursor-pointer transform duration-300 transition-all hover:scale-110"><Icon icon="typcn:delete-outline" width="35" height="35" /></button>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Team Members *</label>
                            
                            <!-- Selected Members Tags -->
                            <div class="flex flex-wrap gap-2 mb-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Sarah Johnson
                                    <button class="ml-1.5 inline-flex text-blue-500 hover:text-blue-700">
                                    &times;
                                    </button>
                                </span>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Michael Chen
                                    <button class="ml-1.5 inline-flex text-blue-500 hover:text-blue-700">
                                    &times;
                                    </button>
                                </span>
                                </div>
                                
                                <!-- Member Search -->
                                <div class="relative">
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                
                                <!-- Dropdown Results -->
                                <div class="absolute hidden z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                                    <div class="cursor-pointer hover:bg-blue-50 px-4 py-2">
                                        <div class="flex items-center">
                                            <img src="https://i.pravatar.cc/40?img=1" class="w-6 h-6 rounded-full mr-2">
                                            <span>Alex Rodriguez</span>
                                        </div>
                                    </div>
                                    <div class="cursor-pointer hover:bg-blue-50 px-4 py-2">
                                        <div class="flex items-center">
                                            <img src="https://i.pravatar.cc/40?img=2" class="w-6 h-6 rounded-full mr-2">
                                            <span>Jamie Smith</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Assign Members
                        </button>
                    </div>
                </div>
        </transition>
    </teleport>
</template>