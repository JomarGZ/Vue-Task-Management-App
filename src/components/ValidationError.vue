<script setup>
import { computed } from 'vue';

const props = defineProps(["errors", "field", "clientErrors"]);

const hasErrors = computed(() => {
  return (
    (props.errors?.value?.[props.field]?.length > 0) ||
    (props.clientErrors?.$error)
  );
});

const errorMessages = computed(() => {
  const messages = [];
  if (props.errors?.value?.[props.field]?.length > 0) {
    messages.push(...props.errors.value[props.field]);
  }
  if (props.clientErrors?.$error) {
    for (const rule in props.clientErrors) {
      if (props.clientErrors[rule]?.$invalid) {
        messages.push(props.clientErrors[rule].$message);
      }
    }
  }
  return messages;
});
</script>

<template>
  <ul v-if="hasErrors" class="flex flex-col text-red-600 gap-1">
    <li v-for="message in errorMessages" :key="message">
      {{ message }}
    </li>
  </ul>
</template>