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
    // {
    //     name: 'Teams',
    //     link: {name: 'teams.index'},
    //     icon: 'list'
    // },
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
            </ul>
        </div>
    </aside>
    <div class="sm:ml-64">
        <main class="bg-gray-100">
            <div class="p-4">
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
    </div>
</template>
