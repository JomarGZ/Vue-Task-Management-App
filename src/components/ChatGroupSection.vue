<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="w-20 md:w-64 bg-gray-50 border-r border-gray-200 flex flex-col ">
        <!-- Project Logo/Icon -->
        <div class="p-4 border-b border-gray-200 flex justify-center items-center">
            <button type="button" class="bg-primary-100 cursor-pointer text-primary-600 p-3 hover:bg-blue-100 rounded-lg">
                <Icon icon="fluent-color:chat-add-48" width="48" height="48" />
            </button>
            <div class="hidden md:block ml-3">
                <h1 class="text-lg font-semibold">Add Group Chat</h1>
            </div>
        </div>
        
        <!-- Navigation -->
        <div class="flex-1 p-2">
            <nav>
                <ul class="space-y-1">
                    <li>
                        <a href="#" class="flex items-center p-3 rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600">
                            <Icon icon="token-branded:chat" width="24" height="24" />
                            <span class="hidden md:block ml-3 font-medium">General Chat</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-3 rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600">
                            <Icon icon="token-branded:chat" width="24" height="24" />
                            <span class="hidden md:block ml-3 font-medium">Eccommerce Upgrade</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-3 rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600">
                            <Icon icon="token-branded:chat" width="24" height="24" />
                            <span class="hidden md:block ml-3 font-medium">CMS system</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-3 rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600">
                            <Icon icon="token-branded:chat" width="24" height="24" />
                            <span class="hidden md:block ml-3 font-medium">Microservice</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <!-- User Profile -->
        <div class="p-3 border-t border-gray-200 flex items-center justify-center md:justify-start">
            <div class="relative">
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" class="h-10 w-10 rounded-full">
                <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div class="hidden md:block ml-2">
                <p class="text-sm font-medium">You</p>
                <p class="text-xs text-gray-500">Admin</p>
            </div>
        </div>
    </div>
</template>