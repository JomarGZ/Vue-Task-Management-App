<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Object,
        default: () => {}
    },
    assignee: {
        type: Object,
        default: () => {},
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
    }
})
const formattedDeadline = computed(() => props.deadline ? new Date(props.deadline).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : 'Not set')
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
            <!-- <div class="flex items-center min-w-0 max-w-[200px]">
                <user-avatar :name="assignee.name" :avatar="assignee.avatar?.['thumb-60']"/>
                <span class="truncate capitalize">{{ assignee.name }}</span>
            </div> -->
            <div class="flex -space-x-4 rtl:space-x-reverse">
                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://i.pravatar.cc/60" alt="" title="John Doe">
                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://i.pravatar.cc/60" alt="">
                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://i.pravatar.cc/60" alt="">
                <p class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-slate-300 border-2 border-white rounded-full" href="#">+99</p>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ formattedDeadline }}</div>
            <div class="text-xs text-gray-500">3 days left</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">{{ status }}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 capitalize">{{ priority }}</span>
        </td>
    </tr>
</template>