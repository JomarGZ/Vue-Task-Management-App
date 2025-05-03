<script setup>
import { Icon } from '@iconify/vue';
defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    count: {
        type: Number,
        default: 0
    },
    icon: {
        type: String,
        default: 'tdesign:file-icon'
    }
})
</script>
<template>
     <div class="bg-gray-50 rounded-xl shadow-sm p-4 text-gray-900">
        <div class="flex items-center justify-between px-2 py-4">
            <div class="flex items-center justify-start gap-2">
                <div class="bg-gray-100 rounded-full p-2 flex items-center justify-center">
                    <Icon :icon="icon" width="20" height="20" />
                </div>
                <h2>{{ title }}</h2>
            </div>
            <div class="text-2xl font-bold">{{ count }}</div>
        </div>
        <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
        <div class="flex justify-between items-center">
            <div class="">
                <svg viewBox="0 0 200 60" class="w-full">
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#818cf8" stop-opacity="0.4" />
                            <stop offset="100%" stop-color="#818cf8" stop-opacity="0.01" />
                        </linearGradient>
                    </defs>
                    <path d="M0,50 Q25,40 50,45 T100,30 T150,25 T200,10 V60 H0 Z" fill="url(#gradient1)" stroke="none"></path>
                    <path d="M0,50 Q25,40 50,45 T100,30 T150,25 T200,10" fill="none" stroke="#818cf8" stroke-width="2"></path>
                </svg>
            </div>
            <div class="ml-3 text-sm">
                <p class="text-gray-500"><span class="text-green-400 font-semibold">10+</span> More from last week</p>
            </div>
        </div>
    </div>
</template>