<template>
    <div class="relative shrink-0 h-10 w-10 rounded-full flex items-center justify-center">
        <img v-if="avatar" :src="avatar" alt="User" class="h-9 w-9 rounded-full">
        <div
            v-else 
            class="bg-sky-500 text-white h-9 w-9 flex items-center justify-center rounded-full"
            :class="{
                'bg-purple-500': ['A','B','C','D'].includes(initial),
                'bg-blue-500': ['E','F','G','H'].includes(initial),
                'bg-yellow-500': ['I', 'L', 'M', 'N'].includes(initial),
                'bg-green-500': ['O', 'P', 'Q', 'R'].includes(initial),
                'bg-slate-500': ['S', 'T', 'W', 'X'].includes(initial),
                'bg-stone-500': ['Y', 'Z'].includes(initial)
            }"    
        >
            {{ getInitials(name) }}
        </div>
        <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
    </div>
</template>
<script setup>
import { getInitials } from '@/composables/useFormatters';
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
})
const initial = computed(() => props.name.charAt(0).toUpperCase());

</script>