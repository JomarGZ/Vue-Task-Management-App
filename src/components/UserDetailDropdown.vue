<template>
    <div class="flex items-center">
      <div class="flex items-center ms-3 relative">
        <div>
          <button
            type="button"
            class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            @click="toggleDropdown"
            ref="dropdownButton"
          >
            <span class="sr-only">Open user menu</span>
            <img
              v-if="false"
              class="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            >
            <DefaultUserPic v-else class="w-8 h-8 border-2" :name="auth.userName"/>
          </button>
        </div>
        
        <div
          class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          :class="{ 'hidden': !isOpen }"
          style="position: absolute; right: 0; top: 100%;"
        >
          <div class="px-4 py-3" role="none">
            <p class="text-sm text-gray-900 dark:text-white" role="none">
              {{ auth.userName }}
            </p>
            <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
              {{ auth.userEmail }}
            </p>
          </div>
          <ul class="py-1" role="none">
            <li>
              <RouterLink
                :to="{name: 'organization.dashboard'}"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >Dashboard</RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{name: 'account.index'}"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >Account</RouterLink>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="auth.logout()"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getInitials } from '@/composables/useFormatters';
import { useAuth } from '@/stores/auth'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DefaultUserPic from './DefaultUserPic.vue';
  
  const isOpen = ref(false)
  const dropdownButton = ref(null)
  
  const auth = useAuth();
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const handleClickOutside = (event) => {
    const dropdownElement = dropdownButton.value
    if (dropdownElement && !dropdownElement.contains(event.target)) {
      isOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>