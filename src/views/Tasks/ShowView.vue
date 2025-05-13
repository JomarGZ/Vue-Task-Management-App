<script setup>
import PageHeader from '@/components/PageHeader.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import TaskAssigneesSection from '@/components/TaskAssigneesSection.vue';
</script>
<template>
      <div class="container mx-auto px-4 py-8">
        <!-- Task Header -->
         <div class="flex items-center justify-between mb-6">
            <page-header headerName="Task Dashboard">
                    <nav class="flex mt-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <button type="button" @click="$router.back()"  class=" cursor-pointer text-gray-700 hover:text-blue-600 text-sm">Tasks</button>
                            </li>
                            <li aria-current="page" class="min-w-0">
                                <div class="flex items-center gap-2 min-w-0 max-w-[300px] overflow-hidden">
                                    <Icon icon="weui:arrow-outlined" width="10" height="20" class="text-gray-400 shrink-0"/>
                                    <span class="text-gray-500 text-sm truncate capitalize">
                                        Task name
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
            </page-header>
             <div class="flex space-x-3">
                <router-link :to="{name: 'tasks.edit', params: {taskId: $route.params?.taskId}}" class="px-4 py-2 bg-blue-600 flex gap-2 items-center justify-center text-white rounded-lg hover:bg-blue-700 transition">
                    <Icon icon="bxs:edit" width="24" height="24" />Edit Project
                </router-link>
            </div>
        </div>
      

        <!-- Main Task Card -->
        <div class="bg-gray-50 rounded-xl shadow-md overflow-hidden mb-6">
            <!-- Task Title and Metadata -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center mb-2">
                            <span class="bg-priority-high text-white text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">High Priority</span>
                            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
                        </div>
                        <h2 class="text-2xl font-semibold text-gray-800">Complete Project Proposal Draft</h2>
                    </div>
                    <div class="relative">
                        <select class="block appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                            <option>To Do</option>
                            <option selected>In Progress</option>
                            <option>In Review</option>
                            <option>Completed</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Task Metadata Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-xs text-gray-500 font-medium mb-1">START DATE</div>
                        <div class="flex items-center">
                            <i class="far fa-calendar-alt text-gray-400 mr-2"></i>
                            <span class="font-medium">May 5, 2023</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-xs text-gray-500 font-medium mb-1">DUE DATE</div>
                        <div class="flex items-center">
                            <i class="far fa-calendar-check text-gray-400 mr-2"></i>
                            <span class="font-medium">May 15, 2023</span>
                            <span class="ml-auto text-sm px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">5 days left</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-xs text-gray-500 font-medium mb-1">ESTIMATED TIME</div>
                        <div class="flex items-center">
                            <i class="far fa-clock text-gray-400 mr-2"></i>
                            <span class="font-medium">8 hours</span>
                            <span class="ml-auto text-sm text-gray-500">4h logged</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Task Description -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-medium text-gray-800">Description</h3>
                    <button class="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <i class="fas fa-pencil-alt mr-1 text-xs"></i> Edit
                    </button>
                </div>
                <p class="text-gray-600">
                    Draft the initial proposal for the client project including scope, timeline, and budget estimates. 
                    The proposal should align with our company standards and include all necessary sections as per the template.
                    Ensure to highlight our unique value proposition and include case studies from similar projects.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Marketing</span>
                    <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Client Project</span>
                    <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Q2 Goal</span>
                </div>
            </div>

            <!-- Progress and Time Tracking -->
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-800 mb-3">Progress</h3>
                <div class="mb-4">
                    <div class="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Completion</span>
                        <span>65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 65%"></div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-gray-500 mb-1">Time Spent</div>
                        <div class="font-medium">4h 22m</div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500 mb-1">Time Remaining</div>
                        <div class="font-medium">3h 38m</div>
                    </div>
                </div>
                <button class="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center text-sm">
                    <i class="fas fa-stopwatch mr-2"></i>Log Time
                </button>
            </div>

            <!-- Links Section -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-medium text-gray-800">Related Links</h3>
                    <button class="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <i class="fas fa-plus mr-1"></i> Add Link
                    </button>
                </div>
                <div class="space-y-3">
                    <!-- Link Items -->
                    <div class="flex items-center justify-between group p-3 hover:bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-blue-100 p-2 rounded-lg mr-3">
                                <i class="fab fa-google-drive text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <a href="#" class="text-blue-600 hover:underline font-medium">Project Proposal Draft</a>
                                <p class="text-xs text-gray-500">Google Docs - Last edited 2 hours ago</p>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="flex items-center justify-between group p-3 hover:bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-purple-100 p-2 rounded-lg mr-3">
                                <i class="fab fa-github text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <a href="#" class="text-blue-600 hover:underline font-medium">PR #42: Authentication fixes</a>
                                <p class="text-xs text-gray-500">GitHub - Merged yesterday</p>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="flex items-center justify-between group p-3 hover:bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <div class="bg-red-100 p-2 rounded-lg mr-3">
                                <i class="fab fa-google-drive text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <a href="#" class="text-blue-600 hover:underline font-medium">Client Presentation Deck</a>
                                <p class="text-xs text-gray-500">Google Slides - Shared</p>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Assignees Section -->
            <task-assignees-section/>
        </div>

        <!-- Comments Section -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-800 mb-4">Activity</h3>
                
                <!-- Activity Timeline -->
                <div class="border-l border-gray-200 pl-6 pb-6 space-y-6">
                    <!-- Status Change -->
                    <div class="relative">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                        <div class="flex items-center mb-1">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-6 h-6 rounded-full mr-2">
                            <span class="font-medium text-sm">Sarah Johnson</span>
                            <span class="text-xs text-gray-500 ml-2">2 hours ago</span>
                        </div>
                        <p class="text-sm text-gray-600 pl-8">Changed status from <span class="font-medium">"To Do"</span> to <span class="font-medium">"In Progress"</span></p>
                    </div>
                    
                    <!-- Comment -->
                    <div class="relative">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                        <div class="flex items-center mb-1">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-6 h-6 rounded-full mr-2">
                            <span class="font-medium text-sm">Michael Chen</span>
                            <span class="text-xs text-gray-500 ml-2">1 hour ago</span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 ml-8">
                            <p>I've reviewed the initial draft and added some technical specifications for the implementation phase. The timeline might need adjustment once we get client feedback.</p>
                            <div class="mt-2 flex space-x-2">
                                <a href="#" class="text-blue-600 text-xs hover:underline flex items-center">
                                    <i class="fab fa-google-drive mr-1"></i> Proposal Draft
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Link Added -->
                    <div class="relative">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                        <div class="flex items-center mb-1">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="w-6 h-6 rounded-full mr-2">
                            <span class="font-medium text-sm">Emma Wilson</span>
                            <span class="text-xs text-gray-500 ml-2">30 minutes ago</span>
                        </div>
                        <p class="text-sm text-gray-600 pl-8">Added link <a href="#" class="text-blue-600 hover:underline">"Client Presentation Deck"</a></p>
                    </div>
                </div>
                
                <!-- Comment Form -->
                <div class="flex mt-6">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-10 h-10 rounded-full mr-3">
                    <div class="flex-1">
                        <form>
                            <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="Add a comment or update..."></textarea>
                            <div class="flex justify-between items-center mt-2">
                                <div class="flex space-x-2">
                                    <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                        <i class="fas fa-paperclip mr-1"></i> Link
                                    </button>
                                    <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                        <i class="fas fa-stopwatch mr-1"></i> Time
                                    </button>
                                    <button type="button" class="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                                        <i class="fas fa-tag mr-1"></i> Status
                                    </button>
                                </div>
                                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>