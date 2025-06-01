<script setup>
import { Icon } from '@iconify/vue';
import AvatarGroup from './AvatarGroup.vue';
import { computed } from 'vue';
import { getProjectStatusByValue, getProjectPriorityByValue } from '@/constants/project';
import { useAuth } from '@/stores/auth';
const props = defineProps({
    name: String,
    client_name: String,
    status: String,
    priority: String,
    assignees: Array,
    id: [String, Number]
})
defineEmits(['delete-project']);
const auth = useAuth();
const statusConfig = computed(() => props.status ? getProjectStatusByValue(props.status) : {})
const priorityConfig = computed(() => props.priority ? getProjectPriorityByValue(props.priority) : {});
</script>
<template>
     <tr>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ name }}</div>
                    <div class="text-sm text-gray-500">Client: {{ client_name }}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="statusConfig?.badgeClass"
            >
                {{ statusConfig?.label }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="priorityConfig?.badgeClass"
            >
                {{ priorityConfig?.label }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <AvatarGroup :assignees="assignees"/>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm flex items-center font-medium space-x-2">
            <RouterLink v-if="auth.isAdmin" :to="{ name: 'projects.edit', params: {projectId: id}}" class="text-blue-600 hover:bg-blue-100 p-1 rounded-md hover:text-blue-900" title="Edit">
                <IconSVG name="edit-svg"/>
            </RouterLink>
            <RouterLink :to="{ name: 'projects.show', params: {projectId: id}}" class="text-green-600 hover:bg-green-100 rounded-md p-1 hover:text-green-900" title="View project">
                <IconSVG name="eye-svg"/>
            </RouterLink>
            <button v-if="auth.isAdmin" @click="$emit('delete-project', id)" class="text-red-600 hover:text-red-900 hover:bg-red-100 p-1 rounded-md cursor-pointer"><Icon icon="mi:delete" width="24" height="24" /></button>
        </td>
    </tr>
</template>