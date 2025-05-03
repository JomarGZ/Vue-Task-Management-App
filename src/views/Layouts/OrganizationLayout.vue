<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppSidebarNav from '@/components/AppSidebarNav.vue';
import { RouterView } from 'vue-router';

</script>
<template>
<div class="grid grid-cols-[auto,1fr,400px] grid-rows-[auto,1fr] h-screen">
    <AppSidebarNav/>
    <AppHeader/>
    <!-- Main Content (Middle column) -->
    <div class="bg-gray-100 p-4 overflow-y-auto scrollbar-hide">
        <div class="max-w-4xl mx-auto">
           <RouterView/>
        </div>
    </div>

    <!-- Right Sidebar (Full height) -->
    <div class="bg-gray-50 row-span-2 p-4 border-l border-gray-200 overflow-y-auto">
        <h2 class="text-lg font-medium mb-4">Chat</h2>
        <div class="space-y-3">
            <div class="bg-white p-3 rounded-lg shadow-sm">Message 1</div>
            <div class="bg-white p-3 rounded-lg shadow-sm">Message 2</div>
        </div>
    </div>
</div>
</template>
