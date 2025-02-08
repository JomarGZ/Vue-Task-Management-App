<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineProps(['routeLink', 'name', 'active', 'icon']);
const route = useRoute();

const currentRoute = computed(() => route.name); 

</script>
<template>
    <RouterLink
      :to="routeLink"
      :class="[
        'flex items-center p-2  rounded-lg text-white group',
        currentRoute === routeLink?.name ? 'dark:bg-gray-700' : 'dark:hover:bg-gray-700'
      ]">
        <IconSVG :name="`${icon}-svg`"/>
        <span class="ms-3"><slot></slot></span>
    </RouterLink>
</template>