<template>
      <div class="bg-blue-50 p-4 rounded-lg">
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
            <span class="text-blue-600 shrink-0">{{ taskCount }} tasks</span>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import DefaultUserPic from './DefaultUserPic.vue';

const props = defineProps({
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
    tasks: {
        type: Array,
        default: () => ([])
    }
})

const taskCount = computed(() => props.tasks?.length ?? 0);
</script>