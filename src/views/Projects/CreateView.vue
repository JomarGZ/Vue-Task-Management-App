<template>
     <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Create New Project</h1>
            <p class="mt-2 text-gray-600">Fill in the project details to get started.</p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <form class="space-y-6">
                <!-- Basic Information -->
                <div class="space-y-4">
                    <h2 class="text-lg font-medium text-gray-900">Basic Information</h2>
                    
                    <!-- Project Name -->
                    <div>
                        <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name *</label>
                        <input type="text" id="project_name" name="project_name" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <!-- Client -->
                    <div>
                        <label for="client" class="block text-sm font-medium text-gray-700">Client Name *</label>
                        <input type="text" id="client" name="client" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Project Description</label>
                        <textarea id="description" name="description" rows="4"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe the project objectives and scope..."></textarea>
                    </div>
                </div>

                <!-- Project Details -->
                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Project Details</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Start Date -->
                        <div>
                            <label for="start_date" class="block text-sm font-medium text-gray-700">Start Date *</label>
                            <input type="date" id="start_date" name="start_date" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>

                        <!-- End Date -->
                        <div>
                            <label for="end_date" class="block text-sm font-medium text-gray-700">End Date *</label>
                            <input type="date" id="end_date" name="end_date" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>

                    <!-- Priority -->
                    <div>
                        <label for="priority" class="block text-sm font-medium text-gray-700">Priority *</label>
                        <select id="priority" name="priority" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <!-- Budget -->
                    <div>
                        <label for="budget" class="block text-sm font-medium text-gray-700">Budget</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" id="budget" name="budget"
                                class="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00">
                        </div>
                    </div>
                </div>

                <!-- Team & Resources -->
                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Team & Resources</h2>

                    <!-- Project Manager -->
                    <div>
                        <label for="project_manager" class="block text-sm font-medium text-gray-700">Project Manager *</label>
                        <select id="project_manager" name="project_manager" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select project manager</option>
                            <option value="1">John Doe</option>
                            <option value="2">Jane Smith</option>
                            <option value="3">Mike Johnson</option>
                        </select>
                    </div>

                    <!-- Team Members -->
                    <div>
                        <label for="team_members" class="block text-sm font-medium text-gray-700">Team Members</label>
                        <select id="team_members" name="team_members" multiple
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="1">Sarah Wilson - Developer</option>
                            <option value="2">Tom Brown - Designer</option>
                            <option value="3">Lisa Anderson - QA</option>
                            <option value="4">James Taylor - Developer</option>
                        </select>
                        <p class="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple members</p>
                    </div>
                </div>

                <!-- Additional Settings -->
                <div class="space-y-4 pt-6 border-t">
                    <h2 class="text-lg font-medium text-gray-900">Additional Settings</h2>

                    <!-- Status -->
                    <div class="flex items-center space-x-4">
                        <label class="block text-sm font-medium text-gray-700">Initial Status</label>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <input type="radio" id="status_active" name="status" value="active" checked
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                <label for="status_active" class="ml-2 text-sm text-gray-700">Active</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="status_planning" name="status" value="planning"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                <label for="status_planning" class="ml-2 text-sm text-gray-700">Planning</label>
                            </div>
                        </div>
                    </div>

                    <!-- Notifications -->
                    <div class="flex items-center">
                        <input type="checkbox" id="notifications" name="notifications" checked
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="notifications" class="ml-2 text-sm text-gray-700">Send notifications to team members</label>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 pt-6 border-t">
                    <button type="button" 
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </button>
                    <button type="submit" 
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>