<template>
    <div>
      <label :for="name" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="isRequired" class="text-red-500">*</span>
      </label>
      <input
        :value="modelValue"
        @input="handleInput"
        type="date"
        :id="name"
        :name="name"
        :min="restrictToCurrentAndFutureDates ? minDate : null"
        :class="[
          'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        ]"
        :required="required"
      />
      <!-- Server-Side Validation Errors -->
      <ValidationError :errors="errors" :field="name" />
      <!-- Client-Side Validation Errors -->
      <div v-if="clientErrors?.$error" class="text-sm text-red-500 mt-1">
        <span v-for="error in clientErrors.$errors" :key="error.$message" class="block">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    restrictToCurrentAndFutureDates: {
      type: Boolean,
      default: false, // Make the restriction optional
    },
    errors: {
      type: Object,
      default: null,
    },
    clientErrors: {
      type: Object,
      default: null,
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // Get today's date in YYYY-MM-DD format (required for the `min` attribute)
  const minDate = computed(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  
  // Check if there are any errors (server-side or client-side)
  const hasError = computed(() => {
    return props.clientErrors?.$error || props.errors?.value?.[props.name]?.length > 0;
  });
  
  // Emit the updated value when the input changes
  const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
  };
  </script>