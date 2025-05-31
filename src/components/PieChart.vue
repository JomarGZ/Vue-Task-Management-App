<!-- PieChart.vue -->
<template>
  <div class="flex items-center justify-center">
      <apexchart
          height="100%"
          width="100%"
          :series="series"
          :options="chartOptions"
      ></apexchart>
  </div>
</template>

<script setup>
import { useTaskDistrubutionStore } from '@/stores/taskDistributionStore';
import { onMounted, ref } from 'vue';

const taskDistributionStore = useTaskDistrubutionStore();
// Mock API response structure

// Process mock data like real API response
const series = ref([0, 0, 0, 0]);

const chartOptions = ref({
  chart: {
    type: 'donut',
    height: 350,
    toolbar: { show: false }
  },
  labels: ['Completed', 'In Progress', 'To do', 'Exceptional'],
  colors: ['#10B981', '#F59E0B', '#3B82F6', '#4d4a45'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 200 },
      legend: { position: 'bottom' }
    }
  }]
});
onMounted(() => {
  taskDistributionStore.getTaskDistribution().then(() => {
    series.value = [
      taskDistributionStore.chartData.completed,
      taskDistributionStore.chartData.in_progress,
      taskDistributionStore.chartData.to_do,
      taskDistributionStore.chartData.exception
    ];
  });
})
</script>
  
