<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { useNotificationAction } from '@/stores/notificationActionStore'
import { useAuth } from '@/stores/auth'
import NotificationItem from './NotificationItem.vue'
import { useNotificationDropdown } from '@/stores/notificationDropdown'
import { useNotificationList } from '@/stores/notificationListStore'

const menu = ref(null);

const notificationDropdownStore = useNotificationDropdown();
const notificationActionStore = useNotificationAction();

const auth = useAuth();

window.Echo.private(`App.Models.User.${auth.user?.id}`)
    .notification((notification) => {
      if (notification && typeof notification === 'object') { 
        notificationDropdownStore.getNotificationDrodDownData()
      }
    });

onMounted(() => {
  notificationDropdownStore.getNotificationDrodDownData()
})
const markRead = async (notification) => {
  const success = await notificationActionStore.markAsReadNotification(notification.id)
  if (success) {
      await notificationDropdownStore.getNotificationDrodDownData()
  }
}
const deleteNotification = async (notification) => {
  const success = await notificationActionStore.deleteNotification(notification.id)
  if (success) {
    await notificationDropdownStore.getNotificationDrodDownData()
  }
}
const markAllAsRead = async () => {
 const success = await notificationActionStore.markAllAsRead();
 if (success) {
   await notificationDropdownStore.getNotificationDrodDownData();
 }
}
</script>
<template>
      <!-- Trigger Button -->
    <Menu as="div" class="relative" ref="menu">
      <MenuButton class="p-1 rounded-full cursor-pointer hover:bg-gray-300 transition-colors text-gray-800">
        <Icon icon="lucide:bell" width="24" height="24" />
        <!-- Notification Badge -->
        <span  v-if="notificationDropdownStore.unreadNotificationsCount" class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {{ notificationDropdownStore.unreadNotificationsCount }}
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
            <button type="button" @click="markAllAsRead" class="text-sm cursor-pointer text-blue-600">Mark all as read</button>
          </div>

          <!-- Notification List -->
          <div class="max-h-96 overflow-y-auto px-3">
                <NotificationItem
                    v-for="notification in notificationDropdownStore.unreadNotifications"
                    :key="notification.id"
                    :type="notification.data?.type"
                    :data="notification.data"
                    :date="notification.created_at"
                    :redirectTo="notification.data?.link"
                    @read-notification="markRead(notification)"
                    @dismiss="deleteNotification(notification)"
                    size="compact"
                />
          </div>

          <!-- Footer -->
          <div class="p-3 text-center">
            <router-link :to="{name: 'notifications.index'}" class="text-sm text-blue-600">View all notifications</router-link>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>