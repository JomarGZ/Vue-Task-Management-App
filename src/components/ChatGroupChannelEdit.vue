<script setup>
import { Icon } from '@iconify/vue';
import ChatChannelForm from './ChatChannelForm.vue';
import { ref } from 'vue';
defineProps({
    isModalShow: {
        type: Boolean,
        default: false
    },
    isActionLoading: {
        type: Boolean,
        default: false
    },
    channelToEdit: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['emit-submission', 'onModalShow', 'onModalClose'])
const onEmitSubmit = (data) => {
    emit('emit-submission', data)
}

const currentStep = ref('form') // 'form' or 'participants'
const participants = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
])

const removeParticipant = (id) => {
  participants.value = participants.value.filter(p => p.id !== id)
}

const goToParticipants = () => currentStep.value = 'participants'
const goToForm = () => currentStep.value = 'form'

</script>

<template>
    <teleport to='body'>
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform opacity-0 scale-125"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-125"
        >
        <div v-if="isModalShow" class="fixed inset-0 bg-gray-900/50 z-40 flex items-center justify-center">
           <div class="p-6 bg-white rounded-lg shadow-md min-w-2xl max-w-3xl">
    <div class="border-b p-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h3 class="text-lg font-semibold">
          {{ currentStep === 'form' ? 'Edit team channel' : 'Channel participants' }}
        </h3>
      </div>
      <button
        type="button"
        @click="$emit('onModalClose')"
        class="text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <Icon icon="ic:sharp-close" width="24" height="24" />
      </button>
    </div>

    <!-- Form Step -->
    <div v-if="currentStep === 'form'">
      <ChatChannelForm
        @onSubmit="onEmitSubmit"
        :channelToEdit="channelToEdit"
        :isEditMode="true"
        :isModalShow="isModalShow"
        :isActionLoading="isActionLoading"
      />
      <div class="mt-4 pt-4 border-t">
        <button
          @click="goToParticipants"
          class="text-blue-600 cursor-pointer hover:text-blue-800 font-medium flex items-center"
        >
          <Icon icon="mdi:account-group" class="mr-2" />
          Manage participants ({{ participants.length }})
        </button>
      </div>
    </div>

    <!-- Participants Step -->
    <div v-if="currentStep === 'participants'" class="mt-4">
      <ul class="divide-y divide-gray-200">
        <li 
          v-for="participant in participants" 
          :key="participant.id"
          class="py-3 flex justify-between items-center"
        >
          <div>
            <p class="font-medium">{{ participant.name }}</p>
            <p class="text-sm text-gray-500">{{ participant.email }}</p>
          </div>
          <button
            @click="removeParticipant(participant.id)"
            class="text-red-500 hover:text-red-700 p-1"
            title="Remove participant"
          >
            <Icon icon="mdi:trash-can-outline" width="20" height="20" />
          </button>
        </li>
      </ul>
      
      <div class="mt-4 pt-4 border-t">
        <button
          @click="goToForm"
          class="text-blue-600 cursor-pointer hover:text-blue-800 font-medium flex items-center"
        >
          <Icon icon="mdi:arrow-left" class="mr-2" />
          Back to channel settings
        </button>
      </div>
    </div>
  </div>
        </div>
    </transition>
</teleport>
</template>