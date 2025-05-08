<script setup>
defineProps({
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
</script>
<template>
    <tr class="hover:bg-gray-50">
        <td class="py-4 whitespace-nowrap ">
        <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-tasks text-blue-600"></i>
            </div>
            <div class="min-w-0 max-w-[200px]">
                <div class="font-medium text-gray-900 truncate">{{ title }}sssssssssssssssssssssssssssssssssss</div>
                <div class="text-sm text-gray-500 truncate">{{ category.name }}</div>
            </div>
        </div>
    </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center min-w-0 max-w-[200px]">
                <img class="h-8 w-8 rounded-full mr-2" src="https://randomuser.me/api/portraits/women/68.jpg" alt="">
                <span class="truncate">{{ assignee.name }}</span>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ deadline }}</div>
            <div class="text-xs text-gray-500">3 days left</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{{ status }}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">{{ priority }}</span>
        </td>
    </tr>
</template>