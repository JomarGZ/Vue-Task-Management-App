<script setup>
import {Icon} from '@iconify/vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { cleanHTML } from '@/composables/useUtil';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    startedDate: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    budget: {
        type: [Number, String],
        required: true
    },
    endDate: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    }
})
const readMore = ref(false);
const descriptionContainer = ref(null);
const needsToggle = ref(false);
const projectProgress = computed(() => props.progress ? `${props.progress}%` : '0%');
const timeline = computed(() => props.startedDate && props.endDate ? `${new Date(props.startedDate).toLocaleDateString('en-US',{month: 'long', day: 'numeric'})} - ${new Date(props.endDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}` : 'Not set')
const formattedStartedAt = computed(() => props.startedDate ? new Date(props.startedDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : 'Not Started')
const budgetInDollar = computed(() => props.budget ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Number(props.budget)) : '$ 0');
const checkDescriptionHeight = async () => {
  await nextTick();
  if (descriptionContainer.value) {
    needsToggle.value = descriptionContainer.value.scrollHeight > 240;
  }
};
const toggleReadMore = () => {
  readMore.value = !readMore.value;
};
watch(() => props.description, () => {
  checkDescriptionHeight();
});

onMounted(() => {
  checkDescriptionHeight();
  window.addEventListener('resize', checkDescriptionHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDescriptionHeight);
});
</script>
<template>
    <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-start">
            <div class="flex-col min-w-0"> <!-- Constrain max width -->
                <div class="flex items-center mb-3">
                    <!-- <span class="bg-status-active text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3 capitalize">{{ status }}</span> -->
                    <span class="text-gray-500 text-sm">Started: {{ formattedStartedAt }}</span>
                </div>
                <h2 class="text-2xl font-semibold text-gray-800 break-words capitalize"> 
                    {{ title }}
                </h2>
            </div>
        </div>
    </div>

    <!-- Project Metadata Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-gray-200">
        <div class="p-4 border-r border-gray-200">
            <div class="text-xs text-gray-500 font-medium mb-1">CLIENT</div>
            <div class="flex items-center">
                <div class="w-8 h-8 shrink-0 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <Icon icon="fluent-color:building-people-16" width="16" height="16" />
                </div>
                <span class="font-medium break-words min-w-0">{{ clientName }}</span>
            </div>
        </div>
        <div class="p-4 border-r border-gray-200">
            <div class="text-xs text-gray-500 font-medium mb-1">BUDGET</div>
            <div class="flex items-center">
                <i class="fas fa-dollar-sign text-gray-400 mr-2"></i>
                <span class="font-medium break-words min-w-0">{{ budgetInDollar }}</span>
            </div>
            
        </div>
        <div class="p-4 border-r border-gray-200">
            <div class="text-xs text-gray-500 font-medium mb-1">TIMELINE</div>
            <div class="flex items-center">
                <i class="far fa-calendar-alt text-gray-400 mr-2"></i>
                <span class="font-medium">{{ timeline }}</span>
            </div>
            <!-- <div class="text-xs text-gray-500 mt-1">12 weeks remaining</div> -->
        </div>
        <div class="p-4">
            <div class="text-xs text-gray-500 font-medium mb-1">PROGRESS</div>
            <div class="flex items-center">
                <i class="fas fa-tasks text-gray-400 mr-2"></i>
                <span class="font-medium">{{ projectProgress }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div class="bg-green-500 h-1.5 rounded-full" :style="`width: ${projectProgress}`"></div>
            </div>
        </div>
    </div>
 <div class="p-6 border-b border-gray-200 overflow-hidden">
    <h3 class="text-lg font-medium text-gray-800 mb-3">Project Description</h3>
    <div ref="descriptionContainer" class="relative" :class="{'max-h-60 overflow-hidden': !readMore && needsToggle}">
      <p class="text-gray-600 space-y-3 prose" v-html="cleanHTML(description)"></p>
    </div>
    <div v-if="needsToggle" class="mt-6 flex items-center justify-center">
      <button @click="toggleReadMore" class="flex items-center cursor-pointer text-gray-600 justify-center text-sm hover:text-blue-800 font-semibold">
        <span>{{ readMore ? 'Read Less' : 'Read More' }}</span>
        <Icon icon="ri:arrow-down-s-line" width="24" height="24" :class="{ 'transform rotate-180': readMore }" />
      </button>
    </div>
  </div>
</template>