<script setup>
import BaseButton from '@/components/forms/BaseButton.vue';
import InputField from '@/components/forms/InputField.vue';
import { useMemberStore } from '@/stores/memberStore';
import { onBeforeUnmount } from 'vue';

const store = useMemberStore();

onBeforeUnmount(store.resetForm)
</script>
<template>
       <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Create New Team Member</h1>
            <p class="mt-2 text-gray-600">Add a new member to your team with their details and permissions.</p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent="store.handleSubmit()" class="space-y-6">
                <!-- Personal Information Section -->
                <div class="space-y-4">
                    <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
                    
                    <InputField 
                        name="name"
                        type="text"
                        label="Full Name"
                        placeholder="Enter name"
                        v-model="store.form.name"
                        :errors="store.errors"
                        :clientErrors="store.v$.name"
                        @input="store.v$.name.$touch()"
                        required
                        />

                    <!-- Email -->
                    <InputField 
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter email address"
                        v-model="store.form.email"
                        :errors="store.errors"
                        :clientErrors="store.v$.email"
                        @input="store.v$.email.$touch()"
                        required
                        />
                    <!-- Phone -->
                    <!-- <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" name="phone"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div> -->
                </div>

                <!-- Role & Access Section -->
                <div class="space-y-4 pt-4 border-t">
                    <!-- <h2 class="text-lg font-medium text-gray-900">Role & Access</h2> -->
                    <div class="bg-yellow-50 border p-2 rounded-md">
                        <h2 class="font-bold">The login credentials will be sent to the user's email.</h2>
                        <p><strong>For demonstration purposes:</strong></p>
                        <p>If you don't have another email, you can use your existing Gmail address with a <code>+anyword</code> suffix. Gmail will still deliver the email to your original inbox.</p>
                        <p><strong>Example:</strong> <code>johndoe+test@example.com</code></p>
                    </div>

              
                    <!-- Role -->
                    <div>
                        <!-- <label for="role" class="block text-sm font-medium text-gray-700">Role</label> -->
                        <!-- <select

                            id="role" 
                            name="role" 
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="member">Member</option>
                        </select> -->
                    </div>

                    <!-- Department -->
                    <div>
                        <!-- <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
                        <select id="department" name="department" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select a department</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="product">Product</option>
                            <option value="marketing">Marketing</option>
                        </select> -->
                    </div>

                    <!-- Access Level -->
                    <div>
                        <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Access Permissions</label>
                        <div class="space-y-2">
                            <div class="flex items-center">
                                <input type="checkbox" id="access_dashboard" name="permissions[]" value="dashboard"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="access_dashboard" class="ml-2 text-sm text-gray-700">Dashboard Access</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="access_reports" name="permissions[]" value="reports"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="access_reports" class="ml-2 text-sm text-gray-700">Reports Access</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="access_admin" name="permissions[]" value="admin"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="access_admin" class="ml-2 text-sm text-gray-700">Admin Panel Access</label>
                            </div>
                        </div> -->
                    </div>
                </div>

                <!-- Additional Settings -->
                <div class="space-y-4 pt-4 border-t">
                    <!-- <h2 class="text-lg font-medium text-gray-900">Additional Settings</h2> -->

                    <!-- Status -->
                    <!-- <div class="flex items-center space-x-4">
                        <label class="block text-sm font-medium text-gray-700">Status</label>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <input type="radio" id="status_active" name="status" value="active" checked
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                <label for="status_active" class="ml-2 text-sm text-gray-700">Active</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="status_inactive" name="status" value="inactive"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                <label for="status_inactive" class="ml-2 text-sm text-gray-700">Inactive</label>
                            </div>
                        </div>
                    </div> -->

                    <!-- Send Welcome Email -->
                    <div class="flex items-center">
                        <!-- <input type="checkbox" id="send_welcome" name="send_welcome" checked
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="send_welcome" class="ml-2 text-sm text-gray-700">Send welcome email with login credentials</label> -->
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 pt-6 border-t">
                    <RouterLink :to="{name: 'members.index'}" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </RouterLink>
                   <BaseButton
                        :isActionDisabled="store.isActionDisabled"
                        type="submit"
                        :isLoading="store.loading"
                   >
                        Add Member
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>