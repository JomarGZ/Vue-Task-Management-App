<script setup>
import { computed, onBeforeUnmount } from 'vue';
import { useRegister } from '@/stores/register';
import InputField from '@/components/forms/InputField.vue';
import Feature from '@/components/Feature.vue';
const store = useRegister();
const isActionDisabled = computed(() => store.loading || store.v$.$invalid);

onBeforeUnmount(store.resetForm);
</script>
<template>
        <div class="space-y-7">
            <h1 class="text-5xl font-extrabold text-gray-900 leading-tight">
                Join <br/>
                <span class="text-blue-600">SprintSync Today</span>
            </h1>
            <p class="text-xl text-gray-600">
                Create your account and transform how your engineering team collaborates and delivers.
            </p>
            <form @submit.prevent="store.handleSubmit()" class="space-y-4 max-w-md">
                <InputField
                    name="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    v-model="store.form.name"
                    :errors="store.errors"
                    :clientErrors="store.v$.name"
                    @input="store.v$.name.$touch()"
                    required
                    />
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
                <InputField
                    name="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your password"
                    v-model="store.form.password_confirmation"
                    :errors="store.errors"
                    :clientErrors="store.v$.password_confirmation"
                    @input="store.v$.password_confirmation.$touch()"
                    required
                    />
                <div>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                </div>
                <button type="submit"
                    :disabled="isActionDisabled"
                    :class="{
                        'w-full text-white px-8 py-3 rounded-lg transition flex items-center justify-center space-x-2 gap-3': true,
                        'bg-blue-600 hover:bg-blue-700': ! isActionDisabled,
                        'bg-blue-300': isActionDisabled
                    }">
                    <IconSpinner name="white-spinner" v-show="store.loading" class="animate-spin h-5 w-5"/>
                    Create Account
                </button>
            </form>
            <div>
                <p class="text-gray-600">Already have an account? <RouterLink :to="{name: 'login'}" class="text-blue-600 hover:underline">Sign In</RouterLink></p>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center">
            <Feature/>
        </div>
</template>