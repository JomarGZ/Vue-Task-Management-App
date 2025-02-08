<script setup>
import NavLink from '@/components/NavLink.vue';
import { useAuth } from '@/stores/auth';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
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

const onSideBarToggle = () => {
    const sidebar = document.getElementById('logo-sidebar');
    sidebar.classList.toggle('-translate-x-full');
    sidebar.classList.toggle('translate-x-0');
}
watch(route, () => {
    onSideBarToggle();
});
</script>
<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
            <button @click="onSideBarToggle" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <a href="https://flowbite.com" class="flex ms-2 md:me-24">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SprintSync</span>
            </a>
        </div>
        <div class="flex items-center">
            <div class="flex items-center ms-3">
                <div>
                    <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
                    </button>
                    </div>
                    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                    <div class="px-4 py-3" role="none">
                        <p class="text-sm text-gray-900 dark:text-white" role="none">
                        Neil Sims
                        </p>
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        neil.sims@flowbite.com
                        </p>
                    </div>
                    <ul class="py-1" role="none">
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                        </li>
                        <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
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
