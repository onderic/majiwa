<template>
  <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-16 mb-4">
    <!-- Check if hospital data is available -->
    <div v-if="hospital">
      <!-- Map Title -->
      <h2 class="text-2xl text-blue-400 font-bold mb-4">
        {{ hospital.name }}  Location
      </h2>

      <!-- Google Map -->
      <div class="map-container w-full h-64 mb-6">
        <GoogleMap :latitude="hospital.latitude" :longitude="hospital.longitude" />
      </div>

      <!-- Hospital Info -->
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Location</h3>
            <p class="text-lg">{{ hospital.location }}</p>
          </div>
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Name</h3>
            <p class="text-lg">{{ hospital.name }}</p>
          </div>
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Capacity</h3>
            <p class="text-lg">{{ hospital.capacity }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Beds Available</h3>
            <p class="text-lg">{{ hospital.bedsAvailable }}</p>
          </div>
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Level</h3>
            <p class="text-lg">{{ hospital.level }}</p>
          </div>
          <div class="bg-gray-100 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">Created At</h3>
            <p class="text-lg">{{ new Date(hospital.createdAt).toLocaleDateString() }}</p>
          </div>
        </div>
        <div class="bg-gray-100 rounded-lg shadow-md p-6 mt-6">
          <h3 class="text-xl font-semibold mb-2">Address</h3>
          <p class="text-lg">{{ hospital.address }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center text-lg text-gray-500">
      Loading hospital information...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import GoogleMap from '@/components/Google.vue'; // Make sure to use your actual path

const route = useRoute();
const hospitalId = ref(route.params.id);
const hospital = ref(null);

async function fetchHospitalData() {
  try {
    const response = await axios.get(`/api/hospitals/${hospitalId.value}`);
    hospital.value = response.data;
  } catch (error) {
    console.error('Error fetching hospital details:', error);
  }
}

onMounted(() => {
  fetchHospitalData();
});
</script>

<style scoped>
.map-container {
  height: 100%;
}
</style>
