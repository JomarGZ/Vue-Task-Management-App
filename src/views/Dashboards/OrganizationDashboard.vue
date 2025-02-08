<template>
    <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
            <div class="flex items-center">
                <div class="flex-1">
                    <h2 class="text-gray-500 text-sm font-medium">Total Tasks</h2>
                    <p class="text-3xl font-bold text-gray-900">24</p>
                    <p class="text-sm text-gray-600 mt-1">↑ 12% from last week</p>
                </div>
                <div class="bg-blue-100 p-3 rounded-full">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
            <div class="flex items-center">
                <div class="flex-1">
                    <h2 class="text-gray-500 text-sm font-medium">Completed</h2>
                    <p class="text-3xl font-bold text-gray-900">18</p>
                    <p class="text-sm text-green-600 mt-1">↑ 8% from last week</p>
                </div>
                <div class="bg-green-100 p-3 rounded-full">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
            <div class="flex items-center">
                <div class="flex-1">
                    <h2 class="text-gray-500 text-sm font-medium">In Progress</h2>
                    <p class="text-3xl font-bold text-gray-900">4</p>
                    <p class="text-sm text-yellow-600 mt-1">− Same as last week</p>
                </div>
                <div class="bg-yellow-100 p-3 rounded-full">
                    <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
            <div class="flex items-center">
                <div class="flex-1">
                    <h2 class="text-gray-500 text-sm font-medium">Overdue</h2>
                    <p class="text-3xl font-bold text-red-600">4</p>
                    <p class="text-sm text-red-500 mt-1">↑ Increased from last week</p>
                </div>
                <div class="bg-red-100 p-3 rounded-full">
                    <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 9v2m0 4h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </p>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-700">Upcoming Deadlines</h3>
              <div class="rounded-lg bg-rose-50 p-2">
                <svg class="h-6 w-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700">UX Design Review</h4>
                  <p class="text-sm text-slate-500">Tomorrow at 3:00 PM</p>
                </div>
                <span class="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-600">High Priority</span>
              </div>
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700"></h4>
                </div>
              </div>
            </div>
          </div>
        <div class="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-700">Upcoming Deadlines</h3>
              <div class="rounded-lg bg-rose-50 p-2">
                <svg class="h-6 w-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700">UX Design Review</h4>
                  <p class="text-sm text-slate-500">Tomorrow at 3:00 PM</p>
                </div>
                <span class="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-600">High Priority</span>
              </div>
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700"></h4>
                </div>
              </div>
            </div>
          </div>
        <div class="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-700">Upcoming Deadlines</h3>
              <div class="rounded-lg bg-rose-50 p-2">
                <svg class="h-6 w-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700">UX Design Review</h4>
                  <p class="text-sm text-slate-500">Tomorrow at 3:00 PM</p>
                </div>
                <span class="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-600">High Priority</span>
              </div>
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700"></h4>
                </div>
              </div>
            </div>
          </div>
        <div class="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-700">Upcoming Deadlines</h3>
              <div class="rounded-lg bg-rose-50 p-2">
                <svg class="h-6 w-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700">UX Design Review</h4>
                  <p class="text-sm text-slate-500">Tomorrow at 3:00 PM</p>
                </div>
                <span class="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-600">High Priority</span>
              </div>
              <div class="flex items-center rounded-lg bg-slate-50 p-3">
                <div class="flex-1">
                  <h4 class="font-medium text-slate-700"></h4>
                </div>
              </div>
            </div>
          </div>
       
     
    </div>
    <div class="w-full bg-white rounded-lg shadow-sm border mb-4 border-slate-100 overflow-hidden">
        <div class="p-6 border-b border-slate-100">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-slate-800">Your Active Tasks</h3>
                <div class="flex space-x-2">
                    <button class="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200">
                        Filter
                    </button>
                </div>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Task
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Due Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Progress
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr class="hover:bg-slate-50">
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-slate-900">API Integration</div>
                                    <div class="text-sm text-slate-500">Backend Development</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                High
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-500">
                            Dec 24, 2023
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                In Progress
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="w-24 h-2 bg-slate-100 rounded-full mr-2">
                                    <div class="w-2/3 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <span class="text-sm text-slate-600">65%</span>
                            </div>
                        </td>
                    </tr>
                    <!-- Add more task rows here -->
                </tbody>
            </table>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            </p>
        </div>
        <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            </p>
        </div>
        <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            </p>
        </div>
        <div class="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            </p>
        </div>
    </div>
    <div class="w-full bg-white rounded-lg shadow-sm border mt-4 border-slate-100 overflow-hidden">
        <div class="p-6 border-b border-slate-100">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-slate-800">Your Active Projects</h3>
                <div class="flex space-x-2">
                    <button class="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200">
                        Filter
                    </button>
                </div>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Task
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Due Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Progress
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr class="hover:bg-slate-50">
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-slate-900">API Integration</div>
                                    <div class="text-sm text-slate-500">Backend Development</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                High
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-500">
                            Dec 24, 2023
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                In Progress
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="w-24 h-2 bg-slate-100 rounded-full mr-2">
                                    <div class="w-2/3 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <span class="text-sm text-slate-600">65%</span>
                            </div>
                        </td>
                    </tr>
                    <!-- Add more task rows here -->
                </tbody>
            </table>
        </div>
    </div>
</template>