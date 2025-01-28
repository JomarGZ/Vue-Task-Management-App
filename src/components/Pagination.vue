<script setup>
defineProps({
  pagination: Object,
  onPageChange: Function,
  size: {
    type: String,
    default: 'md', // Options: 'sm', 'md', 'lg'
  },
});

const sizeClasses = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
};
</script>

<template>
  <div class="p-4 flex justify-between items-center">
    <div :class="`text-gray-600 ${sizeClasses[size]}`">
      Showing {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }} entries
    </div>
    <div class="flex space-x-2">
      <button
        v-for="(page, index) in pagination.links"
        :key="index"
        @click="onPageChange(page.url)"
        v-html="page.label"
        :disabled="!page.url"
        :class="[
          'border rounded-md',
          sizeClasses[size],
          { 
            'bg-blue-100': page.active,
            'hover:bg-blue-100': page.url,
          }
        ]"
      ></button>
    </div>
  </div>
</template>
