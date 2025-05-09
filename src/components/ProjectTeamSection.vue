<script setup>
import AssigneeItem from './AssigneeItem.vue';

const props = defineProps({
    teamAssignees: {
        type: Array,
        default: () => ([])
    }
})
</script>
<template>
    <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Team</h3>
            <button class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm">
                <i class="fas fa-user-plus mr-1"></i>Add Member
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="teamAssignees.length > 0">

            </template>
            <AssigneeItem
                v-for="assignee in teamAssignees"
                :key="assignee.id"
                :name="assignee.name"
                :avatar="assignee.avatar?.['thumb-60']"
                :position="assignee.position?.name"
            />
        </div>
    </div>
</template>