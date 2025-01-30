<script setup>
import { useTeamMemberStore } from '@/stores/teamMemberStore';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const teamMemberStore = useTeamMemberStore();
const route = useRoute();
watch(
  () => teamMemberStore.searchInput,
  (newSearch) => {
    teamMemberStore.debounceSearch(newSearch);
  }
)
watch(
    () => route.params.teamId,
    () => {
        teamMemberStore.getTeamMembers();
    }
)
onMounted(() => {
    // teamMemberStore.getTeamMemberCounts();
    teamMemberStore.getTeams();
    teamMemberStore.getTeamMembers();
});
</script>
<template>
        <div class="flex flex-1 flex-col overflow-hidden">
        <!-- Top Navigation -->
        <header class="bg-white shadow-sm rounded-xl">
          <div class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-4">
              <h2 class="text-xl font-semibold text-gray-800">Teams</h2>
              <RouterLink :to="{ name: 'teams.members.add', params: {teamId: '1'}}" class="rounded-lg bg-indigo-600 px-4 py-2 flex gap-2 items-center justify-center font-medium text-white hover:bg-indigo-700">
                  <IconSVG name="plus-svg"/>
                  Add Team Member
              </RouterLink>
            </div>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input type="text" placeholder="Search teams..." class="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                <IconSVG name="search-svg" class="absolute top-3 left-3 text-gray-400"/>
              </div>
              <button class="rounded-full p-2 hover:bg-gray-100">
                <i class="fas fa-bell text-gray-600"></i>
              </button>
              <button class="rounded-full p-2 hover:bg-gray-100">
                <i class="fas fa-cog text-gray-600"></i>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Department Tabs -->
          <div class="mx-auto max-w-6xl">
            <div class="mb-6 flex space-x-4">
                <button 
                  v-for="team in teamMemberStore.teams"
                  :key="team.id"
                  :class="{
                    'rounded-lg bg-white px-4 py-2 font-medium text-gray-600 shadow-sm hover:border-2 hover:border-indigo-600': true,
                    'border-2 border-indigo-600 text-indigo-600': team.id === parseInt($route.params.teamId)
                  }"
              >
                  <RouterLink :to="{name: 'teams.show', params: {teamId: team.id}}">{{ team.name }}</RouterLink>
              </button>
            </div>

            <!-- Team Stats -->
            <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-600">Total Members</h3>
                  <i class="fas fa-users text-indigo-600"></i>
                </div>
                <p class="mt-2 text-3xl font-bold">24</p>
                <p class="mt-2 text-sm text-green-600"><i class="fas fa-arrow-up mr-1"></i> +3 this month</p>
              </div>
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-600">Active Projects</h3>
                  <i class="fas fa-project-diagram text-indigo-600"></i>
                </div>
                <p class="mt-2 text-3xl font-bold">12</p>
                <p class="mt-2 text-sm text-green-600"><i class="fas fa-arrow-up mr-1"></i> +2 this month</p>
              </div>
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-600">Completed Tasks</h3>
                  <i class="fas fa-check-circle text-indigo-600"></i>
                </div>
                <p class="mt-2 text-3xl font-bold">284</p>
                <p class="mt-2 text-sm text-green-600"><i class="fas fa-arrow-up mr-1"></i> +12% this week</p>
              </div>
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                  <h3 class="text-gray-600">Team Performance</h3>
                  <i class="fas fa-chart-line text-indigo-600"></i>
                </div>
                <p class="mt-2 text-3xl font-bold">92%</p>
                <p class="mt-2 text-sm text-green-600"><i class="fas fa-arrow-up mr-1"></i> +5% this month</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 mt-5">
                  <div class="flex flex-col sm:flex-row mb-8">
                      <h2 class="text-2xl font-semibold text-gray-800">Members</h2>
                  </div>
                      <!-- Search and Filter Bar -->
                  <div class="bg-gray-50 rounded-lg p-4 mb-6">
                      <div class="flex flex-col sm:flex-row gap-4">
                          <!-- Search -->
                          <div class="relative flex-1">
                              <input
                                  type="text" 
                                  v-model="teamMemberStore.searchInput"
                                  placeholder="Search tasks..." 
                                  class="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                              >
                              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                          </div>
                          
                          <!-- Filters -->
                          <div class="flex gap-3">
                              <select class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                  <option value="">All Status</option>
                                  <option value="active">Active</option>
                                  <option value="completed">Completed</option>
                                  <option value="pending">Pending</option>
                              </select>
                              <select class="bg-white border-0 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
                                  <option value="">All Dates</option>
                                  <option value="today">Today</option>
                                  <option value="week">This Week</option>
                                  <option value="month">This Month</option>
                              </select>
                          </div>
                      </div>
                  </div>
                  <div class="space-y-4">
                      <div v-for="member in teamMemberStore.teamMembers" :key="member.id" class="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md">
                          <RouterLink :to="'#'" class="flex items-center justify-between">
                              <div class="flex items-center space-x-4">
                                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-4 ring-blue-100">
                                      <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                  </span>
                                  <div>
                                      <h3 class="text-sm font-medium text-gray-900">{{ member.name }}</h3>
                                      <span class="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">status</span>
                                  </div>
                              </div>
                              <div class="text-right">
                                  <time class="text-sm text-gray-500">Mar 15</time>
                                  <div class="mt-1">
                                      <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/50" alt="User avatar" />
                                  </div>
                              </div>
                          </RouterLink>
                      </div>
                  </div>
                  <PaginationComponent :pagination="teamMemberStore.pagination" size="sm" :onPageChange="teamMemberStore.changePage"/>
              </div>
          </div>
        </div>
      </div>
</template>