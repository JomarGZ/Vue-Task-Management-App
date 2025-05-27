<template>
  <div>
    <div class="timeframe-switcher">
      <button 
        v-for="mode in ['Daily', 'Weekly', 'Monthly']" 
        type="button"
        :disabled="taskCompletionTrendStore.fetching"
        :key="mode"
        @click="changeTimeframe(mode)"
        :class="{ active: timeframe === mode }"
      >
        {{ mode }}
      </button>
    </div>
    <div style="height: 350px; width: 100%;">
      <apexchart
        ref="areaChart"
        height="100%"
        width="100%"
        :options="chartOptions"
        :series="taskCompletionTrendStore.series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { useTaskCompletionTrend } from '@/stores/tasksCompletionTrendStore';
import { ref, onMounted } from 'vue';

const taskCompletionTrendStore = useTaskCompletionTrend();
const areaChart =ref(null);
const timeframe = ref('Daily'); 

const chartOptions = ref({
  chart: { 
    type: 'area',
    zoom: { enabled: false },
    toolbar: { show: false } 
  },
  dataLabels: { 
    enabled: false 
  },
  colors: ['#4CAF50', '#FF9800'],
  stroke: { 
    curve: 'smooth',
    width: [3, 3] 
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
    }
  },
  xaxis: { 
    type: 'datetime',
    labels: {
      format: 'dd MMM',
      style: {
        colors: '#666',
        fontSize: '12px'
      }
    }
  },
  yaxis: { 
    min: 0,
    forceNiceScale: true,
    title: { 
      text: 'Tasks Completion vs. Targets',
      style: {
        color: '#666'
      }
    }
  },
  tooltip: {
    shared: true,
    x: {
      format: 'dd MMM yyyy'
    },
    y: {
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
});

const changeTimeframe = (mode) => {
  timeframe.value = mode;
  taskCompletionTrendStore.getTasksCompletionTrend(mode.toLowerCase());
  if (areaChart.value) {
    areaChart.value.updateSeries(taskCompletionTrendStore.series);
  }
}

onMounted(async() => {
  await taskCompletionTrendStore.getTasksCompletionTrend();
  chartOptions.value.xaxis.labels.format = 'dd MMM';
});
</script>

<style scoped>
.timeframe-switcher {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}
.timeframe-switcher button {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}
.timeframe-switcher button:hover {
  background: #f5f5f5;
}
.timeframe-switcher button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
</style>