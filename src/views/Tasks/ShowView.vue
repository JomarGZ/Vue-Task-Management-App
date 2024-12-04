<script setup>
import { ref, reactive, watchEffect} from 'vue';
import { useTasks } from '@/stores/tasks'; // Replace with the actual store path
import { useRoute } from 'vue-router';


const store = useTasks();
const route = useRoute();
watchEffect(async () => {
    store.getTask({ id: route.params.id });
});

// Define mainTask and subtasks as reactive state
const mainTask = reactive({
    title: 'Develop Vue.js Task Management Application',
    description: 'Create a comprehensive task management system with advanced features and intuitive UI',
    status: 'In Progress',
    category: 'Web Development',
    deadline: new Date('2024-02-15'),
    priority: 'High',
});

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

// Methods
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    });
};

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
    <div class="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Main Task Details -->
      <div class="bg-gray-100 p-6 border-b">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{{ store?.taskData?.title }}</h1>
            <p class="text-gray-600 mt-2">{{ store?.taskData?.description }}</p>
          </div>
          <div class="text-right">
            <div 
              :class="[
                'px-3 py-1 rounded-full text-sm font-semibold',
                getStatusClass(mainTask.status)
              ]"
            >
              {{ store?.taskData?.status }}
            </div>
          </div>
        </div>
        
        <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <span class="text-gray-500">Category:</span>
            <p class="font-medium">{{ store?.taskData?.category?.name }}</p>
          </div>
          <div>
            <span class="text-gray-500">Deadline:</span>
            <p class="font-medium">{{ store?.taskData?.deadline_at ||  '---'}}</p>
          </div>
          <div>
            <span class="text-gray-500">Priority:</span>
            <p class="font-medium">{{ store?.taskData?.priority }}</p>
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