<template>
    <div class="flex gap-4 group">
        <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
        <div class="flex-grow">
            <div class="bg-gray-50 rounded-2xl p-4">
                <div class="flex items-start justify-between">
                    <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-800">Sarah Chen</h4>
                        <span class="text-sm text-gray-500">Product Manager</span>
                        <span class="text-sm text-gray-400">• 2 hours ago</span>
                    </div>
                    <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1 hover:bg-gray-200 rounded transition-colors">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <p class="mt-2 text-gray-700">We need to ensure this authentication system supports both email/password and social login options. Please refer to the security requirements document for specific implementation details.</p>
                <div class="mt-3 flex items-center gap-4">
                    <button class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Reply
                    </button>
                    <button class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905c0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        2
                    </button>
                </div>
            </div>
            <!-- Nested Reply -->
            <div class="mt-4 ml-6 flex gap-4">
                <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full shadow-sm" alt="User avatar"/>
                <div class="flex-grow">
                    <div class="bg-gray-50 rounded-2xl p-3">
                    <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-800">Alex Kumar</h4>
                        <span class="text-sm text-gray-500">Developer</span>
                        <span class="text-sm text-gray-400">• 1 hour ago</span>
                    </div>
                        <p class="mt-2 text-gray-700">I'll start with the email/password implementation first, then move on to social login integration.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>