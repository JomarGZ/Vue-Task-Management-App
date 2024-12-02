<script setup>
import { useLogin } from '@/stores/login';
import { onBeforeUnmount } from 'vue';

const store = useLogin();

onBeforeUnmount(store.resetForm);

</script>
<template>
      <div class="flex justify-center items-center h-screen bg-gray-100 ">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md -mt-16">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <form @submit.prevent="store.handleSubmit" novalidate>
            <div class="mb-4">
            <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
            <input
                type="email"
                id="email"
                v-model="store.form.email"
                class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            <ValidationError :errors="store.errors" field="email"/>
            </div>
            <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
            <input
                type="password"
                id="password"
                v-model="store.form.password"
                class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            <ValidationError :errors="store.errors" field="password"/>
            </div>
            <div class="flex flex-col gap-2">
                <label class="flex gap-2 items-center hover:cursor-pointer">
                    <input
                        v-model="store.form.remember"
                        type="checkbox"
                        class="w-4 h-4"
                        :disabled="store.loading"
                    />
                        <span class="select-none">Remember me</span>
                </label>
            </div>
            <button
                type="submit"
                :disabled="store.loading"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
                <IconSpinner v-show="store.loading"/>
                Register
            </button>
        </form>
        </div>
    </div>
</template>