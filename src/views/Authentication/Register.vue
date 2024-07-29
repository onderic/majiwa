<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="userame" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="userame"
              id="userame"
              type="text"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
  
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
            Sign Up
          </button>
        </form>
  
        <div v-if="error" class="mt-4 text-red-600 text-center">
          {{ error }}
        </div>
  
        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-blue-600 hover:text-blue-700"
          >
            Already have an account? Login
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userame: '',
        role: 'admin',
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post('/api/users', {
            userame: this.userame,
            role: this.role,
            email: this.email,
            password: this.password,
          });
          console.log('User created:', response.data);
          this.clearForm();
          this.$router.push('/login');
        } catch (err) {
          console.error('Error:', err.response?.data || err.message);
          this.error = 'Failed to create user. Please try again.';
        }
      },
      clearForm() {
        this.userame = '';
        this.role = '';
        this.email = '';
        this.password = '';
        this.error = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  