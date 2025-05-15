<template>
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Activity</h3>
            
            <div class="border-l border-gray-200 pl-6 pb-6 space-y-6">
                <div class="relative">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
                    <div class="flex items-center mb-1">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-6 h-6 rounded-full mr-2">
                        <span class="font-medium text-sm">Sarah Johnson</span>
                        <span class="text-xs text-gray-500 ml-2">2 hours ago</span>
                    </div>
                    <p class="text-sm text-gray-600 pl-8">Changed status from <span class="font-medium">"To Do"</span> to <span class="font-medium">"In Progress"</span></p>
                </div>
                
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
</template>