<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppSidebarNav from '@/components/AppSidebarNav.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import RightSidebar from '@/components/RightSidebar.vue';
const route = useRoute();
const rightSidebarMap = {
    'organization.dashboard': RightSidebar,
}
const currentRightSidebar = computed(() => rightSidebarMap[route.name] || null);
const showRightSidebar = computed(() => currentRightSidebar.value !== null);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <AppHeader/>
    </header>
    
    <div class="flex flex-1 overflow-hidden">
      <aside class="bg-gray-50 p-4 hidden md:block flex-shrink-0">
        <AppSidebarNav/>
      </aside>
      
      <main class="flex-1 p-4 bg-gray-100 overflow-auto">
        <div class="max-w-full mx-auto">
          <RouterView />
        </div>
      </main>
      
      <aside 
        v-if="showRightSidebar"
        class="bg-gray-50 hidden lg:block flex-shrink-0 w-72"
      >
        <component :is="currentRightSidebar"></component>
      </aside>
    </div>
  </div>
</template>