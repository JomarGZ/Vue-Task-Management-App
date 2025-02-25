<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
        <div class="space-y-7 text-center md:text-start">
            <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Empower Your <br/>
                <span class="text-blue-600">Engineering Workflow</span>
            </h1>
            <p class="text-base md:text-xl text-gray-600">
                Sprint Sync helps software teams collaborate, track progress, and deliver exceptional results faster and more efficiently.
            </p>
            <div class="flex justify-center md:justify-start space-x-4">
                <RouterLink :to="{ name: 'login' }" class="bg-blue-600 text-white p-3 md:px-8 md:py-3 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </RouterLink>
                <button class="border border-blue-600 text-blue-600 p-3 md:px-8 md:py-3 rounded-lg hover:bg-blue-50 transition">
                    Learn More
                </button>
            </div>
            <div class="flex space-x-4 items-center">
                <div class="flex -space-x-2">
                    <img src="https://i.pravatar.cc/40" alt="Team Member" class="rounded-full border-2 border-white"/>
                    <img src="https://i.pravatar.cc/40" alt="Team Member" class="rounded-full border-2 border-white"/>
                    <img src="https://i.pravatar.cc/40" alt="Team Member" class="rounded-full border-2 border-white"/>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Trusted by 500+ Engineering Teams</p>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl hidden shadow-2xl p-8 md:flex items-center justify-center">
            <div class="grid grid-cols-2 gap-6">
                <div class="bg-blue-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-blue-600 mb-4">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <h3 class="font-bold text-lg">Project Tracking</h3>
                    <p class="text-sm text-gray-600">Visualize project progress</p>
                </div>
                <div class="bg-green-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-green-600 mb-4">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 class="font-bold text-lg">Team Collaboration</h3>
                    <p class="text-sm text-gray-600">Seamless communication</p>
                </div>
                <div class="bg-purple-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-purple-600 mb-4">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <h3 class="font-bold text-lg">Task Management</h3>
                    <p class="text-sm text-gray-600">Organize your work</p>
                </div>
                <div class="bg-red-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-red-600 mb-4">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 class="font-bold text-lg">Performance Tracking</h3>
                    <p class="text-sm text-gray-600">Monitor team metrics</p>
                </div>
            </div>
        </div>
</template>