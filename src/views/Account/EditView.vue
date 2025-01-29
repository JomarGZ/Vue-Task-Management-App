<template>
    <nav class="mb-8 text-sm">
        <ol class="flex items-center space-x-2">
            <li><RouterLink :to="{ name: 'account.index'}" class="text-blue-600 hover:text-blue-800">Account</RouterLink></li>
            <li class="text-gray-500">/</li>
        </ol>
    </nav>
     <div class="flex-1 p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Account Settings</h2>

      <!-- Update Account Details Section -->
      <div class="mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Update Account Details</h3>

        <!-- Name Field -->
        <div class="mb-6">
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@example.com"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- Save Changes Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      <!-- Change Password Section -->
      <div class="mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>

        <!-- Current Password Field -->
        <div class="mb-6">
          <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="current-password"
            name="current-password"
            placeholder="Enter current password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- New Password Field -->
        <div class="mb-6">
          <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Enter new password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- Confirm New Password Field -->
        <div class="mb-6">
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm new password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <!-- Change Password Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
</template>