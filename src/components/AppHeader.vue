 
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { RouterLink } from 'vue-router'
import UserDetailDropdown from './UserDetailDropdown.vue'
import { useNotifications } from '@/stores/notificationStore'
import { formatDateDistance } from '@/composables/useFormatters'
import { useAuth } from '@/stores/auth'

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

const notificationStore = useNotifications();
const auth = useAuth();
const hasNotifications = computed(() => notificationStore.notifications?.length > 0);
// Notification state
const isNotificationsOpen = ref(false)
const notificationButton = ref(null)
const unreadCount = ref(3)


const toggleNotifications = () => {
  if (!isNotificationsOpen.value) {
    notificationStore.fetchNotifications();
  }
  isNotificationsOpen.value = !isNotificationsOpen.value
}

const handleClickOutside = (event) => {
const notificationElement = notificationButton.value
if (notificationElement && !notificationElement.contains(event.target)) {
  isNotificationsOpen.value = false
}
}

const setNotificationRedirection = (entityId, entityType, otherEntity = {}) => {
  if (!entityId || !entityType) return '#';

  const redirectionMap = {
    task: () => ({ name: 'tasks.show', params: { projectId: otherEntity.id, taskId: entityId } }),
    project: () => ({ name: 'projects.show', params: { projectId: entityId } }),
  };
  return redirectionMap[entityType]?.() || '#';
};
const authId = auth.user?.id;
console.log(authId)
 window.Echo.private(`App.Models.User.${authId}`)
          .notification((notification) => {
            console.log(notification)
          });
window.Echo.channel('test-channel')
    .listen('TestBroadcast', (e) => {
        console.log("Received TestBroadcast event!", e);
    });
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  notificationStore.setupEcho()
  
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
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
              <a v-if="notificationStore.isFetchLoading" disabled class="text-center flex items-center justify-center p-2">
                  <IconSpinner name="white-spinner"/>
              </a>
              <a
                  v-else-if="notificationStore.isFetchError"
                  href="#"
                  disabled
                  class="block py-2 text-sm text-center text-gray-200 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Failed to load notification
                </a>
              <template v-else-if="hasNotifications">
                <RouterLink
                  v-for="notification in notificationStore.notifications"
                  :key="notification.id"
                  :to="setNotificationRedirection(
                    notification.data?.main_entity?.entity_id, 
                    notification.data?.main_entity?.entity_type, 
                    { id: notification.data?.related_entity?.entity_id }
                  )"
                  class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div class="w-full">
                    <p class="text-sm text-gray-900 dark:text-white">{{ notification.data?.message }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDateDistance(notification.created_at) }}</p>
                  </div>
                </RouterLink>
                <a
                  href="#"
                  class="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  View all notifications
                </a>
              </template>
                <a
                  v-else
                  href="#"
                  disabled
                  class="block py-2 text-sm text-center text-gray-200 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  No notification found
                </a>
            </div>
          </div>
        </div>
        <!-- User Dropdown -->
        <UserDetailDropdown/>
      </div>
    </div>
  </template>