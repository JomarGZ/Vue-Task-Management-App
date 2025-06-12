<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps({
    name: {
        type: String,
        required: true
    }
})
defineEmits(['onSelectChannel'])
</script>

<template>
     <li>
        <button type="button" @click="$emit('onSelectChannel')" class="flex items-center p-3 rounded-lg bg-primary-50 hover:bg-sky-100 text-primary-600">
            <Icon icon="token-branded:chat" width="24" height="24" />
            <span class="hidden md:block ml-3 font-medium capitalize">{{ name }}</span>
        </button>
    </li>
</template>