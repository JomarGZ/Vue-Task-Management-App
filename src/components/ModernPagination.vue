<template>
     <div class="mt-6 flex justify-center">
        <nav class="inline-flex space-x-2">
        <a
            href="#"
            class="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-600 hover:bg-blue-200"
        >
            1
        </a>
        <a
            href="#"
            class="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
            2
        </a>
        <a
            href="#"
            class="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
            3
        </a>
        <span class="px-3 py-1 text-sm text-gray-500">...</span>
        <a
            href="#"
            class="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
            10
        </a>
        </nav>
    </div>
</template>
<script setup>
const props = defineProps(['paignation']);
</script>