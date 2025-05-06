<script setup>
import { useUserTasks } from '@/stores/userTaskStore';
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import LineChart from '@/components/LineChart.vue';


const userTaskStore = useUserTasks();
const isMounted = ref(false);
const weekLabels = computed(() => {
    return userTaskStore.taskCounts?.weekly_data?.map(week => {
        const start = new Date(week.week_start);
        const end = new Date(week.week_end);
        return `${start.toLocaleString('default', {month: 'short'})} ${start.getDate()}-${end.getDate()}`
    })
})
const getWeeklyData = (metric) => {
    return userTaskStore.taskCounts.weekly_data?.map(week => week[metric] || 0);
} 
onMounted(async () => {
    await userTaskStore.getTaskCounts();
    isMounted.value = true;
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
                <div class="text-2xl font-bold text-gray-700">{{ userTaskStore.taskCounts?.current_totals?.completed || 0 }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                 <LineChart 
                    v-if="isMounted && !userTaskStore.isTaskCountsLoading"
                    :colors="['#10B981']"
                    :data="getWeeklyData('completed')"
                    name="Completed"
                    :labels="weekLabels"    
                />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ getWeeklyData('completed')?.[getWeeklyData('completed').length - 2]}}+</span> From last week</p>
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
                <div class="text-2xl font-bold text-gray-700">{{ userTaskStore.taskCounts?.current_totals?.in_progress || 0 }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                    <LineChart 
                        v-if="isMounted && !userTaskStore.isTaskCountsLoading"
                        :colors="['#F59E0B']"
                        :data="getWeeklyData('in_progress')"   
                        name="In Progress"    
                        :labels="weekLabels"  
                    />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ getWeeklyData('in_progress')?.[getWeeklyData('in_progress').length - 2] }}+</span> From last week</p>
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
                <div class="text-2xl font-bold text-gray-700">{{ userTaskStore.taskCounts?.current_totals?.total || 0 }}</div>
            </div>
            <div class="scale-y-50 h-0.5 w-full bg-gray-300 my-5"></div>
            <div class="flex justify-between items-center">
                <div class="">
                    <LineChart 
                        v-if="isMounted && !userTaskStore.isTaskCountsLoading"
                        :colors="['#3B82F6']"
                        :data="getWeeklyData('total')"   
                        name="Total" 
                        :labels="weekLabels"  
                    />
                </div>
                <div class="ml-3 text-sm">
                    <p class="text-gray-500"><span class="text-green-400 font-semibold">{{ getWeeklyData('total')?.[getWeeklyData('total').length - 2] }}+</span> From last week</p>
                </div>
            </div>
        </div>
    </div>
</template>