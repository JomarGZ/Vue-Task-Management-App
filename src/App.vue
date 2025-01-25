
<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth';

const auth = useAuth();

</script>
<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col">
    <header>
      <nav class="bg-white shadow-sm mx-auto px-24 py-5">
          <div class="container mx-auto flex justify-between items-center">
              <div class="text-2xl font-bold text-blue-600">SprintSync</div>
              <div class="space-x-4">
                <RouterLink to="#" class="text-gray-700 hover:text-blue-600">Features</RouterLink>
                <RouterLink to="#" class="text-gray-700 hover:text-blue-600">Pricing</RouterLink>
                <button v-if="auth.check" @click="auth.logout" class="text-gray-700 hover:text-blue-600">Logout</button>
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
  </body>
</template>
