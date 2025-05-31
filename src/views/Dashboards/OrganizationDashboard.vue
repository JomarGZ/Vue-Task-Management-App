<script setup>
import CountsPanel from "@/components/CountsPanel.vue";
import TaskStatusDistributionChart from "@/components/PieChart.vue";
import AreaChart from "@/components/AreaChart.vue";
import { useTaskStats } from "@/stores/taskStats";
import { computed, onMounted } from "vue";
import { useTaskCompletionTrend } from "@/stores/tasksCompletionTrendStore";

const taskStats = useTaskStats();
const taskCompletionTrend = useTaskCompletionTrend();

const taskCountSData = computed(() => {
  return [
    { value: taskStats?.currentTotals?.completed || 0, name: 'Task Completed' },
    { value: taskStats?.currentTotals?.in_progress || 0, name: 'Task In Progress' },
  ]
})


onMounted(async() => {
  await taskStats.getTaskStats();
});
</script>
<template>
    <div>
      <CountsPanel />
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 space-y-6 lg:col-span-8">
          <div class="bg-gray-50 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-2xl font-bold text-gray-800">Task Achievement Dashboard</h2>
            </div>
            <AreaChart />
          </div>
        </div>

        <div class="col-span-12 space-y-6 lg:col-span-4">
          <div class="bg-gray-50 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-2xl font-bold text-gray-800">Task Status Distribution</h2>
            </div>
               <TaskStatusDistributionChart/>
          </div>
        </div>
      </div>
    </div>
</template>