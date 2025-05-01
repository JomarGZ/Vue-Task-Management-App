<script setup>
import Modal from './Modal.vue';
import PositionForm from './forms/PositionForm.vue';
import { Icon } from "@iconify/vue";
import { watch, onBeforeUnmount } from 'vue';
import { usePosition } from '@/stores/positionStore';
const props = defineProps({
    positionId: {
        type: Number,
        required: true
    },
    isEditPositionModalOpen: {
        type: Boolean,
        default: false
    }
})
const positionStore = usePosition();
watch(() => props.positionId, async (newId) => {
    if (newId) {
        try {
            await positionStore.fetchPosition(newId);
        } catch (error) {
            console.error('Error fetching position:', error);
        }
    }
}, { immediate: true });

const emit = defineEmits(['update:isEditPositionModalOpen','submit'])
const handleSubmit = async (values) => {
   emit('submit', values);
}

onBeforeUnmount(() => {
    positionStore.position = null;
})

</script>
<template>
    <teleport to='body'>
        <Modal>
            <div class="bg-white rounded-lg space-y-3 shadow-xl p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class=" text-2xl font-bold">Edit Position</h2>
                    <button @click="$emit('update:isEditPositionModalOpen', false)" class="hover:bg-gray-300 p-2 rounded-full"><Icon icon="iconamoon:close-bold" width="24" height="24" /></button>
                </div>
               <PositionForm @submit="handleSubmit" :isEditMode="true" :position="positionStore.position"/>
            </div>
        </Modal>
    </teleport>
</template>