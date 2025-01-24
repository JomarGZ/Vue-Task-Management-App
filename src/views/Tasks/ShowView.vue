<script setup>
import { ref, reactive, watchEffect, onMounted, onBeforeUnmount} from 'vue';
import { useTasks } from '@/stores/tasks'; // Replace with the actual store path
import { useRoute } from 'vue-router';
import { useFormatters } from '@/composables/useFormatters';


const store = useTasks();
const route = useRoute();
const formatter = useFormatters();
watchEffect(async () => {
    store.getTask({ id: route.params.id });
});

onMounted(() => {
  store.fetchPriorityLevels();
  store.fetchStatuses();
});


onBeforeUnmount(store.resetTaskData)
const subtasks = reactive([
    {
    id: 1,
    title: 'Design Component Structure',
    description: 'Create a modular and reusable component architecture',
    completed: true,
    status: 'Completed',
    },
    {
    id: 2,
    title: 'Implement Tailwind CSS Styling',
    description: 'Apply responsive and clean design using Tailwind utilities',
    completed: false,
    status: 'In Progress',
    },
    {
    id: 3,
    title: 'Add State Management',
    description: 'Integrate Vuex for efficient state management',
    completed: false,
    status: 'Pending',
    },
]);

const newSubtaskTitle = ref('');
const nextSubtaskId = ref(4);


const getStatusClass = (status) => {
    const statusClasses = {
    Completed: 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    'Not Started': 'bg-gray-100 text-gray-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const toggleSubtaskCompletion = (subtask) => {
    subtask.completed = !subtask.completed;
    subtask.status = subtask.completed ? 'Completed' : 'In Progress';
};

const editSubtask = (subtask) => {
    alert(`Editing subtask: ${subtask.title}`);
};

const deleteSubtask = (subtaskId) => {
    const index = subtasks.findIndex((subtask) => subtask.id === subtaskId);
    if (index !== -1) subtasks.splice(index, 1);
};

const addSubtask = () => {
    if (newSubtaskTitle.value.trim()) {
    subtasks.push({
        id: nextSubtaskId.value++,
        title: newSubtaskTitle.value.trim(),
        description: 'No description provided',
        completed: false,
        status: 'Pending',
    });
    newSubtaskTitle.value = '';
    }
};

</script>
<template>
    <div>
      <!-- Main Task Details -->
        <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg rounded-b-none p-6">
          <div class="flex justify-between items-center"> 
              <h1 class="text-2xl font-bold text-gray-800 mb-4">
                {{ store?.taskData?.title }}
              </h1>
              <p class="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg">{{ store?.taskData?.category?.name }}</p>
          </div>
          
          
          <p class="text-gray-600 mb-6">
            {{ store?.taskData?.description }}
          </p>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <!-- Status -->
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div class="w-full">
                <p class="text-xs text-gray-500">Status</p>
                <select 
                  class="w-full border rounded px-2 py-1 text-sm"
                  v-model="store.taskData.status"
                  @change="store.updateStatus($event.target.value)"
                >
                  <option 
                    v-for="(status, index) in store?.statuses?.value" 
                    :key="index" 
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>
            </div>
               <!-- Priority -->
               <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22V8"></path>
                <path d="M16 3H2v7h14z"></path>
                <path d="M7 11v10"></path>
                <path d="M22 11H2"></path>
              </svg>
              <div class="w-full">
                <p class="text-xs text-gray-500">Priority</p>
                <select 
                  class="w-full border rounded px-2 py-1 text-sm"
                  v-model="store.taskData.priority"
                  @change="store.updatePriorityLevel($event.target.value)"
                >
                  <option 
                    v-for="(level, index) in store?.priorityLevels" 
                    :key="index" 
                    :value="level"
                    >
                      {{ level }}
                    </option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            
         

            <!-- Start Date -->
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <div>
                <p class="text-xs text-gray-500">Started</p>
                <p class="text-sm">{{ store?.taskData?.started_at ? formatter.formatDateWithTime(store?.taskData?.started_at) : '---' }}</p>
              </div>
            </div>

            <!-- Deadline -->
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <p class="text-xs text-gray-500">Deadline</p>
                <p class="text-sm">{{ store?.taskData?.deadline_at ? formatter.formatDateWithTime(store?.taskData?.deadline_at) : '---' }}</p>
              </div>
            </div>
          </div>
        </div>
  
      <!-- Subtasks Section -->
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Subtasks</h2>
        
        <div v-if="subtasks.length === 0" class="text-center text-gray-500 py-4">
          No subtasks created yet.
        </div>
  
        <div 
          v-for="subtask in subtasks" 
          :key="subtask.id" 
          :class="[
            'flex items-center justify-between p-4 border-b transition-colors duration-200',
            subtask.completed ? 'bg-green-50' : 'bg-white'
          ]"
        >
          <div class="flex items-center space-x-4 w-full">
            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="subtask.completed"
              @change="toggleSubtaskCompletion(subtask)"
              class="form-checkbox h-5 w-5 text-green-600"
            />
  
            <!-- Subtask Title and Details -->
            <div class="flex-grow">
              <div class="flex justify-between items-center">
                <span 
                  :class="[
                    subtask.completed ? 'line-through text-gray-500' : 'text-gray-800',
                    'font-medium'
                  ]"
                >
                  {{ subtask.title }}
                </span>
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs',
                    getStatusClass(subtask.status)
                  ]"
                >
                  {{ subtask.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ subtask.description }}</p>
            </div>
  
            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button 
                @click="editSubtask(subtask)"
                class="text-blue-600 hover:bg-blue-100 p-2 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
  
              <button 
                @click="deleteSubtask(subtask.id)"
                class="text-red-600 hover:bg-red-100 p-2 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add Subtask Input -->
      <div class="p-4 bg-gray-100 flex">
        <input 
          v-model="newSubtaskTitle" 
          @keyup.enter="addSubtask"
          placeholder="Add a new subtask"
          class="flex-grow p-2 border rounded-l"
        />
        <button 
          @click="addSubtask"
          class="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add Subtask
        </button>
      </div>
    </div>
  </template>