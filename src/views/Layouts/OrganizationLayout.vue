<script setup>
import NavLink from '@/components/NavLink.vue';
import { useAuth } from '@/stores/auth';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import  logo  from '@/assets/images/logo.png';
import AppHeader from '@/components/AppHeader.vue';
const route = useRoute();
const auth = useAuth();

const router = [
    {
        name: 'Dashboard',
        link: {name: 'organization.dashboard'},
        icon: 'graph'
    },
    {
        name: 'Projects',
        link: {name: 'projects.index'},
        icon: 'square'
    },
    {
        name: 'Tasks',
        link: {name: 'tasks.index'},
        icon: 'pile'
    },
    {
        name: 'Members',
        link: {name: 'members.index'},
        icon: 'persons'
    },
    {
        name: 'Teams',
        link: {name: 'teams.index'},
        icon: 'list'
    },
    {
        name: 'Account',
        link: {name: 'account.index'},
        icon: 'person'
    },
];

const handleSidebarToggle = () => {
    const sidebar = document.getElementById('logo-sidebar');
    sidebar.classList.toggle('-translate-x-full');
    sidebar.classList.toggle('translate-x-0');
}
watch(route, () => {
    handleSidebarToggle();
});
</script>
<template>
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <AppHeader
                :logo="logo"
                :onSideBarToggle="handleSidebarToggle" 
            />
        </div>
    </nav>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
               <li
                    :key="r"
                    v-for="r in router"
                >
                   <NavLink
                      :routeLink="r.link"
                      :icon="r.icon">
                        {{ r.name }}
                    </NavLink>
                </li>
                <li>
                    <button @click="auth.logout()" 
                    class="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                     
                        <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 3 17 20">                         
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />                     
                        </svg>                     
                        <span class="ms-3 whitespace-nowrap">Logout</span>                     
                    </button>
                </li>
              
            </ul>
        </div>
    </aside>
    <main class="bg-gray-100">
        <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg mt-14">
                <RouterView />
            </div>
        </div>
    </main>
    <footer class="bg-white py-6 border-t">
        <div class="container mx-auto text-center text-gray-600">
            © 2025 SprintSync. All rights reserved.
        </div>
    </footer>
</template>
