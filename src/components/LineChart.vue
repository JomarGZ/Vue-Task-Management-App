<template>
  <div class="w-full min-h-[100px]">
    <apexchart
      type="area"
      height="100%" 
      width="80%" 
      :options="chartOptions"
      :series="series"
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
  data: {
    type: Array,
    default: () => []
  },
  labels: {
    type: Array,
    default: () => []
  },
  name: {
    type: String,
    default: 'Tasks'
  }
})


const series = computed(() => [{
  name: props.name,
  data: props.data
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
    categories: props.labels
  },
  colors: props.colors,
  grid: { show: false },
  yaxis: { 
    show: false,
  },
  tooltip: { enabled: true },
});
</script>