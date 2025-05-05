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
  <div class="min-h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto]">
    <header class="col-span-3">
        <AppHeader/>
    </header>
    <aside class=" bg-gray-50 p-4 hidden md:block row-start-2">
        <AppSidebarNav/>
    </aside>
    <main 
      class="p-4 row-start-2 bg-gray-100"
      :class="{
        'col-start-2': !showRightSidebar,
        'col-start-2 col-end-3': showRightSidebar
      }"
    >
      <RouterView />
    </main>
    
    <!-- Right Sidebar (conditional) -->
    <aside 
        v-if="showRightSidebar"
      class="bg-gray-50 hidden lg:block row-start-2 col-start-3"
    >
      <component :is="currentRightSidebar"></component>
    </aside>
  </div>
</template>