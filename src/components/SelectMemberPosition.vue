<script setup>
import { ref, computed, watch } from 'vue';
import { onMounted } from 'vue';
import { usePosition } from '@/stores/positionStore';

const positionStore = usePosition();
const selectedPosition = ref('');

// Compute the selected position object
const selectedPositionObject = computed(() => {
  return positionStore.unpaginatedPositions.find(p => p.id === selectedPosition.value);
});

watch(selectedPosition, (newValue) => {
  if (newValue) {
    console.log('Selected Position ID:', newValue);
  }
});
onMounted(() => {
  positionStore.fetchUnpaginatedPositions();
});
</script>

<template>
  <div class="w-full max-w-xs">
    <label for="position-select" class="block text-sm font-medium text-gray-700 mb-1">
      Select Position
    </label>
    
    <select
      id="position-select"
      v-model="selectedPosition"
      class="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="" disabled selected>Choose a position</option>
      <option 
        v-for="position in positionStore.unpaginatedPositions" 
        :key="position.id" 
        :value="position.id"
        class="text-gray-900 capitalize"
      >
        {{ position.name }}
      </option>
    </select>
    
    <div v-if="selectedPosition" class="mt-2 text-sm text-gray-500">
      Selected: {{ selectedPositionObject?.name }}
    </div>
  </div>
</template>