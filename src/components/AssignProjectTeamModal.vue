<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useProjectTeamStore } from '@/stores/projectTeamStore';
const props = defineProps({
    isModalShow: Boolean,
    project: Object
})
const emit = defineEmits(['update:isModalShow', 'data-added']);

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
    <teleport to='body'>
        <transition
            enter-from-class="opacity-0 scale-125"
            enter-to-class="opacity-100 scale-100"
            enter-active-class="transition duration-200"
            leave-active-class="transition duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-125"
        >
            <Modal>
                <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold text-gray-900">Assign Members to Project</h2>
                        <button @click="$emit('update:isModalShow', false)" class="text-gray-400 hover:text-gray-500">
                            <IconSVG name="x-svg"/>
                        </button>
                    </div>
                    <form @submit.prevent="projectTeamStore.handleAssignMembers(onCloseModalAfterSuccess)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                            <div class="space-y-3">
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span
                                      v-for="member in projectTeamStore.selectedMembers"
                                      :key="member.id"
                                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                                        {{ member.name }}
                                        <button @click="projectTeamStore.removeMember(member)" type="button" class="ml-2 text-blue-600 hover:text-blue-800">×</button>
                                    </span>
                                    
                                </div>
                                <div class="relative mb-6">
                                    <input
                                        type="text"
                                        id="searchInput"
                                        v-model="projectTeamStore.searchQuery"
                                        placeholder="Search team members..."
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div
                                        v-if="projectTeamStore.filteredMembers.length > 0"
                                        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                                    >
                                        <div
                                        v-for="member in projectTeamStore.filteredMembers"
                                        :key="member.id"
                                        @click="projectTeamStore.selectMember(member)"
                                        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                        {{ member.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end gap-3 pt-6">
                            <button
                              @click="$emit('update:isModalShow', false)"
                              type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Save Team
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </transition>
    </teleport>
</template>