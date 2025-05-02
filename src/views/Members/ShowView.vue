<script setup>
import DefaultUserPic from '@/components/DefaultUserPic.vue';
import TaskActivityFeed from '@/components/TaskActivityFeed.vue';
import { capWords } from '@/composables/useUtil';
import { useAuth } from '@/stores/auth';
import { useMemberStore } from '@/stores/memberStore';
import { useUserTasks } from '@/stores/userTaskStore';
import debounce from 'lodash.debounce';
import { onBeforeUnmount, onMounted, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import SelectMemberPosition from '@/components/SelectMemberPosition.vue';
const auth = useAuth();
const useMember = useMemberStore();
const userTaskStore = useUserTasks();
const route = useRoute();

const handleDebounceSearch = debounce(async(search) => {
    userTaskStore.clearFilters();
    await userTaskStore.fetchAssignedTasks({
        search: search
    })
}, 300)

const handleAssignedTaskFilter =  ([selectedStatus, selectedPriority]) => {
    userTaskStore.fetchAssignedTasks({
        status: selectedStatus,
        priority_level: selectedPriority,
    })

}

watch(() => userTaskStore.searchQuery, handleDebounceSearch)
watch(() => [userTaskStore.selectedStatus, userTaskStore.selectedPriority], handleAssignedTaskFilter);

onBeforeUnmount(() => {
    userTaskStore.clearFilters();
    useMember.resetMember();
})
onMounted(() => {
    userTaskStore.fetchAssignedTasks({user_id: route.params?.id});
    useMember.fetchMember({id: route.params?.id});
})
provide('pagination', userTaskStore.pagination);
provide('handlePageChange', userTaskStore.handlePageChange);
</script>
<template>
    <div class="container mx-auto px-4 py-8">
     <!-- Profile Header -->
     <div class=" flex  justify-between bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center space-x-6">
            <!-- Profile Picture -->
            <img v-if="useMember.member?.avatar?.['thumb-200']" :src="useMember.member?.avatar?.['thumb-200']" alt="Profile Picture" class="w-24 h-24 border-4 border-white outline outline-4 outline-blue-500 rounded-full">
            <DefaultUserPic v-else class="w-24 h-24 border-white border-4 text-3xl" :name="useMember?.member?.name ?? ''"/>
            <!-- Profile Details -->
            <div>
                <h2 class="text-2xl font-semibold text-gray-800">{{ capWords(useMember.member?.name) }}</h2>
                <p class="text-gray-600">Software Engineer</p>
                <p class="text-gray-500">{{ useMember.member?.email }}</p>
            </div>
        </div>
        <div>
            <SelectMemberPosition/>
        </div>
     </div>

     <!-- Team Section -->
    <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-6">
         <h2 class="text-xl font-semibold mb-4">Assigned Teams</h2>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div class="border rounded-lg p-4">
                 <div class="flex items-center justify-between mb-2">
                     <h3 class="font-medium">Frontend Team</h3>
                     <span class="text-sm text-gray-500">Lead Developer</span>
                 </div>
                 <div class="flex -space-x-2">
                     <img src="https://i.pravatar.cc/50" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="https://i.pravatar.cc/50" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="https://i.pravatar.cc/50" alt="Team Member" class="w-8 h-8 rounded-full /api/placeholder/32/3-2 border-white"/>
                 </div>
             </div>
             <div class="border rounded-lg p-4">
                 <div class="flex items-center justify-between mb-2">
                     <h3 class="font-medium">UI/UX Team</h3>
                     <span class="text-sm text-gray-500">Member</span>
                 </div>
                 <div class="flex -space-x-2">
                     <img src="https://i.pravatar.cc/50" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="https://i.pravatar.cc/50" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                 </div>
             </div>
         </div>
     </div> -->
     <TaskActivityFeed
        :activities="userTaskStore.assignedTasks"
        :isLoading="userTaskStore.isAssignedTasksLoading"
        :isError="userTaskStore.isAssignedTasksError"
        v-model:searchQuery="userTaskStore.searchQuery"
        v-model:selectedStatus="userTaskStore.selectedStatus"
        v-model:selectedPriority="userTaskStore.selectedPriority"
    />

     <!-- Tasks Section -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">Not Started</h2>
                 <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">3</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">Design System Update</h3>
                     <p class="text-sm text-gray-600 mb-3">Update the design system documentation</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 25</span>
                         <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">High Priority</span>
                     </div>
                 </div>
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">API Integration</h3>
                     <p class="text-sm text-gray-600 mb-3">Integrate payment gateway API</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 28</span>
                         <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium Priority</span>
                     </div>
                 </div>
             </div>
         </div>

         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">In Progress</h2>
                 <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">2</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">User Authentication</h3>
                     <p class="text-sm text-gray-600 mb-3">Implement OAuth authentication</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 22</span>
                         <div class="w-full bg-gray-200 rounded h-1.5 ml-2">
                             <div class="bg-blue-600 h-1.5 rounded" style="width: 60%"></div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">Completed</h2>
                 <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">4</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4 opacity-75">
                     <h3 class="font-medium mb-2">Landing Page Design</h3>
                     <p class="text-sm text-gray-600 mb-3">Design new landing page layout</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Completed: Dec 15</span>
                         <span class="text-green-600">
                             <i class="fas fa-check-circle"></i>
                         </span>
                     </div>
                 </div>
             </div>
         </div>
     </div> -->
     <!-- <div class="bg-white shadow-md rounded-lg p-6 mt-5">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Activity History</h3>
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 rounded-lg">
          <p class="text-gray-800">Assigned to <strong>Task #123</strong> on 2023-10-10.</p>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <p class="text-gray-800">Completed <strong>Task #124</strong> on 2023-10-12.</p>
        </div>
      </div>
    </div> -->
 </div>
</template>