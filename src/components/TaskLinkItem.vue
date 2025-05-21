<script setup>
import { getTaskLinkTypeValue } from '@/constants/task';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
    id: {
        type: [Number, String],
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})
defineEmits(['delete-item', 'edit-item']);
const UrlType = computed(() => props.type ? getTaskLinkTypeValue(props.type) : null);
</script>
<template>
    <div class="flex items-center justify-between group p-3 hover:bg-gray-100 rounded-lg">
        <div class="flex items-center">
            <div 
                class="p-2 rounded-lg mr-3"
                :class="UrlType.badgeClass"
            >
                <Icon :icon="UrlType.icon" width="24" height="24" />
            </div>
            <div>
                <a :href="url" target="_blank" class="text-blue-600 hover:underline font-medium">{{ title }}</a>
                <p class="text-xs text-gray-500">{{ UrlType.label }}</p>
            </div>
        </div>
        <div class="flex gap-2 items-center justify-center">
             <button @click.stop="$emit('edit-item')" type="button" :disabled="loading" class="text-gray-400 cursor-pointer hover:text-blue-500 opacity-0 group-hover:opacity-100 transition">
               <Icon icon="mdi:link-edit" width="24" height="24" />
            </button>
             <button @click.stop="$emit('delete-item', id)" :disabled="loading" type="button" class="text-gray-400 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                <Icon icon="material-symbols:close-rounded" width="24" height="24" />
            </button>
        </div>
       
    </div>
</template>