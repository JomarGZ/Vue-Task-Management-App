<script setup>
import { useMemberStore } from '@/stores/memberStore';
import { useTeamMemberStore } from '@/stores/teamMemberStore';
import { onMounted } from 'vue';

const memberStore = useMemberStore();
const teamMemberStore = useTeamMemberStore();
onMounted(() => {
    memberStore.getMemberListWithoutPagination();
});
</script>
<template>
     <nav class="mb-8 text-sm">
            <ol class="flex items-center space-x-2">
                <li><RouterLink :to="{ name: 'teams.show', params: {teamId: $route?.params?.teamId}}" class="text-blue-600 hover:text-blue-800">Teams</RouterLink></li>
                <li class="text-gray-500">/</li>
            </ol>
      </nav>
    <div class="flex-1 p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Distribute Members to Teams</h2>
      <!-- Form -->
      <form @submit.prevent="teamMemberStore.addMemberToTeam({id: $route?.params?.teamId})" class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <!-- Member Dropdown -->
        <div class="mb-6">
          <label for="member" class="block text-sm font-medium text-gray-700">Select Member</label>
          <select
            id="member"
            name="member"
            v-model="teamMemberStore.form.member_id"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled selected>Select a member</option>
            <option v-for="member in memberStore.memberList" :key="member.id" :value="member.id">{{ member.name }}</option>
            <!-- Add more members here -->
          </select>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Assign to Team
          </button>
        </div>
      </form>
    </div>
</template>