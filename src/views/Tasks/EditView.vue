<script setup>
import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import { useTasks } from '@/stores/tasks';
import { useRoute } from 'vue-router';
import { useFormatters } from '@/composables/useFormatters';

const store = useTasks();
const route = useRoute();
onMounted(() => {
  store.fetchStatuses();
  store.fetchCategories();
})
onBeforeUnmount(store.resetForm);

watchEffect(async () => {
    store.getTask({ id: route.params.id }, true);
});
</script>
<template>
    <div class="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-14 h-96 overflow-y-auto  ">
        <h2 class="text-2xl font-bold mb-6">Add Task</h2>
        <form @submit.prevent="store.updateTask({ id: route.params.id })" novalidate>
          <div class="mb-4">
            <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              v-model="store.form.title"
              class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <ValidationError :errors="store.errors" field="title"/>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              v-model="store.form.description"
              class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            ></textarea>
            <ValidationError :errors="store.errors" field="description"/>
          </div>
          <div class="mb-4">
          <label for="deadline" class="block text-gray-700 font-bold mb-2">Deadline</label>
          <input
            type="date"
            id="deadline"
            v-model="store.form.deadline_at"
            class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
          <div class="mb-4">
            <label for="category" class="block text-gray-700 font-bold mb-2">Category</label>
            <select
              id="category"
              v-model="store.form.category_id"
              class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select a category</option>
              <option v-for="category in store?.categories?.value?.data" :key="category.id" :value="category.id">{{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}</option>
            </select>
            <ValidationError :errors="store.errors" field="category_id"/>
          </div>
          <div class="flex justify-end">
            <RouterLink
              :to="{ name: 'tasks.index' }"
              class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </RouterLink>
            <button
              type="submit"
              :disabled="store.loading"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <IconSpinner v-show="store.loading"/>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
