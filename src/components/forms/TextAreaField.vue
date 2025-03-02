<template>
    <div>
      <label :for="name" class="block text-sm font-medium text-gray-700">
        {{ label }} <span v-if="isRequired" class="text-red-500">*</span>
      </label>
      <textarea
        :id="name"
        :name="name"
        :rows="rows"
        :value="modelValue"
        @input="handleInput"
        :class="[
          'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        ]"
        :placeholder="placeholder"
        :required="required"
      ></textarea>
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
    isRequired: {
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
    rows: {
      type: Number,
      default: 4,
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