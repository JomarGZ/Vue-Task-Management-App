<script setup>
defineProps({
  pagination: Object,
  onPageChange: Function
})
</script>
<template>
  <div class="p-4 flex justify-between items-center">
    <div class="text-gray-600">
      Showing {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }} entries
    </div>
    <div class="flex space-x-2">
      <button
        v-for="(page, index) in pagination.links"
        :key="index"
        @click="onPageChange(page.url)"
        v-html="page.label"
        :disabled="! page.url"
        :class="{ 
          'px-4 py-2 border rounded-md': true,
          'bg-blue-100': page.active,
          'hover:bg-blue-100': page.url
        }"
      ></button>
    </div>
  </div>
</template>
