<script setup>
import { Icon } from '@iconify/vue'
import TaskLinkForm from './TaskLinkForm.vue';
import { useTaskLink } from '@/stores/taskLinkStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
const props = defineProps({
    taskId: {
      type: [Number, String],
      required: true
    },
    isAddFormModalShow : {
        type: Boolean,
        default: false
    },
    linksCount: {
      type: [Number, String],
      default: 0
    }
})
const emit = defineEmits(['modal-show', 'modal-hide'])
const taskLinkStore = useTaskLink();
const projectTaskStore = useProjectTaskStore();
const onSubmit = async (values) => {
const success = await taskLinkStore.addLink(props.taskId, values);
  if (success) {
    await projectTaskStore.getTask(props.taskId)
    emit('modal-hide');
  }
}
</script>

<template>
  <button 
    @click="$emit('modal-show')"
    v-if="linksCount < 4"
    type="button"
    class="text-blue-600 cursor-pointer hover:text-blue-800 text-sm flex items-center"
  >
    <Icon icon="material-symbols:add-rounded" width="24" height="24" /> Add Link
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isAddFormModalShow" class="fixed inset-0 flex items-center justify-center z-40 bg-gray-900/50">
        <div class="bg-white relative rounded-xl shadow-md min-w-2xl mx-4">
            <div class="border-b-1 border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-800">Add Reference Files/Links</h2>
                <p class="text-gray-600 mt-1">Link approved resources only</p>
            </div>
            <TaskLinkForm @submit-link="onSubmit" :loading="taskLinkStore.loading"/>
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