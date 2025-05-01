<script setup>
import { Icon } from '@iconify/vue';
import Modal from './Modal.vue';
import PositionForm from './forms/PositionForm.vue';
const props = defineProps({
    isEditMode: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:isCreatePositionModalOpen', 'submit'])
const handleSubmit = async (values) => {
    emit('submit', values);
}
</script>
<template>
    <teleport to='body'>
        <Modal>
            <div class="bg-white rounded-lg space-y-3 shadow-xl p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class=" text-2xl font-bold">Add Position</h2>
                    <button @click="$emit('update:isCreatePositionModalOpen', false)" class="hover:bg-gray-300 p-2 rounded-full"><Icon icon="iconamoon:close-bold" width="24" height="24" /></button>
                </div>
               <PositionForm @submit="handleSubmit"/>
            </div>
        </Modal>
    </teleport>
</template>