<script setup>
import Logo from '@/assets/images/logo.png'
import { Icon } from '@iconify/vue';
const navLinks = [
    {
        name: 'Dashboard',
        to: {name: 'organization.dashboard'},
        icon: 'hugeicons:dashboard-square-01'
    },
    {
        name: 'Projects',
        to: {name: 'projects.index'},
        icon: 'ix:project'
    },
    {
        name: 'Members',
        to: {name: 'members.index'},
        icon: 'tdesign:member'
    },
    {
        name: 'Chats',
        to: {name: 'chats.index'},
        icon: 'uiw:message'
    },
]
</script>
<template>
    <div class="bg-gray-50 row-span-2 px-2 flex flex-col items-center py-4 space-y-6 mt-16">
        <div v-for="link in navLinks" :key="link.name" class="relative group">
                <router-link 
                    :to="link.to"
                    active-class="bg-blue-600 text-white"
                    class="p-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex"
                >
                    <Icon 
                    :icon="link.icon" 
                    width="20" 
                    height="20" 
                    :class="{
                        'text-gray-100': $route.name === link.to.name,
                        'text-gray-600 group-hover:text-gray-100': $route.name !== link.to.name
                    }"
                    />
                </router-link>
      
            <div 
                v-if="$route.name !== link.to.name"
                class="absolute left-full transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 top-1/2 ml-2 px-2 py-1 bg-gray-100 text-gray-900 text-xs rounded shadow-md opacity-0 group-hover:opacity-100"
            >
                {{ link.name }}
            </div>
        </div>
    </div>
</template>