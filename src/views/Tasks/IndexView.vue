<script setup>
import { onMounted } from 'vue'
import { useTasks } from '@/stores/tasks';

const store = useTasks();

onMounted(store.fetchTasks);
</script>
<template>
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-6">My Tasks</h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="task in store.tasks.value.data" :key="task.id" class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-lg font-bold mb-2">{{ task.title }}</h2>
          <p class="text-gray-600 mb-4">{{ task.description }}</p>
          <div class="flex justify-between items-center">
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                task.status === 'completed' ? 'bg-blue-100 text-blue-600' : 
                task.status === 'in progress' ? 'bg-green-100 text-green-600' :
                task.status === 'on hold' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              ]"
            >
              {{ task.status }}
            </span>
            <div class="flex space-x-2">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
               
              >
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
