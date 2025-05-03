
<script setup>
import NotificationDropdown from '@/components/NotificationDropdown.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
</script>
<template>
    <div class="relative space-x-5 px-16 col-span-2 bg-gray-50 p-4 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800">SprintSync</h2>
      <div class="">
        <NotificationDropdown class="mr-10" />
        <ProfileDropdown />
      </div>
    </div>
</template>