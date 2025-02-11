<script setup>
import logo from '@/assets/images/logo.png';
</script>
<template>
     <div class="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col">
        <header>
        <nav class="bg-white shadow-sm mx-auto px-24 py-5">
            <div class="container mx-auto flex justify-between items-center">
                <RouterLink :to="{name: 'welcome'}" class="flex items-center justify-center ms-2 md:me-24">
                    <img :src="logo" class="h-7 w-8 me-2" alt="FlowBite Logo" />
                    <span class="self-center text-xl sm:text-2xl font-bold whitespace-nowrap text-blue-600">SprintSync</span>
                </RouterLink>
                <div class="space-x-4">
                    <RouterLink to="#" class="text-gray-700 hover:text-blue-600">Features</RouterLink>
                    <RouterLink to="#" class="text-gray-700 hover:text-blue-600">Pricing</RouterLink>
                    <!-- <button v-if="auth.check" @click="auth.logout" class="text-gray-700 hover:text-blue-600">Logout</button> -->
                </div>
            </div>
        </nav>
        </header>
        <main class="flex-grow container mx-auto px-24 py-10 grid md:grid-cols-2 gap-12 items-center">
        <RouterView />
        </main>
        <footer class="bg-white py-6 border-t">
            <div class="container mx-auto text-center text-gray-600">
                © 2025 SprintSync. All rights reserved.
            </div>
        </footer>
  </div>
</template>