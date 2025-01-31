<script setup lang="ts">
import Modal from './Modal.vue';
defineProps({
    isModalShow: Boolean
})
defineEmits(['update:isModalShow']);
</script>

<template>
    <button @click="$emit('update:isModalShow', true)" class="hover:text-gray-800 text-gray-500">
        <IconSVG name="plus-svg"/>
    </button>
    <teleport to='body'>
        <transition
            enter-from-class="opacity-0 scale-125"
            enter-to-class="opacity-100 scale-100"
            enter-active-class="transition duration-200"
            leave-active-class="transition duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-125"
        >
            <Modal v-if="isModalShow">
                <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
                    <!-- Modal header -->
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold text-gray-900">Add Project Team</h2>
                        <button @click="$emit('update:isModalShow', false)" class="text-gray-400 hover:text-gray-500">
                            <IconSVG name="x-svg"/>
                        </button>
                    </div>

                    <!-- Form -->
                    <form class="space-y-6">
                        <!-- Project Manager Section -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                            <select class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select Project Manager</option>
                                <option value="1">John Doe</option>
                                <option value="2">Jane Smith</option>
                                <option value="3">Mike Johnson</option>
                            </select>
                        </div>

                        <!-- Team Members Section -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                            <div class="space-y-3">
                                <!-- Selected members list -->
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                                        Sarah Connor
                                        <button class="ml-2 text-blue-600 hover:text-blue-800">×</button>
                                    </span>
                                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                                        Alex Turner
                                        <button class="ml-2 text-blue-600 hover:text-blue-800">×</button>
                                    </span>
                                </div>

                                <!-- Multi-select dropdown -->
                                <select multiple class="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 h-32 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="1">David Wilson</option>
                                    <option value="2">Emma Thompson</option>
                                    <option value="3">Chris Anderson</option>
                                    <option value="4">Lisa Brown</option>
                                    <option value="5">Mark Davis</option>
                                </select>
                            </div>
                            <p class="mt-2 text-sm text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple members</p>
                        </div>

                        <!-- Role Assignment -->
                        <!-- <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Team Member Roles</label>
                            <div class="space-y-3">
                                <div class="flex items-center gap-3">
                                    <input type="text" placeholder="Member name" class="flex-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                                    <input type="text" placeholder="Role" class="flex-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                                    <button type="button" class="text-blue-600 hover:text-blue-800">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="mt-2 text-sm text-blue-600 hover:text-blue-800">+ Add another role</button>
                        </div> -->

                        <!-- Modal footer -->
                        <div class="flex justify-end gap-3 pt-6">
                            <button @click="$emit('update:isModalShow', false)" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Save Team
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </transition>
    </teleport>
</template>