<script setup>
defineProps({
    headerName: {
        type: String,
        required: true
    }
})
</script>
<template>
        <div>
            <h1 class="text-3xl font-bold text-gray-800">{{ headerName }}</h1>
           <slot></slot>
        </div>
</template>