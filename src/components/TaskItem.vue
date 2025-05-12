<script setup>
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { computed } from 'vue';
import UserAvatar from './UserAvatar.vue';
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
        type: Object,
        default: () => {}
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

const emit = defineEmits(['delete-task']);
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
            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-tasks text-blue-600"></i>
            </div>
            <div class="min-w-0 max-w-[200px]">
                <div class="font-medium text-gray-900 truncate">{{ title }}</div>
                <div v-if="category?.name" class="text-sm text-gray-500 truncate ">{{ category?.name }}</div>
            </div>
        </div>
    </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex -space-x-4 rlt:space-x-reverse">
                 <template v-if="assignees.length > 0">
                    <user-avatar 
                        v-for="assignee in assignees"
                        :key="assignee.id" 
                        :name="assignee.name" 
                        :avatar="assignee.avatar?.['thumb-60']"
                    />
                    <p class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-slate-300 border-2 border-white rounded-full" href="#">+99</p>
                 </template>
                 <p v-else class="text-xs text-gray-500">No assignee</p>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ formattedDeadline }}</div>
            <div v-if="daysLeft" class="text-xs text-gray-500">{{ daysLeft }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">{{ status }}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 capitalize">{{ priority }}</span>
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