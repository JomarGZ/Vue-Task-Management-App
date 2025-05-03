<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import DefaultUserPic from '@/components/DefaultUserPic.vue'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
</script>
<template>
    <div class="fixed top-3 right-10">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton class="flex items-center focus:outline-none">
            <div class="relative">
              <img 
                v-if="auth.avatar?.['thumb-60']"
                :src="auth.avatar?.['thumb-60']" 
                class="h-10 w-10 rounded-full border-2 border-white ring-2 ring-blue-500"
                alt="User profile"
              >
              <DefaultUserPic v-else-if="auth.userName" class="w-8 h-8 border-2" :name="auth.userName"/>
              <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
          </MenuButton>
        </div>
  
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
          >
            <div class="px-4 py-3">
              <p class="text-sm font-medium text-gray-900 capitalize truncate">{{ auth.user?.name }}</p>
              <p class="text-sm text-gray-500 truncate">{{ auth.user?.email }}</p>
            </div>
  
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <router-link
                    active-class="bg-blue-50 text-blue-900"
                    exact-active-class="bg-blue-50 text-blue-900"
                  :to="{ name: 'account.index' }"
                  :class="[
                    active ? 'bg-blue-50 text-blue-900' : 'text-gray-700',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                <Icon icon="mdi:account-tie" width="24" height="24" class="mr-2"/>
                  Your Profile
                </router-link>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                    @click="auth.logout()"
                    :class="[
                        active ? 'bg-blue-50 text-blue-900' : 'text-gray-700',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                >
                <Icon icon="ic:baseline-logout" width="24" height="24" class="mr-2"/>
                  Sign out
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </template>