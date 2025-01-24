
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
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
            <!-- Logo -->
            <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-500 rounded-full"></div>
                <span class="ml-3 text-xl font-semibold">TaskCollab</span>
            </div>
            
            <!-- Navigation Links -->
            <div class="hidden md:flex space-x-8">
                <RouterLink to="" class="text-gray-600 hover:text-gray-900">Dashboard</RouterLink>  <!--- For admin only -->
                <RouterLink to="" class="text-gray-600 hover:text-gray-900">My Workspace</RouterLink>
                <RouterLink to="" class="text-gray-600 hover:text-gray-900">Workmates</RouterLink>
                <RouterLink to="" class="text-gray-600 hover:text-gray-900">Projects</RouterLink>
                <RouterLink :to="{name: 'tasks.index'}" class="text-gray-600 hover:text-gray-900">Tasks</RouterLink>
            </div>
            
            <!-- Auth Buttons -->
            <div class="flex items-center space-x-4">
                <RouterLink :to="{name: 'login'}" class="text-gray-600 hover:text-gray-900">Sign in</RouterLink>
                <RouterLink :to="{name: 'register'}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Get started today
                </RouterLink>
            </div>
        </div>
    </nav>
  </header>
  <main class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <RouterView />
  </main>
</template>
