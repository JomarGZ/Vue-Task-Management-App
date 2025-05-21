<template>
    <div class="flex flex-wrap justify-between w-full gap-2 items-center">
        <div class="flex items-center gap-5">
            <select 
                v-model="taskStore.selectedAssigneeId" 
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select Assignee</option>
                <option v-for="member in memberStore.memberList" :key="member.id" :value="member.id" class="capitalize">
                    {{ member.name }}
                </option>
            </select>
            
            <select 
                v-model="taskStore.selectedPriority" 
                class="px-4 py-2 border border-gray-300 capitalize rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select Priority</option>
                <option v-for="priority in getTaskPriorityOptions()" :key="priority.value" :value="priority.value">
                    {{ priority.label }}
                </option>
            </select>
            <select 
                v-model="taskStore.selectedStatus" 
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 capitalize focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select Status</option>
                <option v-for="status in getTaskStatusOptions()" :key="status.value" :value="status.value">
                    {{ status.label }}
                </option>
            </select>
        </div>
        <div class="">
            <div class="relative">
                <input 
                    v-model="taskStore.searchInput" 
                    type="text" 
                    placeholder="Search task..." 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <div class="absolute left-3 top-2.5 text-gray-400">
                    <Icon icon="flat-color-icons:search" width="20" height="20" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getTaskPriorityOptions, getTaskStatusOptions } from "@/constants/task";
import { useMemberStore } from "@/stores/memberStore";
import { useTaskStore } from "@/stores/taskStore";
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
import { onMounted, watch } from "vue";

const emit = defineEmits(['submit-filters']);
const taskStore = useTaskStore();
const memberStore = useMemberStore();
const filters = () => {
    const query = new URLSearchParams(window.location.search)
    const filterMappings = [
        { storeKey: 'searchInput', queryKey: 'search' },
        { storeKey: 'selectedStatus', queryKey: 'status' },
        { storeKey: 'selectedPriority', queryKey: 'priority' },
        { storeKey: 'selectedAssigneeId', queryKey: 'assigneeId' },
    ];

    filterMappings.forEach(({storeKey, queryKey}) => {
        const rawValue = taskStore[storeKey];
        const value = typeof rawValue === 'string' ? rawValue.trim() : String(rawValue);

        if (value && value.length > 0) {
            query.set(queryKey, value);
        } else {
            query.delete(queryKey);
        }
    });

    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.replaceState(null, '', newUrl);
    emit('submit-filters', {
        search: taskStore.searchInput,
        status: taskStore.selectedStatus,
        priority: taskStore.selectedPriority,
        assigneeId: taskStore.selectedAssigneeId
    })
}
const debounceSearch = debounce(filters, 300);
watch(() => taskStore.searchInput, debounceSearch)

watch([
    () => taskStore.selectedAssigneeId,
    () => taskStore.selectedPriority,
    () => taskStore.selectedStatus,
], () => filters())

onMounted(async() => {
  await Promise.all([
    memberStore.getMemberListWithoutPagination()
  ]);
});
</script>