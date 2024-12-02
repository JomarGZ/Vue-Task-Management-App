
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from "@/stores/Auth";

const auth = useAuth();
// State management for login and mobile menu
const isLoggedIn = ref(false)
const mobileMenuOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Logout method (placeholder)
const logout = () => {
  // Implement actual logout logic
  isLoggedIn.value = false
}
</script>
<template>
  <header>
    <nav class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">TaskMaster</h1>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-4">
            <!-- <RouterLink 
              :to="{ name: 'tasks.index'}" 
              class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </RouterLink> -->
            <template v-if="auth.check">
              <RouterLink 
                :to="{ name: 'tasks.index' }" 
                class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Tasks</span>
              </RouterLink>
              <RouterLink 
                :to="{ name: 'tasks.create' }" 
                class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Create Task</span>
              </RouterLink>
            </template>
          </div>

          <!-- Authentication Links -->
          <div class="hidden md:flex items-center space-x-4">
            <template v-if="!auth.check">
              <RouterLink 
                  v-if="!isLoggedIn"
                  :to="{name :'login'}" 
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  <span>Login</span>
                </RouterLink>

                <RouterLink 
                  v-if="!isLoggedIn"
                  :to="{ name: 'register' }" 
                  class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Register
                </RouterLink>
            </template>
            <template v-if="auth.check">
                <RouterLink 
                  :to="{ name: 'profile.index' }" 
                  class=" "
                >
                  <img src="https://i.pravatar.cc/40" class="rounded-full" alt="">
                </RouterLink>
                <button 
                  @click="auth.logout"
                  class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Logout</span>
                </button>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button 
              @click="toggleMobileMenu" 
              class="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <!-- <RouterLink 
              :to="{ name: 'tasks.index'}"  
              class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md"
            >
              Home
            </RouterLink> -->
            <template v-if="auth.check">
              <RouterLink 
                :to="{ name: 'tasks.index'}" 
                class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md"
              >
                Tasks
              </RouterLink>
              <RouterLink 
                :to="{ name: 'tasks.create' }" 
                class="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md"
              >
                Create Task
              </RouterLink>
            </template>
         

            <div class="border-t border-gray-200 pt-4">
              <template v-if="!auth.check">
                <RouterLink 
                  v-if="!isLoggedIn"
                  :to="{ name :'login'}" 
                  class="bg-blue-500 text-white block px-4 py-2 rounded-md hover:bg-blue-600 text-center mb-2"
                >
                  Login
                </RouterLink>
                <RouterLink 
                  v-if="!isLoggedIn"
                  :to="{ name: 'register' }" 
                  class="bg-green-500 text-white block px-4 py-2 rounded-md hover:bg-green-600 text-center"
                >
                  Register
                </RouterLink>
              </template>
              
              <button 
                v-if="auth.check"
                @click="logout"
                class="bg-red-500 text-white w-full px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main class="mt-24">
    <RouterView />
  </main>
</template>
