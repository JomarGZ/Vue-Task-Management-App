<script setup>
import AppSidebarNav from '@/components/AppSidebarNav.vue';

</script>
<template>
<div class="grid grid-cols-[auto,1fr,400px] grid-rows-[auto,1fr] h-screen">
    <!-- Left Sidebar with Icons (Full height) -->
    <AppSidebarNav/>
    <!-- Top Header (Spans middle + right) -->
    <div class="bg-green-400 col-span-2 p-4 flex items-center">
        <h1 class="text-xl font-semibold">Dashboard Header</h1>
    </div>

    <!-- Main Content (Middle column) -->
    <div class="bg-red-100 p-4 overflow-y-auto">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-lg font-medium mb-4">Main Content Area</h2>
            <p class="text-gray-700">Your content goes here...</p>
        </div>
    </div>

    <!-- Right Sidebar (Full height) -->
    <div class="bg-yellow-100 row-span-2 p-4 border-l border-gray-200 overflow-y-auto">
        <h2 class="text-lg font-medium mb-4">Chat</h2>
        <div class="space-y-3">
            <div class="bg-white p-3 rounded-lg shadow-sm">Message 1</div>
            <div class="bg-white p-3 rounded-lg shadow-sm">Message 2</div>
        </div>
    </div>
</div>
</template>
