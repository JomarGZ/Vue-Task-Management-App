<script setup>
import { onBeforeUnmount } from 'vue';
import { useRegister } from '@/stores/register';

const store = useRegister();
onBeforeUnmount(store.resetForm);

</script>
<template>
    <div class="flex justify-center items-center h-screen bg-gray-100 ">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-32">
            <h2 class="text-2xl font-bold mb-6">Register</h2>
            <form @submit.prevent="store.handleSubmit" novalidate>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        v-model="store.form.name"
                        class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <ValidationError :errors="store.errors" field="name"/>
                </div>
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
                <div class="mb-4">
                    <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        v-model="store.form.password_confirmation"
                        class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    :disabled="store.loading"
                    class="bg-blue-500 flex align-middle hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                    <IconSpinner v-show="store.loading"/>
                    Register
                </button>
            </form>
        </div>
    </div>
</template>