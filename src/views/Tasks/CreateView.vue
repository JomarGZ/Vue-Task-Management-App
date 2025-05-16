<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { useProjectStore } from '@/stores/projectStore';
import { useProjectTaskStore } from '@/stores/projectTaskStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const projectTaskStore = useProjectTaskStore();
const handleSubmit = async (values) => {
    const success = await projectTaskStore.storeTask(route.params?.projectId, values);
    if (success) router.push({name: 'projects.show', params: {projectId: route.params?.projectId}});    
}
onMounted(async() => projectStore.getProject(route?.params?.projectId));
</script>
<template>
    <div class="mx-auto space-y-6">
        <!-- Project Details Card -->
        <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="space-y-6">
                <!-- Project Header -->
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ projectStore?.project?.name }}</h3>
                    </div>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Q1 2025</span>
                </div>

                <!-- Project Stats -->
                <div class="grid grid-cols-4 gap-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Progress</p>
                        <p class="text-xl font-semibold text-gray-800">65%</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Tasks</p>
                        <p class="text-xl font-semibold text-gray-800">24/45</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Due Date</p>
                        <p class="text-xl font-semibold text-gray-800">Mar 15</p>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600">Team</p>
                        <div class="flex -space-x-2 mt-1">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 1">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 2">
                            <img src="https://i.pravatar.cc/32" class="w-8 h-8 rounded-full border-2 border-white" alt="Team member 3">
                            <div class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                                <span class="text-xs text-gray-600">+2</span>   
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Progress -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-sm font-medium text-gray-700">Project Progress</h4>
                        <span class="text-sm text-gray-600">65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: 65%"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Task Creation Form (Same as before with updated title) -->
        <div class="bg-white rounded-xl shadow-sm p-8 min-w-0">
            <h3 class="text-lg font-semibold text-gray-800 mb-6 truncate">Add New Task to {{ projectStore?.project?.name }}</h3>
            <TaskForm
                :projectId="$route.params.projectId"
                @submit="handleSubmit"
            />
        </div>
    </div>
</template>