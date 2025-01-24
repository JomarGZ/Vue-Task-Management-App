<script setup>
import { onBeforeUnmount } from 'vue';
import { useRegister } from '@/stores/register';

const store = useRegister();
onBeforeUnmount(store.resetForm);

</script>
<template>
        <div class="space-y-3">
            <h1 class="text-5xl font-extrabold text-gray-900 leading-tight">
                Join <br/>
                <span class="text-blue-600">Sprint Sync Today</span>
            </h1>
            <p class="text-xl text-gray-600">
                Create your account and transform how your engineering team collaborates and delivers.
            </p>
            <form class="space-y-4 max-w-md">
                <div>
                    <label class="block text-gray-700 mb-2">Full Name</label>
                    <input type="text" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Work Email</label>
                    <input type="email" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your work email" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Password</label>
                    <input type="password" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Create a strong password" required>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Confirm Password</label>
                    <input type="password" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Repeat your password" required>
                </div>
                <div>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                    Create Account
                </button>
            </form>
            <div>
                <p class="text-gray-600">Already have an account? <a href="#" class="text-blue-600 hover:underline">Sign In</a></p>
            </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center">
            <div class="grid grid-cols-2 gap-6">
                <div class="bg-blue-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-blue-600 mb-4">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <h3 class="font-bold text-lg">Project Tracking</h3>
                    <p class="text-sm text-gray-600">Visualize project progress</p>
                </div>
                <div class="bg-green-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-green-600 mb-4">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 class="font-bold text-lg">Team Collaboration</h3>
                    <p class="text-sm text-gray-600">Seamless communication</p>
                </div>
                <div class="bg-purple-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-purple-600 mb-4">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <h3 class="font-bold text-lg">Task Management</h3>
                    <p class="text-sm text-gray-600">Organize your work</p>
                </div>
                <div class="bg-red-50 p-6 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-red-600 mb-4">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 class="font-bold text-lg">Performance Tracking</h3>
                    <p class="text-sm text-gray-600">Monitor team metrics</p>
                </div>
            </div>
        </div>
</template>