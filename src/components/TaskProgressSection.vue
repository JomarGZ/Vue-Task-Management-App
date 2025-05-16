<template>
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
</template>