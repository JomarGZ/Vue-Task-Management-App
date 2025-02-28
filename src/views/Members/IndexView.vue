<script setup>
import DefaultUserPic from '@/components/DefaultUserPic.vue';
import { getInitials } from '@/composables/useFormatters';
import { useMemberStore } from '@/stores/memberStore';
import { onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
const store = useMemberStore();

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
                :to="{ name: 'members.create' }"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
                Add Member
            </RouterLink>
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Roles</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
            </select>
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th @click="store.orderBy('name')" class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th @click="store.orderBy('email')" class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th @click="store.orderBy('role')" class=" cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                        <tr 
                        v-for="member in store?.members"
                        :key="member.id"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <img v-if="member.avatar?.['thumb-60']" :src="member.avatar?.['thumb-60']" class="h-10 w-10 border-2 rounded-full border-white outline outline-2 outline-blue-400" alt="">
                                    <DefaultUserPic v-else :name="member.name" class="h-10 w-10 border-2 border-white outline outline-2 outline-blue-400"/>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ member.email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ member.role }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <!-- <button 
                                    @click="store.deleteMember(member)" 
                                    :class="{
                                        'text-red-600 hover:text-red-900':! store.loading,
                                        'text-red-400': store.loading,
                                    }" 
                                    title="Delete"
                                    :disabled="store.loading"
                                >
                                    <IconSVG name="trash-svg"/>
                                </button> -->
                                <button class="text-purple-600 hover:text-purple-900" title="Impersonate">
                                    <IconSVG name="user-svg"/>
                                </button>
                            </td>
                        </tr>
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