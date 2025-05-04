<template>
  <div class="w-full min-h-[100px]">
    <apexchart
      type="area"
      height="100%" 
      width="80%" 
      :options="chartOptions"
      :series="formattedSeries"
    ></apexchart>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  colors: {
    type: Array,
    default: () => (['#036ffc'])
  },
  weeklyData: {
    type: Array,
    default: () => [
      { week: '2023-W01', value: 3 },
      { week: '2023-W01', value: 10 },
      { week: '2023-W01', value: 5 },
      { week: '2023-W01', value: 3 },
      { week: '2023-W02', value: 30 },
    ]
  }

})
const formattedSeries = computed(() => [{
  name: 'Weekly Data',
  data: props.weeklyData.map(item => item.value)
}]);
const chartOptions = ref({
  chart: {
    height: 100,
    type: 'area',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  xaxis: {
    labels: { show: false },  
    axisTicks: { show: false }, 
    axisBorder: { show: false }, 
    categories: [] 
  },
  colors: props.colors,
  grid: { show: false },
  yaxis: { 
    show: false,
  },
  tooltip: { enabled: true },
});
</script>