<script setup>
import { Icon } from '@iconify/vue'
import TaskLinkForm from './TaskLinkForm.vue';
import { useTaskLink } from '@/stores/taskLinkStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
const props = defineProps({
    isEditFormModalShow : {
        type: Boolean,
        default: false
    },
    taskId: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits(['modal-show', 'modal-hide'])
const taskLinkStore = useTaskLink();
const projectTaskStore = useProjectTaskStore();
const onSubmit = async (values) => {
    const success = await taskLinkStore.editLink(taskLinkStore.editingLink.id, values)
    if (success) {
        await projectTaskStore.getTask(props.taskId);
        emit('modal-hide');
    }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isEditFormModalShow" class="fixed inset-0 flex items-center justify-center z-40 bg-gray-900/50">
        <div class="bg-white relative rounded-xl shadow-md min-w-2xl mx-4">
            <div class="border-b-1 border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-800">Edit Reference Files/Links</h2>
                <p class="text-gray-600 mt-1">Link approved resources only</p>
            </div>
            <TaskLinkForm @submit-link="onSubmit" :editinglink="taskLinkStore.editingLink" :isEditMode="true" :loading="taskLinkStore.loading"/>
            <button @click="$emit('modal-hide')" class="absolute right-5 top-5 hover:bg-gray-100 rounded-full p-1 cursor-pointer"><Icon icon="material-symbols:close-rounded" width="24" height="24" /></button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>