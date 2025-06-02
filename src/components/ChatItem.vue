<script setup>
defineProps({
    IsChatOwner : {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <template v-if="IsChatOwner">
        <div class="flex mb-6 group justify-end">
            <div class="flex-1 max-w-3xl">
                <div class="flex items-center mb-1 justify-end">
                    <button class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity mr-2">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <span class="text-xs text-gray-500 mr-2">10:45 AM</span>
                    <span class="font-medium">You</span>
                </div>
                <div class="bg-sky-500 text-white p-4 rounded-lg shadow-xs max-w-3xl">
                    <p>Thanks for the quick feedback Michael. Sarah, can you address the mobile menu issue before our 2pm meeting?</p>
                </div>
                <div class="flex justify-end mt-2">
                    <div class="flex -space-x-1">
                        <span class="bg-white text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-200">👍 1</span>
                    </div>
                </div>
            </div>
            <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" class="h-10 w-10 rounded-full ml-3 flex-shrink-0">
        </div>
    </template>
    <template v-else>
        <div class="flex mb-6 group">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="h-10 w-10 rounded-full mr-3 flex-shrink-0">
            <div class="flex-1">
                <div class="flex items-center mb-1">
                    <span class="font-medium mr-2">Michael Chen</span>
                    <span class="text-xs text-gray-500">10:42 AM</span>
                    <button class="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100 max-w-3xl">
                    <p>Just checked it out Sarah - looks great! The new color scheme is much more modern.</p>
                    <p class="mt-2">I did notice one small issue with the mobile menu alignment though.</p>
                </div>
                <div class="flex items-center mt-2">
                    <div class="flex -space-x-1 mr-3">
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">👍 2</span>
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">❤️ 1</span>
                    </div>
                    <div class="text-xs text-gray-500">
                        1 reply
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>