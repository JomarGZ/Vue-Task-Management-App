<template>
    <div style="height: 350px; width: 100%;">
      <apexchart
        type="area"
        height="100%"
        width="100%"
        :options="chartOptions"
        :series="chartOptions.series"
      ></apexchart>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const chartOptions = ref({
    series: [
      { name: 'Actual', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Target', data: [11, 32, 45, 32, 34, 52, 41] }
    ],
    chart: { type: 'area', height: '100%' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
    },
  });
  </script>