<template>
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-medium text-gray-800">Related Links</h3>
            <button class="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <i class="fas fa-plus mr-1"></i> Add Link
            </button>
        </div>
        <div class="space-y-3">
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
</template>