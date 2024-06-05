<template>
    
    <div class="container mx-auto p-4 bg-white mt-20 shadow-lg">
        <div class="flex items-center justify-start gap-4 mb-4">
      <router-link to="/admin/add/hospitals" class="text-blue-500 hover:underline">Hospitals</router-link>
      /
      <router-link to="/admin/add/symptoms" class="text-blue-500 hover:underline">Symptoms</router-link>
    </div>
      <h1 class="text-2xl font-bold mb-4">Add Symptom</h1>
      <form @submit.prevent="addSymptom">
        <div class="mb-4">
          <label for="symptom" class="block text-sm font-medium text-gray-700">Symptom</label>
          <input type="text" id="symptom" v-model="newSymptom" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add Symptom</button>
      </form>
  
      <!-- Table to list symptoms -->
      <h2 class="text-2xl font-bold mt-8 mb-4">Symptoms List</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Name</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th> <!-- Add this column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="symptom in symptoms" :key="symptom.id">
            <td class="border border-gray-300 px-4 py-2">{{ symptom.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ symptom.name }}</td>
            <td class="border border-gray-300 px-4 py-2 flex justify-end ">
              <button @click="editSymptom(symptom)" class="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
              <button @click="deleteSymptom(symptom.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        symptoms: [],
        newSymptom: ''
      };
    },
    methods: {
      async fetchSymptoms() {
        try {
          const response = await this.$axios.get('/api/symptoms');
          this.symptoms = response.data;
        } catch (error) {
          console.error('Error fetching symptoms:', error);
        }
      },
      async addSymptom() {
        try {
          const response = await this.$axios.post('/api/symptoms', { name: this.newSymptom });
          this.symptoms.push(response.data);
          this.newSymptom = '';
        } catch (error) {
          console.error('Error adding symptom:', error);
        }
      },
      editSymptom(symptom) {
        // Implement edit functionality
        console.log('Edit:', symptom);
      },
      async deleteSymptom(symptomId) {
        try {
          await this.$axios.delete(`/api/symptoms/${symptomId}`);
          this.symptoms = this.symptoms.filter(symptom => symptom.id !== symptomId);
        } catch (error) {
          console.error('Error deleting symptom:', error);
        }
      }
    },
    mounted() {
      this.fetchSymptoms();
    }
  };
  </script>
  
  <style>
  /* Add custom styles here if needed */
  </style>
  