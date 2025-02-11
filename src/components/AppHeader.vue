<template>
    <div class="flex items-center justify-between">
      <!-- Left side with logo -->
      <div class="flex items-center justify-start rtl:justify-end">
        <button 
          @click="onSideBarToggle" 
          data-drawer-target="logo-sidebar" 
          data-drawer-toggle="logo-sidebar" 
          aria-controls="logo-sidebar" 
          type="button" 
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open sidebar</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        <RouterLink :to="{name: 'organization.dashboard'}" class="flex items-center justify-center ms-2 md:me-24">
          <img :src="logo" class="h-7 w-8 me-2" alt="FlowBite Logo" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SprintSync</span>
        </RouterLink>
      </div>
  
      <!-- Right side with notifications and user dropdown -->
      <div class="flex items-center">
        <!-- Notification Dropdown -->
        <div class="relative me-3">
          <button
            type="button"
            class="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            @click="toggleNotifications"
            ref="notificationButton"
          >
            <span class="sr-only">View notifications</span>
            <!-- Notification Badge -->
            <div v-if="unreadCount" class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
              {{ unreadCount }}
            </div>
            <!-- Bell Icon -->
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
            </svg>
          </button>
  
          <!-- Notifications Dropdown -->
          <div
            v-show="isNotificationsOpen"
            class="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-700"
          >
            <div class="block px-4 py-2 font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
              Notifications
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-600">
              <a
                v-for="notification in notifications"
                :key="notification.id"
                href="#"
                class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="w-full">
                  <p class="text-sm text-gray-900 dark:text-white">{{ notification.message }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</p>
                </div>
              </a>
            </div>
            <a
              href="#"
              class="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              View all notifications
            </a>
          </div>
        </div>
  
        <!-- User Dropdown -->
        <UserDropdown />
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import UserDropdown from './userDropdown.vue'

const props = defineProps({
logo: {
    type: String,
    required: true
},
onSideBarToggle: {
    type: Function,
    required: true
}
})

// Notification state
const isNotificationsOpen = ref(false)
const notificationButton = ref(null)
const unreadCount = ref(3)

// Sample notifications data
const notifications = ref([
{
    id: 1,
    message: 'New sprint "Q1 Planning" has been created',
    time: '10 minutes ago'
},
{
    id: 2,
    message: 'John Doe commented on your task',
    time: '1 hour ago'
},
{
    id: 3,
    message: 'Sprint review meeting in 30 minutes',
    time: '2 hours ago'
}
])

const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
}

const handleClickOutside = (event) => {
const notificationElement = notificationButton.value
if (notificationElement && !notificationElement.contains(event.target)) {
    isNotificationsOpen.value = false
}
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
  </script>