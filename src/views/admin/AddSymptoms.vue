<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200">
      <div class="p-4">
        <a href="/" class="text-lg font-semibold mb-4">Admin Panel</a>
        <ul class="space-y-2">
         
          <li><router-link to="/admin/add/symptoms" class="block p-2 text-gray-700 hover:bg-gray-200 rounded">Symptoms</router-link></li>
          <li><router-link to="/admin/add/hospitals" class="block p-2 text-gray-700 hover:bg-gray-200 rounded">Hospitals</router-link></li>
        
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-6">
  
      <nav class="bg-white border-b border-gray-200 mb-4">
        <div class="container mx-auto flex justify-between items-center p-4">
          <h1 class="text-2xl font-bold">Add Symptom</h1>
          <button @click="logout" class="text-blue-500 hover:underline">Logout</button>
        </div>
      </nav>

      <!-- Content -->
      <div class="container mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div class="flex items-center justify-start gap-4 mb-4">
          <router-link to="/admin/add/hospitals" class="text-blue-500 hover:underline">Hospitals</router-link>
          /
          <router-link to="/admin/add/symptoms" class="text-blue-500 hover:underline">Symptoms</router-link>
        </div>

        <form @submit.prevent="addSymptom">
          <div class="mb-4">
            <label for="symptom" class="block text-sm font-medium text-gray-700">Symptom</label>
            <input
              type="text"
              id="symptom"
              v-model="newSymptom"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Symptom
          </button>
        </form>

        <h2 class="text-2xl font-bold mt-8 mb-4">Symptoms List</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Name</th>
              <th class="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="symptom in symptoms" :key="symptom.id">
              <td class="border border-gray-300 px-4 py-2">{{ symptom.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ symptom.name }}</td>
              <td class="border border-gray-300 px-4 py-2 flex justify-end">
                <button @click="editSymptom(symptom)" class="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                <button @click="deleteSymptom(symptom.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const symptoms = ref([]);
const newSymptom = ref('');
const router = useRouter();
const authStore = useAuthStore();

const fetchSymptoms = async () => {
  try {
    const response = await axios.get('/api/symptoms');
    symptoms.value = response.data;
  } catch (error) {
    console.error('Error fetching symptoms:', error);
  }
};

const addSymptom = async () => {
  try {
    const response = await axios.post('/api/symptoms', { name: newSymptom.value });
    symptoms.value.push(response.data);
    newSymptom.value = '';
  } catch (error) {
    console.error('Error adding symptom:', error);
  }
};

const editSymptom = (symptom) => {
  console.log('Edit:', symptom);
};

const deleteSymptom = async (symptomId) => {
  try {
    await axios.delete(`/api/symptoms/${symptomId}`);
    symptoms.value = symptoms.value.filter(symptom => symptom.id !== symptomId);
  } catch (error) {
    console.error('Error deleting symptom:', error);
  }
};

const logout = () => {
  authStore.logout(); 
  router.push('/'); 
};

fetchSymptoms();
</script>

<style>
/* Add custom styles if needed */
</style>
