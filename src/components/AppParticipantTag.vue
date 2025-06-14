<script setup>
import SimpleAvatar from './SimpleAvatar.vue';

defineProps({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
})
defineEmits(['remove-selected-user-tag'])
</script>
<template>
     <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <SimpleAvatar :name="name" :avatar="avatar" size="xs"/>
        <p class="capitalize">{{ name }}</p>
        <button @click="$emit('remove-selected-user-tag')" type="button"  class="ml-1.5 inline-flex text-blue-500 cursor-pointer hover:text-blue-700">
            &times;
        </button>
    </span>
</template>