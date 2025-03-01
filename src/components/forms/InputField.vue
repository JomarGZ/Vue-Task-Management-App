<template>
    <div>
      <label :for="name" class="block text-gray-700 mb-2">{{ label }}</label>
      <input
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        :class="[
          'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2',
          hasError ? 'ring-red-500 border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
        ]"
        :required="required"
      />
      <!-- Server-Side Validation Errors -->
      <ValidationError
        v-if="errors"
        :errors="errors"
        :field="name"
      />
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
import ValidationError from '../ValidationError.vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
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
  
  const emit = defineEmits(['update:modelValue', 'input']);
  
  const hasError = computed(() => {
    return props.clientErrors?.$error || props.errors?.value?.[props.name]?.length > 0;
  });
  
  const handleInput = (event) => {
    emit('update:modelValue', event.target.value); 
    emit('input', event); 
  };
  </script>