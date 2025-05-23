<script setup>
import MemberItem from '@/components/MemberItem.vue';
import { useAuth } from '@/stores/auth';
import { useMemberStore } from '@/stores/memberStore';
import { onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
const store = useMemberStore();
const auth = useAuth();
watch(
  () => store.searchInput,
  (newSearch) => {
    store.debounceSearch(newSearch)
  },
)
onMounted(store.getMembers);
</script>
<template>
        <div>
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Team Members</h1>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-6 flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
                <input v-model="store.searchInput" type="text" placeholder="Search members..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <RouterLink
                v-if="auth.user?.role == 'admin'"
                :to="{ name: 'members.create' }"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
                Add Member
            </RouterLink>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Position</th>
                        <th v-if="auth.user?.role === 'admin'" class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Position</th>
                        <!-- <th class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th> -->
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Sample Row 1 -->
                     <tr v-if="store.isFetchLoading">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <IconSpinner class="h-10 w-10 text-gray-500 opacity-30" name="custom-spinner" />
                            </div>
                        </td>
                     </tr>
                     <tr v-else-if="store.isFetchError">
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>Failed to load members</p>
                            </div>
                        </td>
                     </tr>
                     <template v-else-if="store?.members?.length > 0">
                        <MemberItem
                            v-for="member in store?.members"
                            :key="member.id"
                            :id="member.id"
                            :name="member.name"
                            :email="member.email"
                            :position="member.position"
                            @delete-member="() => store.deleteMember(member)"
                            @save-member="(selectedPosition) => store.changePosition(member.id, selectedPosition)"
                        />
                     </template>
                     <tr v-else >
                        <td colspan="100%" class="p-4">
                            <div class="flex items-center justify-center">
                                <p>No member found</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination -->
        <PaginationComponent :pagination="store.pagination" :onPageChange="store.changePage"/>
    </div>
</template>