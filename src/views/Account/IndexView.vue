<template>
    <div class="p-8">
        <div class="mx-auto space-y-8">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Account Settings</h1>
                <RouterLink :to="{name: 'account.edit'}" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Edit Profile
                </RouterLink>
            </div>

            <!-- Main Profile Card -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                    <h2 class="text-xl font-semibold mb-6">Profile Information</h2>
                    <div class="flex flex-col md:flex-row gap-8">
                        <!-- Profile Image Section -->
                        <div class="flex flex-col items-center space-y-4">
                            <div class="relative">
                                <img src="https://i.pravatar.cc/150" alt="Profile" class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"/>
                                <button class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                    </svg>
                                </button>
                            </div>
                            <span class="text-sm text-gray-500">Click to change photo</span>
                        </div>

                        <!-- Profile Details -->
                        <div class="flex-1 space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" value="Sarah Johnson" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" value="sarah.j@example.com" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" value="+1 (555) 123-4567" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">Company</label>
                                    <input type="text" value="Tech Solutions Inc." readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
                                </div>
                            </div>

                            <div class="border-t border-gray-200 pt-4 mt-6">
                                <div class="flex items-center text-sm text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    Member since January 2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Settings Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Notification Settings -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-xl font-semibold mb-4">Notification Settings</h2>
                    <p class="text-gray-500 mb-4">Configure how you receive notifications about your tasks and updates.</p>
                    <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Manage Notifications</a>
                </div>

                <!-- Security Settings -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-xl font-semibold mb-4">Security Settings</h2>
                    <p class="text-gray-500 mb-4">Update your password and configure two-factor authentication.</p>
                    <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Security Settings</a>
                </div>
            </div>
        </div>
    </div>
</template>