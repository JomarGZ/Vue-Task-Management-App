
<script setup>
import { useTasks } from '@/stores/tasks';
import { ref, computed, watch, onMounted } from 'vue'


const store = useTasks();

onMounted(store.getTasks);
// Sample task data
const tasks = ref([
  {
    id: 1,
    title: 'Design project mockup',
    description: 'Create initial UI/UX designs for the new project',
    status: 'In Progress',
    category: 'Design',
    deadline: '2024-02-15',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Backend API development',
    description: 'Implement user authentication endpoints',
    status: 'Pending',
    category: 'Development',
    deadline: '2024-02-20',
    priority: 'Medium'
  },
  // Add more sample tasks
])

// Filter and search states
const searchTerm = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const deadlineFilter = ref('')

// Pagination
const currentPage = ref(1)
const tasksPerPage = 5

// Filtering logic
const filteredTasks = computed(() => {
  return tasks.value.filter(task => 
    task.title.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    (statusFilter.value === '' || task.status === statusFilter.value) &&
    (categoryFilter.value === '' || task.category === categoryFilter.value) &&
    (deadlineFilter.value === '' || isNearDeadline(task.deadline, deadlineFilter.value))
  )
})

// Deadline proximity check
const isNearDeadline = (taskDeadline, proximity) => {
  const today = new Date()
  const deadline = new Date(taskDeadline)
  const diffDays = (deadline - today) / (1000 * 3600 * 24)

  switch(proximity) {
    case '7days': return diffDays <= 7 && diffDays >= 0
    case '30days': return diffDays <= 30 && diffDays >= 0
    default: return true
  }
}

// Pagination computed properties

const totalPages = computed(() => 
  Math.ceil(filteredTasks.value.length / tasksPerPage)
)

</script>
<template>
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
    <!-- Status Count Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">12</h3>
          <p class="text-sm">New</p>
        </div>
        <div class="text-blue-600 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </div>

      <div class="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">8</h3>
          <p class="text-sm">In Progress</p>
        </div>
        <div class="text-yellow-600 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
      </div>

      <div class="bg-gray-100 text-gray-800 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">3</h3>
          <p class="text-sm">On Hold</p>
        </div>
        <div class="text-gray-600 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>

      <div class="bg-green-100 text-green-800 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold">7</h3>
          <p class="text-sm">Completed</p>
        </div>
        <div class="text-green-600 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Task Management</h1>
      
      <!-- Search and Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <!-- Search Input -->
        <div class="flex-grow relative">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <i class="absolute left-3 top-3 text-gray-400">🔍</i>
        </div>

        <!-- Status Filter -->
        <select 
          v-model="statusFilter"
          class="px-4 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <!-- Category Filter -->
        <select 
          v-model="categoryFilter"
          class="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option value="Design">Design</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
        </select>

        <!-- Deadline Proximity Filter -->
        <select 
          v-model="deadlineFilter"
          class="px-4 py-2 border rounded-md"
        >
          <option value="">All Deadlines</option>
          <option value="7days">This Week</option>
          <option value="7days">Next 7 Days</option>
          <option value="30days">Next 30 Days</option>
        </select>
      </div>

      <!-- Task List -->
      <div class="space-y-4">
        <div 
          v-for="task in store?.tasks?.data" 
          :key="task.id" 
          class="bg-white border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div class="flex-grow">
            <h3 class="font-semibold text-lg">{{ task.title }}</h3>
            <p class="text-gray-600 text-sm">{{ task.description }}</p>
            <div class="mt-2 flex items-center space-x-2">
              <span 
                :class="{
                  'bg-gray-100 text-gray-800': task.status === 'new',
                  'bg-blue-100 text-blue-800': task.status === 'in progress',
                  'bg-green-100 text-green-800': task.status === 'completed',
                  'bg-yellow-100 text-yellow-800': task.status === 'on hold'
                }"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ task.status }}
              </span>
              <span class="text-gray-500 text-xs">
                {{ task.category.name }} | Due: {{ task.deadline_at }}
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <RouterLink 
              :to="{ name: 'tasks.show', params: { id : task.id} }" 
              class="text-blue-500 hover:text-blue-700"
            >
              Show
            </RouterLink>
            <RouterLink 
              :to="{ name: 'tasks.edit', params: { id : task.id} }" 
              class="text-blue-500 hover:text-blue-700"
            >
              Edit
            </RouterLink>
            <button @click="store.deleteTask(task)" 
              :disabled="store.loading" 
              class="text-red-500 hover:text-red-700"
            >
              <IconSpinner v-show="store.loading"/>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-6">
        <button 
          @click="store.changePage(store.pagination.current_page - 1)"
          :disabled="! store?.tasks?.links?.prev"  
          :class="`px-4 py-2 border rounded-md ${! store?.tasks?.links?.prev ? 'disabled:opacity-50' : 'hover:bg-blue-400'}`"
        >
          Previous
        </button>
        <span class="text-gray-600">
          Page {{ store.pagination.current_page }} of {{ store.pagination.last_page}}
        </span>
        <button 
          @click="store.changePage(store.pagination.current_page + 1)"
          :disabled="! store?.tasks?.links?.next" 
          :class="`px-4 py-2 border rounded-md ${! store?.tasks?.links?.next ? 'disabled:opacity-50' : 'hover:bg-blue-400'}`"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
