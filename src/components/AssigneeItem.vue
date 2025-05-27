<template>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-300 relative">
        <div class="flex items-center mb-3 min-w-0">
            <img v-if="avatar" :src="avatar" alt="User" class="w-10 h-10 shadow-md rounded-full mr-3 shrink-0">
            <DefaultUserPic v-else :name="name" class="w-10 h-10 mr-3" />
            <div class="overflow-hidden flex-1 min-w-0">
                <div class="font-medium capitalize truncate">{{ name }}</div>
                <div class="text-sm text-gray-500 capitalize truncate">{{ position }}</div>
            </div>
        </div>
        <div class="flex justify-between text-sm min-w-0">
            <span class="text-gray-600 capitalize truncate">{{ team }}</span>
            <span class="text-blue-600 shrink-0">{{ tasks_count }} tasks</span>
        </div>
        <button @click="$emit('remove-member', id)" :disabled="projectTeamStore.loading" class="transition-all duration-300 ease-in-out transform hover:scale-110 absolute right-5 cursor-pointer hover:bg-gray-300 p-2 rounded-full flex items-center justify-center top-8 text-gray-500">
            <Icon v-if="projectTeamStore.loading" icon="eos-icons:loading" width="20" height="20" />
            <Icon v-else icon="icon-park-outline:people-delete-one" width="20" height="20" />
        </button>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import DefaultUserPic from './DefaultUserPic.vue';
import { Icon } from '@iconify/vue';
import { useProjectTeamStore } from '@/stores/projectTeamStore';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    },
    team: {
        type: String,
        default: ''
    },
    tasks_count: {
        type: [Number, String],
        default: 0
    }
})
const projectTeamStore = useProjectTeamStore();
defineEmits(['remove-member']);
</script>