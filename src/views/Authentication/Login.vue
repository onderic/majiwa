<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>

      <div v-if="error" class="mt-4 text-red-600 text-center">
        {{ error }}
      </div>

      <div class="mt-6 text-center">
        <router-link
          to="/register"
          class="text-blue-600 hover:text-blue-700"
        >
          Don't have an account? Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();
const error = ref(null);

const login = async () => {
  error.value = null;
  try {
    const response = await axios.post("/api/login", {
      email: email.value,
      password: password.value,
    });

    const { data } = response;
    authStore.setUser(data);

    switch (data.role) {
      case "admin":
        router.push({ name: "addSymptom" });
        break;
      case "supervisor":
        router.push({ name: "home" });
        break;
      default:
        console.error("Unknown role");
        error.value = "Unknown role. Please contact support.";
        break;
    }

    console.log("Login successful:", data);
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      console.error("Error logging in:", err.response.data.error);
      error.value = err.response.data.error;
    } else {
      console.error("Error logging in:", err.message);
      error.value = "An error occurred. Please try again.";
    }
  }
};
</script>
