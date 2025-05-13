<script setup>
import DefaultUserPic from './DefaultUserPic.vue';
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
</script>

<template>
    <div class="flex items-center min-w-0 max-w-[200px] cursor-default">
        <img v-if="avatar" class="h-8 w-8 rounded-full mr-2 border-blue-300 border-2" :src="avatar" :alt="name">
        <DefaultUserPic v-else :name="name" class="w-8 h-8 mr-2"/>
    </div>
</template>