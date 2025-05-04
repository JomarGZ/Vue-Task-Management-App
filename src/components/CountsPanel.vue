<script setup>
import { useUserTasks } from '@/stores/userTaskStore';
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';
import LineChart from '@/components/LineChart.vue';
defineProps({
    taskCounts: {
        type: Object,
        default: () => ({
            completed: 0,
            in_progress: 0,
            total: 0,
            last_week: {
                completed: 0,
                in_progress: 0,
                total: 0
            }
        })
    }
})
const userTaskStore = useUserTasks();

onMounted(async () => {
    await userTaskStore.getTaskCounts();
})
</script>
<template>
     <div class="grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mb-4">
        <div class="bg-gray-50 rounded-xl shadow-md p-4 text-gray-900">
            <div class="flex items-center justify-between px-2 py-4">
                <div class="flex items-center justify-start gap-2">
                    <div class="bg-gray-100 text-gray-500 rounded-full p-2 flex items-center justify-center">
                        <Icon icon="line-md:star" width="20" height="20" />
                    </div>
                    <h2 class="font-bold text-gray-600">Task Completed</h2>
                </div>
                <div class="text-2xl font-bold text-gray-700">{{ taskCounts.completed }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                 <LineChart />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ taskCounts.last_week?.completed }}+</span> From last week</p>
                </div>
            </div>
        </div>
        <div class="bg-gray-50 rounded-xl shadow-md p-4 text-gray-900">
            <div class="flex items-center justify-between px-2 py-4">
                <div class="flex items-center justify-start gap-2">
                    <div class="bg-gray-100 text-gray-500 rounded-full p-2 flex items-center justify-center">
                        <Icon icon="streamline:task-list" width="20" height="20" />
                    </div>
                    <h2 class="font-bold text-gray-600">Task In-progress</h2>
                </div>
                <div class="text-2xl font-bold text-gray-700">{{ taskCounts.in_progress }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                    <LineChart 
                        :strokeColor="['#8c03fc']"
                        :fillColor="['#c203fc']"
                    />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ taskCounts.last_week?.in_progress }}+</span> From last week</p>
                </div>
            </div>
        </div>
        <div class="bg-gray-50 rounded-xl shadow-md p-4 text-gray-900">
            <div class="flex items-center justify-between px-2 py-4">
                <div class="flex items-center justify-start gap-2">
                    <div class="bg-gray-100 text-gray-500 rounded-full p-2 flex items-center justify-center">
                        <Icon icon="fluent:clipboard-task-list-16-regular" width="20" height="20" />
                    </div>
                    <h2 class="font-bold text-gray-600">Total Tasks</h2>
                </div>
                <div class="text-2xl font-bold text-gray-700">{{ taskCounts.total }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                    <LineChart 
                        :strokeColor="['#fc030f']"
                        :fillColor="['#fc03ba']"
                    />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ taskCounts.last_week?.total }}+</span> From last week</p>
                </div>
            </div>
        </div>
    </div>
</template>