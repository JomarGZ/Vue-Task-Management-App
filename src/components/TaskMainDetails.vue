<script setup>
import { cleanHTML } from '@/composables/useUtil';
import { getTaskPriorityByValue, getTaskStatusByValue, getTaskStatusOptions } from '@/constants/task';
import { Icon } from '@iconify/vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
    priority: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        default: ''
    },
    dueDate: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    }

})
const daysLeft = ref('');
const readMore = ref(false);
const descriptionContainer = ref(null);
const needsToggle = ref(false);
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

const statusConfig = computed(() => props.status?.trim().length > 0 ? getTaskStatusByValue(props.status) : {});
const priorityConfig = computed(() => props.priority?.trim().length > 0 ? getTaskPriorityByValue(props.priority) : {}) 
const startedDate = computed(() => props.startDate?.trim().length > 0 ? new Date(props.startDate).toLocaleDateString('en-US',{
    year: 'numeric', month: 'long', day: 'numeric'
}) : 'Not set')
const dueDate = computed(() => props.dueDate?.trim().length > 0 ? new Date(props.dueDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
}) : 'Not set')

const updateCountDown = (deadline) => {
    if (!deadline) return;
    const now = new Date();
    const diff = new Date(deadline) - now;
    daysLeft.value = diff > 0 ? `${Math.ceil(diff / (1000 * 60 * 60 * 24))} days left` : 'Expired';
}
watch(() => props.dueDate, updateCountDown);

const estimatedHours = computed(() => {
    if (!props.startDate?.trim() || !props.dueDate?.trim()) return 'No estimation';
    
    const start = new Date(props.startDate);
    const due = new Date(props.dueDate);
    const diff = due - start;
    
    if (diff <= 0) return 'No estimation';
    
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    return `${totalHours} ${totalHours !== 1 ? 'hours' : 'hour'}`;
});
onMounted(() => {
    updateCountDown(props.dueDate)
    const timer = setInterval(updateCountDown, 1000 * 60 * 60)
    onBeforeUnmount(() =>clearInterval(timer))
    checkDescriptionHeight();
     window.addEventListener('resize', checkDescriptionHeight);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDescriptionHeight);
});
</script>
<template>
    <div class="contents">
        <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <div class="flex items-center mb-2">
                        <span 
                            class="bg-priority-high text-xs font-medium px-2.5 py-0.5 rounded-full mr-3"
                            :class="priorityConfig.badgeClass"
                        >{{ priorityConfig.label }}</span>
                        <span 
                            class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                            :class="statusConfig.badgeClass"
                        >{{ statusConfig.label }}</span>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-800 capitalize">{{ title }}</h2>
                </div>
                <div class="relative">
                    <select class="block appearance-none bg-gray-50 cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                        <option value="" selected disabled>Select status</option>
                        <option 
                            v-for="status in getTaskStatusOptions()"
                            :key="status.value"
                            :value="status.value"
                        >
                           {{ status.label }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div class="bg-gray-100 p-3 rounded-lg">
                    <div class="text-xs text-gray-500 font-medium mb-1">START DATE</div>
                    <div class="flex items-center">
                        <Icon icon="flat-color-icons:calendar" width="20" height="20" class="mr-2"/>
                        <span class="font-medium">{{ startedDate }}</span>
                    </div>
                </div>
                <div class="bg-gray-100 p-3 rounded-lg">
                    <div class="text-xs text-gray-500 font-medium mb-1">DUE DATE</div>
                    <div class="flex items-center">
                        <Icon icon="flat-color-icons:calendar" width="20" height="20" class="mr-2"/>
                        <span class="font-medium">{{ dueDate }}</span>
                        <span v-if="daysLeft" class="ml-auto text-sm px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">{{ daysLeft }}</span>
                    </div>
                </div>
                <div class="bg-gray-100 p-3 rounded-lg">
                    <div class="text-xs text-gray-500 font-medium mb-1">ESTIMATED TIME</div>
                    <div class="flex items-center">
                        <Icon icon="mingcute:time-line" width="20" height="20" class="mr-2"/>
                        <span class="font-medium">{{ estimatedHours }}</span>
                        <span class="ml-auto text-sm text-gray-500">4h logged</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-medium text-gray-800">Description</h3>
            </div>
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
    </div>
</template>