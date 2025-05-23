<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import { computed, onMounted } from 'vue'
import { useNotifications } from '@/stores/notificationStore'
import {formatDateDistance} from '@/composables/useFormatters'
import { useAuth } from '@/stores/auth'
const notificationStore = useNotifications()
const auth = useAuth();
window.Echo.private(`App.Models.User.${auth.user?.id}`)
    .notification((notification) => {
      if (notification && typeof notification === 'object') {
        notificationStore.getNotifications()
      }
    });
const unreadNotificationCount = computed(() => notificationStore.notifications.filter(notification => !notification.read_at));

onMounted(() => {
  notificationStore.getNotifications()
})
</script>
<template>
      <!-- Trigger Button -->
    <Menu as="div" class="relative">
      <MenuButton class="p-1 rounded-full cursor-pointer hover:bg-gray-300 transition-colors text-gray-800">
        <Icon icon="lucide:bell" width="24" height="24" />
        <!-- Notification Badge -->
        <span  v-if="unreadNotificationCount.length > 0" class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {{ unreadNotificationCount.length }}
        </span>
      </MenuButton>

      <!-- Dropdown Panel -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="absolute right-0 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <!-- Header -->
          <div class="p-3 bg-gray-50 flex justify-between items-center">
            <h3 class="font-medium">Notifications</h3>
            <button class="text-sm text-blue-600">Mark all as read</button>
          </div>

          <!-- Notification List -->
          <div class="max-h-96 overflow-y-auto px-3">
            <router-link 
              :to="item.data.link" 
              v-for="item in notificationStore.notifications" 
              :key="item.id" 
              class="p-3 block hover:bg-gray-200"
              @click.prevent="notificationStore.markAsReadNotification(item.id)"
              :class="{
                'bg-gray-100': !item.read_at,
                'bg-white': item.read_at,
              }"
            >
              <div class="flex items-center justify-start">
                  <div>
                    <div class="rounded-full h-10 w-10 bg-blue-50 flex items-center justify-center mr-3">
                      <Icon icon="lucide:message-circle" width="24" height="24" class="text-blue-600" />
                    </div>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1 mb-1" v-if="item.data?.assigner?.name">
                      <span class="text-xs font-medium text-gray-900 capitalize">
                          {{ item.data?.assigner?.name }}
                      </span>
                      <span class="text-xs text-gray-500">assigned you a task</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">{{ item.data?.message }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDateDistance(item.created_at) }}</p>
                  </div>
              </div>
            </router-link>
          </div>

          <!-- Footer -->
          <div class="p-3 text-center">
            <a href="#" class="text-sm text-blue-600">View all notifications</a>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>