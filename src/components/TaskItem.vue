<script setup>
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { computed } from 'vue';
import UserAvatar from './UserAvatar.vue';
import { getTaskCategoryByValue, getTaskPriorityByValue, getTaskStatusByValue } from '@/constants/task';
const props = defineProps({
    id: {
        type: [Number, String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    assignees: {
        type: Array,
        default: () => ([]),
    },
    deadline: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const daysLeft = ref('');
const categoryConfig = computed(() => props.category?.trim().length > 0 ? getTaskCategoryByValue(props.category) : '');
const statusConfig = computed(() => getTaskStatusByValue(props.status))
const priorityConfig = computed(() => getTaskPriorityByValue(props.priority))

const emit = defineEmits(['delete-task']);
const hoverMore = ref(false);
const topThreeAssignedUsers = computed(() => props.assignees.length > 0 ? props.assignees.slice(0, 3) : []);
const moreAssignees = computed(() => props.assignees.length > 3 ? props.assignees.slice(3, props.assignees.length) : [])
const onDeleteTask = (taskId) => {
    if (!taskId) {
        console.warn(`task id is required to emit task deletion. Received: ${taskId}`)
        return
    }
    emit('delete-task', taskId)
}
const updateCountdown = (deadline) => {
    if (!deadline) return;
    const now = new Date();
    const diff = new Date(deadline) - now;
    daysLeft.value = diff > 0 ? `${Math.ceil(diff / (1000 * 60 * 60 * 24))} days left` : 'Expired'; 
}
const formattedDeadline = computed(() => props.deadline ? new Date(props.deadline).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : 'Not set')
onMounted(() => {
    updateCountdown(props.deadline)
    const timer = setInterval(updateCountdown, 1000 * 60 * 60);
    onBeforeUnmount(() => clearInterval(timer))
})
</script>
<template>
    <tr class="hover:bg-gray-50">
        <td class="py-4 whitespace-nowrap ">
        <div class="flex items-center">
            <div 
                class="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center mr-3"
                :class="categoryConfig.badgeClass"
            >
              <Icon :icon="categoryConfig.icon" width="25" height="25" />
            </div>
            <div class="min-w-0 max-w-[200px]">
                <div class="font-medium text-gray-900 truncate">{{ title }}</div>
                <div class="text-sm text-gray-500 truncate ">{{ categoryConfig.label }}</div>
            </div>
        </div>
    </td>
        <td class="px-6 py-4 whitespace-nowrap">
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
                                absolute bottom-full left-0 mb-2
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
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ formattedDeadline }}</div>
            <div v-if="daysLeft" class="text-xs text-gray-500">{{ daysLeft }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span 
                class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                :class="statusConfig.badgeClass"
            >
                {{ statusConfig.label }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span 
                class="px-2 py-1 text-xs font-medium rounded-full capitalize"

                :class="[priorityConfig.badgeClass]"
            >
                {{ priorityConfig.label }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-2">
            
            <router-link :to="{name: 'tasks.show', params: {taskId: id}}" class="hover:bg-gray-200 rounded-sm duration-200 transition-all hover:scale-110 cursor-pointer p-2"><Icon icon="material-icon-theme:folder-vm-open" width="20" height="20" /></router-link>
            <router-link :to="{name: 'tasks.edit', params: {taskId: id}}" class="hover:bg-gray-200 rounded-sm duration-200 transition-all hover:scale-110 cursor-pointer p-2"><Icon icon="emojione:pencil" width="20" height="20" /></router-link>
            <button @click="onDeleteTask(id)" :disabled="loading" class="hover:bg-gray-200 rounded-sm duration-200 transition-all hover:scale-110 cursor-pointer p-2">
                <span v-if="loading"><Icon icon="eos-icons:loading" width="24" height="24" /></span>
                <span v-else><Icon icon="icon-park:delete" width="20" height="20" /></span>
            </button>
        </td>
    </tr>
</template>