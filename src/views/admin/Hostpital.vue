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
      <!-- Top Navigation -->
      <nav class="bg-white border-b border-gray-200 mb-4">
        <div class="container mx-auto flex justify-between items-center p-4">
          <h1 class="text-2xl font-bold">Manage Hospitals</h1>
          <button @click="logout" class="text-blue-500 hover:underline">Logout</button>
        </div>
      </nav>

      <!-- Navigation section -->
      <div class="flex items-center justify-start gap-4 mb-4">
        <router-link to="/admin/add/hospitals" class="text-blue-500 hover:underline">Hospitals</router-link>
        /
        <router-link to="/admin/add/symptoms" class="text-blue-500 hover:underline">Symptoms</router-link>
      </div>

      <!-- Hospitals table -->
      <table class="table-auto w-full mb-4 bg-white shadow-md rounded-md">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Location</th>
            <th class="px-4 py-2">Address</th>
            <th class="px-4 py-2">Capacity</th>
            <th class="px-4 py-2">Symptoms</th>
            <th class="px-4 py-2">Level</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital.id">
            <td class="border px-4 py-2">{{ hospital.name }}</td>
            <td class="border px-4 py-2">{{ hospital.location }}</td>
            <td class="border px-4 py-2">{{ hospital.address }}</td>
            <td class="border px-4 py-2">{{ hospital.capacity }}</td>
            <td class="border px-4 py-2">
              <ul>
                <li v-for="symptom in hospital.Symptoms" :key="symptom.id">{{ symptom.name }}</li>
              </ul>
            </td>
            <td class="border px-4 py-2">{{ hospital.level }}</td>
            <td class="border px-4 py-2">
              <button @click="editHospital(hospital)" class="px-2 py-1 bg-blue-500 text-white rounded-md">Edit</button>
              <button @click="deleteHospital(hospital.id)" class="px-2 py-1 bg-red-500 text-white rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Form for adding/editing hospitals -->
      <form v-if="showForm" @submit.prevent="submitHospital" class="bg-white p-4 shadow-md mb-4 rounded-md">
        <input v-model="hospital.name" placeholder="Hospital Name" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
        <input v-model="hospital.location" placeholder="Hospital Location" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
        <input v-model="hospital.address" placeholder="Hospital Address" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
        <input v-model.number="hospital.capacity" type="number" placeholder="Capacity" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
        <input v-model.number="hospital.bedsAvailable" type="number" placeholder="Beds Available" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
        <select v-model="hospital.level" required class="block w-full p-2 border border-gray-300 rounded-md mb-2">
          <option disabled value="">Select Level</option>
          <option value="Level2">Level 2</option>
          <option value="Level3">Level 3</option>
          <option value="Level4">Level 4</option>
          <option value="Level5">Level 5</option>
          <option value="Level6">Level 6</option>
        </select>
        <div class="mb-2">
          <p class="font-bold mb-1">Select Symptoms:</p>
          <div class="flex flex-wrap">
            <div v-for="symptom in symptoms" :key="symptom.id" class="flex items-center mr-4 mb-2">
              <input type="checkbox" :id="'symptom_' + symptom.id" v-model="hospital.symptoms" :value="symptom.id" class="mr-2">
              <label :for="'symptom_' + symptom.id" class="mr-2">{{ symptom.name }}</label>
            </div>
          </div>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Save</button>
        <button @click="cancelForm" class="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
      </form>

      <!-- Button to toggle add/edit form -->
      <button @click="toggleForm" class="px-4 py-2 bg-green-500 text-white rounded-md">Add Hospital</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hospitals: [],
      hospital: {
        name: '',
        location: '',
        address: '',
        symptoms: [] 
      },
      showForm: false,
      symptoms: []
    };
  },
  methods: {
    async fetchHospitals() {
      try {
        const hospitalsResponse = await axios.get('/api/hospitals');
        this.hospitals = hospitalsResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchSymptoms() {
      try {
        const response = await axios.get('/api/symptoms');
        this.symptoms = response.data;
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    },
    async submitHospital() {
      try {
        const payload = {
          name: this.hospital.name,
          location: this.hospital.location,
          address: this.hospital.address,
          capacity: this.hospital.capacity, 
          bedsAvailable: this.hospital.bedsAvailable,
          level: this.hospital.level,
          symptoms: this.hospital.symptoms.map(symptomId => Number(symptomId))
        };

        if (this.hospital.id) {
          // Update existing hospital
          await axios.put(`/api/hospitals/${this.hospital.id}`, payload);
        } else {
          // Add new hospital
          await axios.post('/api/hospitals', payload);
        }
        this.showForm = false;
        this.fetchHospitals();
      } catch (error) {
        console.error('Error saving hospital:', error);
      }
    },
    async deleteHospital(id) {
      try {
        await axios.delete(`/api/delete/hospital/${id}`);
        this.fetchHospitals();
      } catch (error) {
        console.error('Error deleting hospital:', error);
      }
    },
    editHospital(hospital) {
      this.hospital = { ...hospital };
      // Pre-select symptoms for editing hospital
      this.hospital.symptoms = this.hospitals.find(h => h.id === hospital.id)?.symptoms.map(s => s.id) || [];
      this.showForm = true;
    },
    cancelForm() {
      this.showForm = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.hospital = {
          name: '',
          location: '',
          symptoms: []
        };
      }
    },
    logout() {
      // Implement your logout logic here
      console.log('Logging out');
    }
  },
  mounted() {
    this.fetchHospitals();
    this.fetchSymptoms();
  }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
