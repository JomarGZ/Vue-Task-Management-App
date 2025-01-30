<script setup>
</script>
<template>
     <nav class="mb-8 text-sm">
            <ol class="flex items-center space-x-2">
                <li><RouterLink :to="{ name: 'teams.index'}" class="text-blue-600 hover:text-blue-800">Teams</RouterLink></li>
                <li class="text-gray-500">/</li>
            </ol>
      </nav>
    <div class="flex-1 p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Distribute Members to Teams</h2>

      <!-- Form -->
      <form class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <!-- Member Dropdown -->
        <div class="mb-6">
          <label for="member" class="block text-sm font-medium text-gray-700">Select Member</label>
          <select
            id="member"
            name="member"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled selected>Select a member</option>
            <option value="Sarah Wilson">Sarah Wilson</option>
            <option value="Mike Johnson">Mike Johnson</option>
            <option value="Emma Davis">Emma Davis</option>
            <!-- Add more members here -->
          </select>
        </div>

        <!-- Team Dropdown -->
        <div class="mb-6">
          <label for="team" class="block text-sm font-medium text-gray-700">Assign to Team</label>
          <select
            id="team"
            name="team"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled selected>Select a team</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <!-- Add more teams here -->
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