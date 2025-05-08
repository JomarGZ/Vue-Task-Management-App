<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const showMore = ref(false);
</script>
<template>
    <!-- Project Team Section -->
    <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">Project Team</h3>
            <button class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm">
                <i class="fas fa-user-plus mr-1"></i>Add Member
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Project Manager -->
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
            
            <!-- Design Lead -->
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
            
            <!-- Dev Lead -->
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
            
            <!-- Hidden Team Members -->
            <div>
                <div v-show="showMore" class="space-y-4">
                    <!-- QA Engineer -->
                    <div class="bg-white border border-gray-200 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                            <div>
                                <div class="font-medium">Lisa Martin</div>
                                <div class="text-sm text-gray-500">QA Engineer</div>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Testing</span>
                            <span class="text-blue-600">8 tasks</span>
                        </div>
                    </div>
                    
                    <!-- Backend Dev -->
                    <div class="bg-white border border-gray-200 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                            <div>
                                <div class="font-medium">David Kim</div>
                                <div class="text-sm text-gray-500">Backend Developer</div>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">API</span>
                            <span class="text-blue-600">6 tasks</span>
                        </div>
                    </div>
                    
                    <!-- DevOps -->
                    <div class="bg-white border border-gray-200 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                            <div>
                                <div class="font-medium">Robert Lee</div>
                                <div class="text-sm text-gray-500">DevOps Engineer</div>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Infrastructure</span>
                            <span class="text-blue-600">4 tasks</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center border w-full">
                    <button @click="showMore = !showMore" class="w-full text-center text-blue-600 hover:text-blue-800 mt-4 py-2 border border-gray-200 rounded-lg">
                        <span x-text="showMore ? 'Show Less Team Members' : 'Show 3 More Team Members'"></span>
                        <Icon icon="mingcute:down-fill" width="24" height="24" />
                        <i class="fas fa-chevron-down text-xs ml-1" :class="{ 'transform rotate-180': showMore }"></i>
                    </button>
                </div>
               
            </div>
        </div>
    </div>
</template>