<script setup>
import { getInitials } from '@/composables/useFormatters';
const props = defineProps({
    name:{
        type: String,
        required: true
    }
})
</script>
<template>
    <span 
        class=" rounded-full border-white shadow-lg bg-blue-300 text-blue-600 flex items-center justify-center font-bold"
        >
        {{ getInitials(name) }}
    </span>
</template>