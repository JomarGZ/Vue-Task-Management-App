<script setup>
import UpdateAccount from '@/components/UpdateAccount.vue';
import { useAuth } from '@/stores/auth';
import { useChangePassword } from '@/stores/changePassword';
import { usePosition } from '@/stores/positionStore';
import { ErrorMessage, Field } from 'vee-validate';
import { computed, onBeforeUnmount, onMounted } from 'vue';

const changePassword = useChangePassword();
const positionStore = usePosition();
const auth = useAuth();


const isChangePasswordDisabled = computed(() => changePassword.isUpdatePasswordloading || changePassword.isEmptyFields);
onBeforeUnmount(() => {
  changePassword.resetForm();
})
onMounted(() => {
  positionStore.fetchUnpaginatedPositions();
})
</script>
<template>
    <nav class="mb-8 text-sm">
        <ol class="flex items-center space-x-2">
            <li><RouterLink :to="{ name: 'account.index'}" class="text-blue-600 hover:text-blue-800">Account</RouterLink></li>
            <li class="text-gray-500">/</li>
        </ol>
    </nav>
     <div class="flex-1 p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Account Settings</h2>

      <!-- Update Account Details Section -->
      <UpdateAccount/>

      <!-- Change Password Section -->
      <div class="mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>
          <form @submit.prevent="changePassword.handleUpdatePassword">
            <div class="mb-6">
            <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              v-model="changePassword.form.current_password"
              id="current-password"
              name="current-password"
              placeholder="Enter current password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ValidationError :errors="changePassword.errors" field="current_password"/>
          </div>

          <!-- New Password Field -->
          <div class="mb-6">
            <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              v-model="changePassword.form.password"
              id="new-password"
              name="new-password"
              placeholder="Enter new password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ValidationError :errors="changePassword.errors" field="password"/>
          </div>

          <!-- Confirm New Password Field -->
          <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="changePassword.form.password_confirmation"
              name="confirm-password"
              placeholder="Confirm new password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <!-- Change Password Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isChangePasswordDisabled"
              :class="[
                  'px-4 py-2 flex items-center justify-center gap-2  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  isChangePasswordDisabled ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              ]"
            >
              <IconSpinner name="white-spinner" v-if="changePassword.isUpdatePasswordloading"/>
                Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
</template>