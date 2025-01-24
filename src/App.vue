
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from "@/stores/auth";



</script>
<template>
  <body class="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col">
    <header>
      <nav class="bg-white shadow-sm p-4">
          <div class="container mx-auto flex justify-between items-center">
              <div class="text-2xl font-bold text-blue-600">Sprint Sync</div>
              <div class="space-x-4">
                  <RouterLink href="#" class="text-gray-700 hover:text-blue-600">Features</RouterLink>
                  <RouterLink href="#" class="text-gray-700 hover:text-blue-600">Pricing</RouterLink>
                  <RouterLink href="#" class="text-gray-700 hover:text-blue-600">About</RouterLink>
              </div>
          </div>
      </nav>
    </header>
    <main class="flex-grow container mx-auto px-4 py-3 grid md:grid-cols-2 gap-12 items-center">
      <RouterView />
    </main>
    <footer class="bg-white py-6 border-t">
        <div class="container mx-auto text-center text-gray-600">
            © 2025 Sprint Sync. All rights reserved.
        </div>
    </footer>
  </body>
</template>
