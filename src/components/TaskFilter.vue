<template>
    <div class="flex flex-wrap gap-2 items-center">
        <div class="flex-1 min-w-[200px]">
            <div class="relative">
                <input 
                    v-model="taskStore.searchInput" 
                    type="text" 
                    placeholder="Search projects..." 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <div class="absolute left-3 top-2.5 text-gray-400">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>
        
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
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">Select Priority</option>
            <option v-for="priority in taskStore?.priorityLevels" :key="priority" :value="priority">
                {{ priority }}
            </option>
        </select>
        <select 
            v-model="taskStore.selectedStatus" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">Select Status</option>
            <option v-for="status in taskStore?.statuses" :key="status" :value="status" class="capitalize">
                {{ status }}
            </option>
        </select>
    </div>
</template>
<script setup>
import { useMemberStore } from "@/stores/memberStore";
import { useTaskStore } from "@/stores/taskStore";
import { onMounted, onUnmounted, watch } from "vue";


const taskStore = useTaskStore();
const memberStore = useMemberStore();

onMounted(async() => {
  await Promise.all([
    taskStore.fetchStatuses(),
    taskStore.fetchPriorityLevels(),    
    memberStore.getMemberListWithoutPagination()
  ]);
});
</script>