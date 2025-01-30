<script setup>
import { useTeamMemberStore } from '@/stores/teamMemberStore';
import { onMounted, watch } from 'vue';

const teamMemberStore = useTeamMemberStore();

onMounted(() => {
    // teamMemberStore.getTeamMemberCounts();
    teamMemberStore.getTeams();
});
</script>
<template>
        <div class="flex flex-1 flex-col overflow-hidden">
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
                    'border-2 border-indigo-600 text-indigo-600': team.id === $route.params.teamId
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

            <!-- Team Members Grid -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <!-- Team Member Card 1 -->
              <div class="overflow-hidden rounded-xl bg-white shadow-sm">
                <div class="p-6">
                  <div class="flex items-center space-x-4">
                    <img src="https://i.pravatar.cc/64" class="h-16 w-16 rounded-full" alt="Sarah Wilson" />
                    <div>
                      <h3 class="text-lg font-semibold">Sarah Wilson</h3>
                      <p class="text-indigo-600">Lead Designer</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="mb-2 flex items-center text-sm text-gray-600">
                      <i class="fas fa-envelope mr-2"></i>
                      sarah.w@company.com
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      San Francisco, CA
                    </div>
                  </div>
                  <div class="mt-4">
                    <h4 class="mb-2 text-sm font-medium text-gray-600">Current Projects</h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Website Redesign</span>
                      <span class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">Mobile App</span>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-6 py-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="h-2 w-2 rounded-full bg-green-500"></span>
                      <span class="text-sm text-gray-600">Available</span>
                    </div>
                    <button class="text-indigo-600 hover:text-indigo-800">
                      <i class="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Team Member Card 2 -->
              <div class="overflow-hidden rounded-xl bg-white shadow-sm">
                <div class="p-6">
                  <div class="flex items-center space-x-4">
                    <img src="https://i.pravatar.cc/64" class="h-16 w-16 rounded-full" alt="Mike Johnson" />
                    <div>
                      <h3 class="text-lg font-semibold">Mike Johnson</h3>
                      <p class="text-indigo-600">Senior Developer</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="mb-2 flex items-center text-sm text-gray-600">
                      <i class="fas fa-envelope mr-2"></i>
                      mike.j@company.com
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      New York, NY
                    </div>
                  </div>
                  <div class="mt-4">
                    <h4 class="mb-2 text-sm font-medium text-gray-600">Current Projects</h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">API Integration</span>
                      <span class="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">Database Migration</span>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-6 py-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                      <span class="text-sm text-gray-600">In Meeting</span>
                    </div>
                    <button class="text-indigo-600 hover:text-indigo-800">
                      <i class="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Team Member Card 3 -->
              <div class="overflow-hidden rounded-xl bg-white shadow-sm">
                <div class="p-6">
                  <div class="flex items-center space-x-4">
                    <img src="https://i.pravatar.cc/64" class="h-16 w-16 rounded-full" alt="Emma Davis" />
                    <div>
                      <h3 class="text-lg font-semibold">Emma Davis</h3>
                      <p class="text-indigo-600">Product Manager</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="mb-2 flex items-center text-sm text-gray-600">
                      <i class="fas fa-envelope mr-2"></i>
                      emma.d@company.com
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      London, UK
                    </div>
                  </div>
                  <div class="mt-4">
                    <h4 class="mb-2 text-sm font-medium text-gray-600">Current Projects</h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">Product Launch</span>
                      <span class="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">Market Research</span>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-6 py-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="h-2 w-2 rounded-full bg-red-500"></span>
                      <span class="text-sm text-gray-600">Buassdsdasy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>