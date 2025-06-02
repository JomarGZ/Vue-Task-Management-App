<template>
    <li class="flex items-center py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
        <div class="relative">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="h-9 w-9 rounded-full">
            <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
        </div>
        <div class="ml-3">
            <span class="text-sm font-medium">Sarah Johnson</span>
            <span class="block text-xs text-gray-500">Design Lead</span>
        </div>
        <button class="ml-auto text-gray-400 hover:text-primary-600">
            <i class="fas fa-ellipsis-h"></i>
        </button>
    </li>
</template>