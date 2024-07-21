<template>
  <div class="flex flex-col items-center py-20 mb-10">
    <!-- Symptoms Selection -->
    <div v-if="!showHospitals">
      <h3 class="mb-10 lg:text-3xl text-sm font-medium text-gray-900 font-serif">Select your symptoms to help us find the nearest medical centers that can assist you:</h3>
      <ul class="grid w-full gap-6 md:grid-cols-3">
        <li v-for="symptom in symptoms" :key="symptom.id">
          <input 
            type="checkbox" 
            :id="'symptom-' + symptom.id" 
            :value="symptom.id" 
            v-model="selectedSymptoms" 
            class="hidden peer" 
          />
          <label 
            :for="'symptom-' + symptom.id" 
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">
              <svg class="mb-2 w-7 h-7 text-sky-500 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <!-- SVG Path here -->
              </svg>
              <div class="w-full text-lg font-semibold">{{ symptom.name }}</div>
              <div class="w-full text-sm">Symptom</div>
            </div>
          </label>
        </li>
      </ul>
      <div class="flex flex-row justify-between">
        <button @click="submitSymptoms" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 capitalize">Find nearest medical hubs</button>
        <button v-if="selectedSymptoms.length > 0" @click="resetSelection" class="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 capitalize">Reset Selection</button>
      </div>
    </div>

  
    <!-- Hospitals List -->
  <div v-else class="bg-white p-16 shadow-md w-full max-w-6xl  mx-auto">
    <div v-if="hospitals.length === 0 && showHospitals" class="h-96 flex items-center justify-center">
      <h3  class="text-3xl font-semibold mb-4  capitalize font-serif text-gray-700">No hospitals found matching selected symptoms.</h3>
    </div>
    <div v-else>
      <h1 class="flex items-center justify-center mb-5 font-semibold text-3xl capitalize font-serif text-gray-700">We found this health center near you</h1>
      <!-- Conditional Grid Layout -->
      <div v-if="hospitals.length > 1" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="hospital in hospitals" :key="hospital.id" class="flex flex-col">
          <div class="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 flex flex-col">
            <a :href="hospital.website || '#'">
              <img class="object-cover object-center w-full h-48 sm:h-56 md:h-64 lg:h-72" src="@/assets/hs.jpg" alt="Hospital Image">
            </a>
            <div class="p-6 flex flex-col flex-grow">
              <a :href="hospital.website || '#'">
                <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white truncate">{{ hospital.name }}</h5>
              </a>
              <p class="text-gray-700 dark:text-gray-400 truncate">Address: {{ hospital.address }}</p>
              <button @click="openModal(hospital)" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Details</button>
            </div>
          </div>
        </li>
      </div>
      <div v-else class="flex justify-center">
        <div class="flex flex-col">
          <div class="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 flex flex-col">
            <a :href="hospitals[0].website || '#'">
              <img class="object-cover object-center w-full h-48 sm:h-56 md:h-64 lg:h-72" src="@/assets/hs.jpg" alt="Hospital Image">
            </a>
            <div class="p-6 flex flex-col flex-grow">
              <a :href="hospitals[0].website || '#'">
                <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white truncate">{{ hospitals[0].name }}</h5>
              </a>
              <p class="text-gray-700 dark:text-gray-400 truncate">Address: {{ hospitals[0].address }}</p>
              <button @click="openModal(hospitals[0])" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
      <button @click="resetSelection" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 capitalize">Reset Selection</button>
      <button @click="goBack" class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 capitalize">Go Back to Symptoms</button>
    </div>
  </div>


    <!-- Modal Component -->
    <div v-if="isModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg max-w-4xl mx-4 p-6 w-full h-1/2 relative">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="flex flex-col lg:flex-row h-full">
          <img  src="@/assets/hs.jpg" alt="Hospital Image" class="w-full lg:w-1/3 object-cover rounded-lg">
          <div class="lg:ml-6 lg:w-2/3 mt-4 lg:mt-0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white capitalize">{{ selectedHospital.name }}</h2>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Location:</strong> {{ selectedHospital.location }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2"><strong>Address:</strong> {{ selectedHospital.address }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Capacity:</strong> {{ selectedHospital.capacity }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Beds Available:</strong> {{ selectedHospital.bedsAvailable }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Level:</strong> {{ selectedHospital.level }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Created At:</strong> {{ new Date(selectedHospital.createdAt).toLocaleDateString() }}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-2 capitalize"><strong>Updated At:</strong> {{ new Date(selectedHospital.updatedAt).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symptoms: [],
      selectedSymptoms: [],
      hospitals: [],
      showHospitals: false,
      selectedHospital: null,
      isModalVisible: false
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
    async submitSymptoms() {
      if (this.selectedSymptoms.length === 0) {
        window.alert('Please select at least one symptom.');
        return;
      }
      try {
        const response = await this.$axios.post('/api/find-hospitals', {
          symptoms: this.selectedSymptoms
        });
        this.hospitals = response.data;
        this.showHospitals = true;
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    },
    resetSelection() {
      this.selectedSymptoms = [];
      this.hospitals = [];
      this.showHospitals = false;
    },
    goBack() {
      this.resetSelection();
    },
    openModal(hospital) {
      this.selectedHospital = hospital;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedHospital = null;
    }
  },
  mounted() {
    this.fetchSymptoms();
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
