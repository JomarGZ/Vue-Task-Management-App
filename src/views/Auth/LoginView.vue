<template>
      <div class="flex justify-center items-center h-screen bg-gray-100 ">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md -mt-16">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <form @submit.prevent="register">
            <div class="mb-4">
            <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
            <input
                type="email"
                id="email"
                v-model="email"
                class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            </div>
            <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
            <input
                type="password"
                id="password"
                v-model="password"
                class="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            </div>
          
            <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
            Register
            </button>
        </form>
        </div>
    </div>
</template>