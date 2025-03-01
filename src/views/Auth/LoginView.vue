<script setup>
import Feature from '@/components/Feature.vue';
import InputField from '@/components/forms/InputField.vue';
import { useLogin } from '@/stores/login';
import { onBeforeUnmount } from 'vue';

const store = useLogin();

onBeforeUnmount(store.resetForm);

</script>
<template>
    <div class="space-y-7">
        <h1 class="text-4xl md:text-5xl text-center md:text-start font-extrabold text-gray-900 leading-tight">
            Welcome <br/>
            <span class="text-blue-600">Back, Engineer!</span>
        </h1>
        <p class="text-base text-center md:text-start md:text-xl text-gray-600">
            Sign in to access your team's tasks, track progress, and collaborate seamlessly.
        </p>
        <form @submit.prevent="store.handleSubmit()" class="space-y-4 max-w-md">
            <InputField
                name="email"
                label="Work Email"
                type="email"
                placeholder="Enter your valid email"
                v-model="store.form.email"
                :errors="store.errors"
                :clientErrors="store.v$.email"
                @input="store.v$.email.$touch()"
                required
                />
            <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                v-model="store.form.password"
                :errors="store.errors"
                :clientErrors="store.v$.password"
                @input="store.v$.password.$touch()"
                required
                />
            <div class="flex justify-between items-center">
                <label class="flex items-center">
                    <input type="checkbox" class="mr-2">
                    <span class="text-gray-600">Remember me</span>
                </label>
                <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
                type="submit"
                :disabled="store.isActionDisabled"
                :class="{
                    'w-full text-white px-8 py-3 rounded-lg transition flex items-center justify-center space-x-2 gap-3': true,
                    'bg-blue-600 hover:bg-blue-700': ! store.isActionDisabled,
                    'bg-blue-300': store.isActionDisabled
            }">
                <IconSpinner name="white-spinner" v-show="store.loading" class="animate-spin h-5 w-5"/>
                <span>Sign In</span>
            </button>
        </form>
        <div class="text-center md:text-start">
            <p class="text-gray-600">Don't have an account? <RouterLink :to="{name: 'register'}" href="#" class="text-blue-600 hover:underline">Sign Up</RouterLink></p>
        </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-2xl p-8 hidden md:flex items-center justify-center">
        <Feature/>
    </div>
</template>