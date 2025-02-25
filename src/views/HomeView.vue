<script setup lang="ts">
import Feature from '@/components/Feature.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
        <div class="space-y-7 text-center md:text-start">
            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
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
           <Feature/>
        </div>
</template>