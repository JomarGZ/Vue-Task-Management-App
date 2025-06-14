<script setup>
import { Icon } from '@iconify/vue';
import ChatChannelForm from './ChatChannelForm.vue';
defineProps({
    isModalShow: {
        type: Boolean,
        default: false
    },
    isActionLoading: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['emit-submission', 'onModalShow', 'onModalClose'])
const onEmitSubmit = (data) => {
    emit('emit-submission', data)
}
</script>

<template>
    <div>
    <button type="button" @click="$emit('onModalShow')" class="hover:bg-sky-200 rounded-lg cursor-pointer p-1" title="Create team chat channel"><Icon icon="fluent-color:chat-add-16" width="30" height="30" /></button>
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
                    <h3 class="text-lg font-semibold">Create New team channel</h3>
                    <button
                        type="button"
                        @click="$emit('onModalClose')"
                        class="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <Icon icon="ic:sharp-close" width="24" height="24" />
                    </button>
                </div>
               <ChatChannelForm
                @onSubmit="onEmitSubmit"
                :isModalShow="isModalShow"
                :isActionLoading="isActionLoading"
               />
            </div>
        </div>
    </transition>
    </teleport>
    </div>
</template>