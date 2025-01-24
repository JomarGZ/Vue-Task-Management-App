<template>
    <div class="container mx-auto px-4 py-8">
     <!-- Profile Header -->
     <div class="bg-white rounded-lg shadow-md p-6 mb-6">
         <div class="flex items-center space-x-4">
             <img src="" alt="Profile Picture" class="rounded-full w-16 h-16"/>
             <div>
                 <h1 class="text-2xl font-bold text-gray-800">John Doe</h1>
                 <p class="text-gray-600">Senior Developer</p>
             </div>
             <div class="ml-auto">
                 <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Active</span>
             </div>
         </div>
     </div>

     <!-- Team Section -->
     <div class="bg-white rounded-lg shadow-md p-6 mb-6">
         <h2 class="text-xl font-semibold mb-4">Assigned Teams</h2>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <!-- Team Card 1 -->
             <div class="border rounded-lg p-4">
                 <div class="flex items-center justify-between mb-2">
                     <h3 class="font-medium">Frontend Team</h3>
                     <span class="text-sm text-gray-500">Lead Developer</span>
                 </div>
                 <div class="flex -space-x-2">
                     <img src="" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="" alt="Team Member" class="w-8 h-8 rounded-full /api/placeholder/32/3-2 border-white"/>
                 </div>
             </div>
             <!-- Team Card 2 -->
             <div class="border rounded-lg p-4">
                 <div class="flex items-center justify-between mb-2">
                     <h3 class="font-medium">UI/UX Team</h3>
                     <span class="text-sm text-gray-500">Member</span>
                 </div>
                 <div class="flex -space-x-2">
                     <img src="" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                     <img src="" alt="Team Member" class="w-8 h-8 rounded-full border-2 border-white"/>
                 </div>
             </div>
         </div>
     </div>

     <!-- Tasks Section -->
     <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <!-- Not Started Tasks -->
         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">Not Started</h2>
                 <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">3</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">Design System Update</h3>
                     <p class="text-sm text-gray-600 mb-3">Update the design system documentation</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 25</span>
                         <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">High Priority</span>
                     </div>
                 </div>
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">API Integration</h3>
                     <p class="text-sm text-gray-600 mb-3">Integrate payment gateway API</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 28</span>
                         <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium Priority</span>
                     </div>
                 </div>
             </div>
         </div>

         <!-- In Progress Tasks -->
         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">In Progress</h2>
                 <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">2</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4">
                     <h3 class="font-medium mb-2">User Authentication</h3>
                     <p class="text-sm text-gray-600 mb-3">Implement OAuth authentication</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Due: Dec 22</span>
                         <div class="w-full bg-gray-200 rounded h-1.5 ml-2">
                             <div class="bg-blue-600 h-1.5 rounded" style="width: 60%"></div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <!-- Completed Tasks -->
         <div class="bg-white rounded-lg shadow-md p-6">
             <div class="flex items-center justify-between mb-4">
                 <h2 class="text-xl font-semibold">Completed</h2>
                 <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">4</span>
             </div>
             <div class="space-y-4">
                 <div class="border rounded-lg p-4 opacity-75">
                     <h3 class="font-medium mb-2">Landing Page Design</h3>
                     <p class="text-sm text-gray-600 mb-3">Design new landing page layout</p>
                     <div class="flex items-center justify-between">
                         <span class="text-xs text-gray-500">Completed: Dec 15</span>
                         <span class="text-green-600">
                             <i class="fas fa-check-circle"></i>
                         </span>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
</template>