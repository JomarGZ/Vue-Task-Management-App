<script setup>
import { onMounted, ref } from 'vue'
import { useTasks } from '@/stores/tasks';

const store = useTasks();

onMounted(store.fetchStatuses)

</script>
<template>
    <div class="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-14 h-96 overflow-y-auto  ">
        <h2 class="text-2xl font-bold mb-6">Add Task</h2>
        <form @submit.prevent="store.handleSubmit" novalidate>
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
            v-model="store.form.deadline"
            class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
          <div class="mb-4">
            <label for="status" class="block text-gray-700 font-bold mb-2">Status</label>
            <select
              id="status"
              v-model="status"
              class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="category" class="block text-gray-700 font-bold mb-2">Category</label>
            <select
              id="category"
              class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="in-progress">Personal</option>
              <option value="completed">Work</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
