<!-- PieChart.vue -->
<template>
    <div class="bg-gray-50 rounded-xl shadow-md p-2 flex items-center justify-center">
        <div ref="chartContainer" class="w-full h-60"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';
  import * as echarts from 'echarts';
  
  const props = defineProps({
    chartData: {
      type: Array,
      default: () => [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    },
    title: {
      type: String,
      default: 'Referer of a Website'
    },
    subtitle: {
      type: String,
      default: 'Fake Data'
    }
  });
  
  const chartContainer = ref(null);
  let chart = null;
  
  const getChartOption = () => {
    return {
      title: {
        text: props.title,
        subtext: props.subtitle,
        left: 'center',  
        top: 'bottom',   
        
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          data: props.chartData,
          label: {
            show: true,
            formatter: '{b}\n{c} ({d}%)'
          },
        }
      ]
    };
  };
  
  const initChart = () => {
    if (chartContainer.value) {
      chart = echarts.init(chartContainer.value);
      chart.setOption(getChartOption());
    }
  };
  
  const handleResize = () => {
    chart?.resize();
  };
  
  onMounted(() => {
    nextTick(() => {
      initChart();
      window.addEventListener('resize', handleResize);
    });
  });
  
  onUnmounted(() => {
    chart?.dispose();
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
