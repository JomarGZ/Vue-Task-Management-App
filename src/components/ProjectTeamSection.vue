<script setup>

</script>
<template>
    <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Team</h3>
            <button class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm">
                <i class="fas fa-user-plus mr-1"></i>Add Member
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex items-center mb-3">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-medium">Sarah Johnson</div>
                        <div class="text-sm text-gray-500">Project Manager</div>
                    </div>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Lead</span>
                    <span class="text-blue-600">5 tasks</span>
                </div>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg">
                <div class="flex items-center mb-3">
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-medium">Emma Wilson</div>
                        <div class="text-sm text-gray-500">UX/UI Designer</div>
                    </div>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Design</span>
                    <span class="text-blue-600">7 tasks</span>
                </div>
            </div>
            
            <div class="bg-white border border-gray-200 p-4 rounded-lg">
                <div class="flex items-center mb-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-medium">Michael Chen</div>
                        <div class="text-sm text-gray-500">Lead Developer</div>
                    </div>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Development</span>
                    <span class="text-blue-600">12 tasks</span>
                </div>
            </div>
        </div>
    </div>
</template>