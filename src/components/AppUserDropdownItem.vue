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
defineEmits(['on-select'])
</script>
<template>
    <div class="p-3 hover:bg-gray-50 ">
        <button type="button" @click="$emit('on-select')" class="flex items-center gap-3 cursor-pointer">
            <SimpleAvatar :name="name" :avatar="avatar"/>
            <span class="capitalize">{{ name }}</span>
        </button>
    </div>
</template>