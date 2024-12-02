<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useProfile } from "@/stores/profile";
import { useChangePassword } from "@/stores/changePassword";
const storeUpdateProfile = useProfile();
const storeUpdatePassword = useChangePassword();

onMounted(storeUpdateProfile.fetchProfile);
onBeforeUnmount(() => {
    storeUpdateProfile.resetForm()
    storeUpdatePassword.resetForm();
});

</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Profile Settings</h1>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
        <div class="text-green-700 bg-green-50 mb-4 py-2 px-1 border-gray-950 rounded-md" v-show="storeUpdateProfile.status">
            {{ storeUpdateProfile.status }}
        </div>
        <div class="space-y-4">
            <form @submit.prevent="storeUpdateProfile.updateProfile" novalidate>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                    </label>
                    <input 
                    v-model="storeUpdateProfile.form.name"
                    type="text" 
                    id="name"
                    :disabled="storeUpdateProfile.loading"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{'border-red-500': storeUpdateProfile.errors.name}"
                    />
                   <ValidationError :errors="storeUpdateProfile.errors" field="name"/>
                </div>
                
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                    </label>
                    <input 
                    v-model="storeUpdateProfile.form.email"
                    type="email" 
                    id="email"
                    :disabled="storeUpdateProfile.loading"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{'border-red-500': storeUpdateProfile.errors.email}"
                    />
                    <ValidationError :errors="storeUpdateProfile.errors" field="email"/>
                </div>
                
                <button 
                    type="submit"
                    :disabled="storeUpdateProfile.loading"
                    class="w-full bg-blue-500 text-white py-2 mt-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    <IconSpinner v-show="storeUpdateProfile.loading"/>
                    Save Personal Info
                </button>
            </form>
        </div>
      </div>

      <div class="border-t pt-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Change Password</h2>
        <div class="text-green-700 bg-green-50 mb-4 py-2 px-1 border-gray-950 rounded-md" v-show="storeUpdatePassword.status">
            {{ storeUpdatePassword.status }}
        </div>
        <div class="space-y-4">
            <form @submit.prevent="storeUpdatePassword.updatePassword">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="current_password">
                    Current Password
                    </label>
                    <input 
                    v-model="storeUpdatePassword.form.current_password"
                    type="password" 
                    id="current_password"
                    :disabled="storeUpdatePassword.loading"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{'border-red-500': storeUpdatePassword.errors.current_password}"
                    />
                    <ValidationError :errors="storeUpdatePassword.errors" field="current_password"/>
                </div>
                
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    New Password
                    </label>
                    <input 
                    type="password" 
                    id="password"
                    :disabled="storeUpdatePassword.loading"
                    v-model="storeUpdatePassword.form.password"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{'border-red-500': storeUpdatePassword.errors.password}"
                    />
                    <ValidationError :errors="storeUpdatePassword.errors" field="password"/>
                </div>
                
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">
                    Confirm New Password
                    </label>    
                    <input 
                    v-model="storeUpdatePassword.form.password_confirmation"  
                    type="password" 
                    :disabled="storeUpdatePassword.loading"
                    id="password_confirmation"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <button 
                    type="submit"
                    :disabled="storeUpdatePassword.loading"
                    class="w-full bg-green-500 mt-3 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    <IconSpinner v-show="storeUpdatePassword.loading"/>
                    Change Password
                </button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>