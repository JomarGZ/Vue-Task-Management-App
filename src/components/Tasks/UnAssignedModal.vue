<script setup>
import { useTaskAssignmentStore } from '@/stores/taskAssignmentStore';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import Modal from '../Modal.vue';
const props = defineProps({
    isUnassignModalShow: Boolean,
    task: Object
});
const emit = defineEmits(['update:isUnassignModalShow', 'taskUpdate']);

const taskAssignmentStore = useTaskAssignmentStore();

onMounted(() => {
    taskAssignmentStore.fetchMembers();
});

watch(() => props.task, (newTask) => {
    if (newTask) {
        taskAssignmentStore.initializeSelectedAssignees(newTask?.assigned_users);
    }
}, {immediate: true})

const handleSubmit = async () => {
    const success = await taskAssignmentStore.unassignedUserToTask({id: props?.task?.id});
    if (success) {
        emit('update:isUnassignModalShow', false);
        emit('taskUpdate');
    }
}
onBeforeUnmount(() => {
    taskAssignmentStore.resetForm()
})
</script>
<template>
    <teleport to='body'>
        <Modal>
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold text-gray-900">Unassign to task</h2>
                        <button @click="$emit('update:isUnassignModalShow', false)" class="text-gray-400 hover:text-gray-500">
                            <IconSVG name="x-svg"/>
                        </button>
                    </div>
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div>
                            <div class="space-y-3">
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span
                                      v-for="member in taskAssignmentStore.selectedAssignees"
                                      :key="member.id"
                                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                                        {{ member.name }}
                                        <button @click="taskAssignmentStore.removeAssignees(member)" type="button" class="ml-2 text-blue-600 hover:text-blue-800">×</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end gap-3 pt-6">
                            <button
                              @click="$emit('update:isUnassignModalShow', false)"
                              type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                           <button
                              type="submit"
                              :disabled="taskAssignmentStore.loading"
                              :class="[
                                    'flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                                    taskAssignmentStore.loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                              ]">
                                <IconSpinner name="white-spinner" v-if="taskAssignmentStore.loading"/>
                                Unassign to task
                            </button>
                        </div>
                    </form>
                </div>
        </Modal>
    </teleport>
</template>