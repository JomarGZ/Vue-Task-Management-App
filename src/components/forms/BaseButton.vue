<template>
    <button 
        :disabled="isActionDisabled" 
        :type="type" 
        :class="buttonClasses"
        :aria-disabled="isActionDisabled"
        aria-label="Submit"
    >
        <IconSpinner name="white-spinner" v-if="isLoading"/>
        <slot></slot>
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    isActionDisabled: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        default: 'button'
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const buttonClasses = computed(() => ({
    'px-6 py-3 flex items-center justify-center gap-2 text-white rounded-lg font-medium': true,
    'hover:bg-indigo-700 bg-indigo-600': !props.isActionDisabled,
    'bg-indigo-300': props.isActionDisabled
}));
</script>