<template>
    <div class="mt-6 flex justify-center">
      <nav class="inline-flex space-x-2">
        <!-- Pagination buttons -->
        <a
          v-for="page in pages"
          :key="page"
          href="#"
          class="rounded-md px-3 py-1 text-sm"
          :class="{
            'bg-blue-100 text-blue-600 hover:bg-blue-200': page === pagination.current_page,
            'text-gray-500 hover:bg-gray-100': page !== pagination.current_page,
          }"
          @click.prevent="handlePageChange(page)"
        >
          {{ page }}
        </a>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { inject, computed } from 'vue';
  
  // Inject pagination and handler from the top-level component
  const pagination = inject('pagination');
  const handlePageChange = inject('handlePageChange');
  
  // Generate pages array (same as before)
  const pages = computed(() => {
    const { current_page, last_page } = pagination;
    const range = 2;
    const pages = [];
  
    if (current_page > range + 1) {
      pages.push(1);
      if (current_page > range + 2) {
        pages.push('...');
      }
    }
  
    for (let i = Math.max(1, current_page - range); i <= Math.min(last_page, current_page + range); i++) {
      pages.push(i);
    }
  
    if (current_page < last_page - range) {
      if (current_page < last_page - range - 1) {
        pages.push('...');
      }
      pages.push(last_page);
    }
  
    return pages;
  });
  </script>