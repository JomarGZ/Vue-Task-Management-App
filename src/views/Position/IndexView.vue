<script setup>
import { onMounted, ref } from 'vue';
import AddPositionModal from '@/components/AddPositionModal.vue';
import EditPositionModal from '@/components/EditPositionModal.vue';
import { usePosition } from '@/stores/positionStore';
import { TailwindPagination } from 'laravel-vue-pagination';
import { useAuth } from '@/stores/auth';
const positions = ref([
  { id: 1, name: 'Software Engineer' },
  { id: 2, name: 'Product Manager' },
  { id: 3, name: 'UX Designer' }
]);

const positionStore = usePosition();
const auth = useAuth();
const isCreatePositionModalOpen = ref(false);
const isEditPositionModalOpen = ref(false);
const editPositionId = ref(null);
const storePosition = (values) => {
    const success = positionStore.storePosition(values);
    if (success) {
        isCreatePositionModalOpen.value = false;
    }
}
const editPosition = (id) => {
    isEditPositionModalOpen.value = true;
    editPositionId.value = id;
};

const updatePosition = async (values) => {
    const success = await positionStore.updatePosition(editPositionId.value, values);
    if (success) {
        isEditPositionModalOpen.value = false;
    }           
}

onMounted(() => {
positionStore.fetchPositions();
})
</script>

<template>
  <section class="px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Job Positions</h2>
          <div class="flex space-x-3">
            <button
                v-if="auth.user?.role === 'admin'"
            @click="isCreatePositionModalOpen = true"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Position
            </button>
            <add-position-modal v-if="isCreatePositionModalOpen" v-model:isCreatePositionModalOpen="isCreatePositionModalOpen" @submit="storePosition"/>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th v-if="auth.user?.role === 'admin'" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="position in positionStore.positions?.data" 
                :key="position.id" 
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ position.name }}</div>
                    </div>
                  </div>
                </td>
                <td v-if="auth.user?.role === 'admin'" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="editPosition(position.id)"
                    class="mr-3 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    @click="positionStore.deletePosition(position.id)"
                    class="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody> 
          </table>
          <div class="flex items-center justify-center">
            <TailwindPagination
                :data="positionStore.positions"
                @pagination-change-page="positionStore.fetchPositions"
            />
          </div>
        </div>
      </div>
    </div>
    <EditPositionModal 
        v-if="isEditPositionModalOpen" 
        v-model:isEditPositionModalOpen="isEditPositionModalOpen" 
        :positionId="editPositionId"
        @submit="updatePosition"
        />
  </section>
</template>