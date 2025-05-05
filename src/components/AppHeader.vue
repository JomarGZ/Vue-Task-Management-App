
<script setup>
import NotificationDropdown from '@/components/NotificationDropdown.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import Logo from '@/assets/images/logo.png'
</script>
<template>
    <div class="relative space-x-5 px-16 bg-gray-50 py-2 flex items-center justify-between">
        <router-link :to="{name: 'organization.dashboard'}" class="flex items-center gap-2 justify-center">
            <img :src="Logo" class="h-7 w-8" alt="Logo"  />
            <h2 class="text-xl font-bold text-gray-800">SprintSync</h2>
        </router-link>
      <div class="flex items-center justify-center">
        <NotificationDropdown class="mr-10" />
        <ProfileDropdown />
      </div>
    </div>
</template>