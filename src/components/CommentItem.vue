<script setup>
import { computed, ref } from 'vue';
import ReadMore from './ReadMore.vue';
import UserAvatar from './UserAvatar.vue';
import { formatDateDistance } from '@/composables/useFormatters';
const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    created_at: {
        type: String,
        required: true
    },
    isMenuOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['menu-toggle']);

const timeCreated = computed(() => props.created_at?.trim().length > 0 ? formatDateDistance(props.created_at) : '');

</script>
<template>
    <div class="relative">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
        <div class="flex items-center mb-1 min-w-0">
            <user-avatar :name="author_name" :avatar="avatar"/>
            <span class="font-medium text-sm truncate">{{ author_name }}</span>
            <span class="text-xs text-gray-500 ml-2 shrink-0">{{ timeCreated }}</span>
            
            <!-- Three-dot menu -->
            <div class="ml-auto relative shrink-0">
                <button 
                    @click.stop="$emit('menu-toggle', id)"
                    class="p-1 cursor-pointer rounded-full hover:bg-gray-200 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01" />
                    </svg>
                </button>
                
                <!-- Dropdown menu -->
                <div 
                    v-if="isMenuOpen"
                    class="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                    <button 
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button 
                        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 p-3 rounded-lg text-sm text-gray-600 ml-8">
            <ReadMore max-height="120px">
                <p>{{ content }}</p>
            </ReadMore> 
        </div>
    </div>
</template>