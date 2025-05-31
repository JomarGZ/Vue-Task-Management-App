<script setup>
import { computed, ref } from 'vue';
import ReadMore from './ReadMore.vue';
import UserAvatar from './UserAvatar.vue';
import { formatDateDistance } from '@/composables/useFormatters';
import { Icon } from '@iconify/vue';
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
    position: {
        type: String,
        default: ''
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

defineEmits(['menu-toggle', 'edit-comment', 'delete-comment']);

const timeCreated = computed(() => props.created_at?.trim().length > 0 ? formatDateDistance(props.created_at) : '');
const prepareCommentData = () => ({
    id: props.id,
    content: props.content,
    author_name: props.author_name,
    avatar: props.avatar,
    created_at: props.created_at
});
</script>
<template>
    <div class="relative">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
        <div class="flex items-center mb-1 min-w-0">
            <user-avatar :name="author_name" :avatar="avatar"/>
            <div class="font-medium text-sm truncate flex flex-col">
                <span>{{ author_name }}</span>
                <span class="text-xs text-gray-500 font-light capitalize">{{ position }}</span>
            </div>
            <span class="text-xs text-gray-500 ml-2 shrink-0 self-end">{{ timeCreated }}</span>
            
            <!-- Three-dot menu -->
            <div class="ml-auto relative shrink-0">
                <button 
                    @click.stop="$emit('menu-toggle', id)"
                    class="p-1 cursor-pointer rounded-full hover:bg-gray-200 focus:outline-none"
                >
                   <Icon icon="ph:dots-three" width="20" height="20" />
                </button>
                
                <!-- Dropdown menu -->
                <div 
                    v-if="isMenuOpen"
                    class="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                    <button 
                        @click.stop="$emit('edit-comment', prepareCommentData())"
                        type="button"
                        class="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button 
                        type="button"
                        @click.stop="$emit('delete-comment', prepareCommentData())"
                        class="block w-full text-left cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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