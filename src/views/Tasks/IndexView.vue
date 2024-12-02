<template>
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-6">My Tasks</h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="task in tasks" :key="task.id" class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-lg font-bold mb-2">{{ task.title }}</h2>
          <p class="text-gray-600 mb-4">{{ task.description }}</p>
          <div class="flex justify-between items-center">
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                task.status === 'new' ? 'bg-blue-100 text-blue-600' : 
                task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              ]"
            >
              {{ task.status }}
            </span>
            <div class="flex space-x-2">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                @click="editTask(task)"
              >
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                @click="deleteTask(task.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const tasks = ref([
    {
      id: 1,
      title: 'Finish UI design',
      description: 'Complete the high-fidelity mockups for the homepage',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Implement user authentication',
      description: 'Set up the login and registration flow',
      status: 'new'
    },
    {
      id: 3,
      title: 'Deploy the app to production',
      description: 'Run final testing and deploy the app to the live server',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Write unit tests',
      description: 'Ensure 80% code coverage for the core functionality',
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Optimize database queries',
      description: 'Identify and fix any performance bottlenecks',
      status: 'new'
    },
    {
      id: 6,
      title: 'Implement responsive design',
      description: 'Make the app look great on mobile and tablet devices',
      status: 'completed'
    }
  ])
  
  const editTask = (task) => {
    // Implement edit task logic
    console.log('Editing task:', task)
  }
  
  const deleteTask = (taskId) => {
    // Implement delete task logic
    console.log('Deleting task:', taskId)
  }
  </script>