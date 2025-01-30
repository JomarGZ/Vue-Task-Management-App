<template>
    <div class="mx-auto p-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Tasks</h1>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="mb-4">
            <div class="relative">
                <input type="text" 
                       placeholder="Search tasks..." 
                       class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Project Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Projects</option>
                    <option value="1">E-commerce Platform</option>
                    <option value="2">Mobile Banking App</option>
                    <option value="3">CRM System</option>
                </select>
            </div>

            <!-- Developer Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Assigned Developer</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Developers</option>
                    <option value="1">Sarah Chen</option>
                    <option value="2">Mike Brown</option>
                    <option value="3">Lisa Thompson</option>
                </select>
            </div>

            <!-- QA Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Assigned QA</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All QA</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                </select>
            </div>

            <!-- Status Filter -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select class="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Tasks List -->
    <div class="bg-white rounded-lg shadow-sm">
        <!-- Task Item -->
        <div class="border-b border-gray-200 hover:bg-gray-50">
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">E-commerce</span>
                        <h3 class="text-lg font-medium text-gray-900">Implement user authentication</h3>
                    </div>
                    <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</span>
                </div>
                
                <p class="text-gray-600 mb-4">Implement OAuth2 authentication with support for Google and Facebook login.</p>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <!-- Assigned Dev -->
                        <div class="flex items-center space-x-2">
                            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="text-blue-600 text-sm font-medium">SC</span>
                            </div>
                            <span class="text-sm text-gray-600">Sarah Chen</span>
                        </div>
                        
                        <!-- Assigned QA -->
                        <div class="flex items-center space-x-2">
                            <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="text-purple-600 text-sm font-medium">JD</span>
                            </div>
                            <span class="text-sm text-gray-600">John Doe</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">Due: Oct 15</span>
                        <span class="text-sm font-medium text-blue-600">High Priority</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Task Item 2 -->
        <div class="border-b border-gray-200 hover:bg-gray-50">
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Mobile Banking</span>
                        <h3 class="text-lg font-medium text-gray-900">Design transaction history UI</h3>
                    </div>
                    <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">In Review</span>
                </div>
                
                <p class="text-gray-600 mb-4">Create a user-friendly interface for viewing transaction history with filtering options.</p>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="text-blue-600 text-sm font-medium">MB</span>
                            </div>
                            <span class="text-sm text-gray-600">Mike Brown</span>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="text-purple-600 text-sm font-medium">JS</span>
                            </div>
                            <span class="text-sm text-gray-600">Jane Smith</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">Due: Oct 20</span>
                        <span class="text-sm font-medium text-yellow-600">Medium Priority</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- More task items can be added here -->
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
        <div class="text-sm text-gray-600">
            Showing 1-10 of 45 tasks
        </div>
        <div class="flex items-center space-x-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
            </button>
        </div>
    </div>
</div>
</template>