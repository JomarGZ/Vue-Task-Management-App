<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import UserAvatar from './UserAvatar.vue';
const props = defineProps({
    assignees: {
        type: Array,
        default: () => ([])
    }
})
const hoverMore = ref(false);
const topThreeAssignedUsers = computed(() => props.assignees.length > 0 ? props.assignees.slice(0, 3) : []);
const moreAssignees = computed(() => props.assignees.length > 3 ? props.assignees.slice(3, props.assignees.length) : [])
</script>
<template>
     <div class="flex items-center justify-start -space-x-6 rlt:space-x-reverse">
        <template v-if="topThreeAssignedUsers.length > 0">
            <div  
                class="group relative" 
                v-for="assignee in topThreeAssignedUsers"
                :key="assignee.id" 
            >
                <user-avatar 
                    :name="assignee.name" 
                    :avatar="assignee.avatar?.['thumb-60']"
                />
                <div 
                    class="absolute bottom-full left-1/2 -translate-x-1/2 transition duration-200  whitespace-nowrap text-xs px-2 py-1 mb-2 font-medium rounded capitalize bg-gray-800 text-white group-hover:block opacity-0 group-hover:opacity-100"
                >
                    {{ assignee.name }}
                </div>
            </div>
            <p 
                v-if="moreAssignees.length > 0"
                class="
                    flex relative hover:border-blue-300 
                    transition-all duration-200 hover:scale-110 
                    cursor-pointer items-center z-40 justify-center
                    w-8 h-8 text-xs p-4 font-medium text-white 
                    bg-slate-300 border-2 border-white rounded-full
                " 
                @mouseenter="hoverMore = true"
                @mouseleave="hoverMore = false"
            >
            {{ moreAssignees.length }}+
            <div 
                v-if="hoverMore"
                class="
                    absolute bottom-full left-0 mb-2 z-40
                    p-2 min-w-[120px] max-h-[200px] overflow-y-auto
                    bg-white dark:bg-gray-800 rounded-lg shadow-xl
                    border border-gray-200 dark:border-gray-700
                    transition-opacity duration-200
                "
            >
                <div 
                    v-for="user in moreAssignees" 
                    :key="user.id"
                    class="py-1 px-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    {{ user.name }}
                </div>
            </div>
        </p>
        </template>
        <p v-else class="text-xs text-gray-500">No assignee</p>
    </div>
</template>