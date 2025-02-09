<script setup>
import { computed } from 'vue';

const props = defineProps({
    pagination: Object,
    onChangePage: Function
});
const links = computed(() => {
  return Array.isArray(props.pagination?.links)
    ? props.pagination.links.filter(p => p.label.includes('Previous') || p.label.includes('Next'))
    : [];
});
</script>
<template>
     <div class="mt-6 flex items-center justify-between">
        <div class="text-sm text-gray-600">
            Showing {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }} entries
        </div>
        <div class="flex items-center space-x-2">
         <button
                v-for="(page, index) in links"
                @click="onChangePage(page.url)"
                :key="index"
                :disabled="! page.url"
                :class="[
                    'px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700',
                    page.url ? 'hover:bg-gray-50' : ''
                ]">
                <IconSVG v-if="page.label.includes('Previous')" class="w-5 h-5" name="arrow-left-svg" />
                <IconSVG v-if="page.label.includes('Next')" class="w-5 h-5" name="arrow-right-svg" />
        </button>
        </div>
    </div>
</template>