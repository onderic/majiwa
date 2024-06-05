<template>
  <div class="flex flex-col items-center py-20 mb-10">
    <div v-if="!showHospitals">
      <h3 class="mb-10 lg:text-3xl text-sm font-medium text-gray-900">Select your symptoms to help us find the nearest medical centers that can assist you:</h3>
      <ul class="grid w-full  gap-6 md:grid-cols-3 ">
        <li v-for="symptom in symptoms" :key="symptom.id">
          <input 
            type="checkbox" 
            :id="'symptom-' + symptom.id" 
            :value="symptom.id" 
            v-model="selectedSymptoms" 
            class="hidden peer " 
          />
          <label 
            :for="'symptom-' + symptom.id" 
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">

          <svg class="mb-2 w-7 h-7 text-sky-500 mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.924 6.463l-2.425 4.042c-.165.275-.517.358-.79.193-.273-.164-.358-.517-.193-.79l2.425-4.042c.165-.275.517-.358.79-.193.273.164.358.517.193.79zm1.44 3.07l1.44 2.4c.164.274.08.627-.193.79-.272.165-.625.08-.79-.193l-1.44-2.4c-.164-.274-.08-.627.193-.79.273-.165.626-.08.79.193zM5.46 5.756c.274.165.358.517.193.79l-2.425 4.042c-.165.274-.516.358-.79.193-.274-.165-.358-.517-.193-.79l2.425-4.042c.165-.274.516-.358.79-.193zm-.64 3.77c.164.273.517.358.79.193.273-.165.358-.517.193-.79l-1.44-2.4c-.165-.273-.518-.358-.79-.193-.273.165-.358.518-.193.79l1.44 2.4zm3.785-5.54c.415 0 .75.335.75.75s-.335.75-.75.75-.75-.335-.75-.75.335-.75.75-.75zm7.95 6.75c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5zm-7.5 0c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5zm-7.95 0c.415 0 .75.336.75.75s-.335.75-.75.75-.75-.336-.75-.75.335-.75.75-.75zm3.605 7.5c-.414 0-.75-.336-.75-.75v-2.25c0-.414.336-.75.75-.75s.75.336.75.75v2.25c0 .414-.336.75-.75.75zm0-7.5c-.414 0-.75-.336-.75-.75v-1.5c0-.414.336-.75.75-.75s.75.336.75.75v1.5c0 .414-.336.75-.75.75zm7.95 7.5c-.414 0-.75-.336-.75-.75v-2.25c0-.414.336-.75.75-.75s.75.336.75.75v2.25c0 .414-.336.75-.75.75zm0-7.5c-.414 0-.75-.336-.75-.75v-1.5c0-.414.336-.75.75-.75s.75.336.75.75v1.5c0 .414-.336.75-.75.75zm5.25 15h-19c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h19c.414 0 .75.336.75.75s-.336.75-.75.75zm-6.75-8.25c.414 0 .75.336.75.75v3.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.75c0-.414.336-.75.75-.75zm-7.5 0c.414 0 .75.336.75.75v3.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.75c0-.414.336-.75.75-.75zm0-9c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75zm7.5 0c.414 0 .75.336.75.75s-.336.75-.75.75-.75-.336-.75-.75.336-.75.75-.75zm6.75 6.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5zm0-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5z"/>
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
    <div v-else class=" bg-white p-6 w-1/2 ">
      <h3 v-if="hospitals.length === 0 && showHospitals" class="text-lg font-semibold mb-4">No hospitals found matching selected symptoms.</h3>
      
      <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="hospital in hospitals" :key="hospital.id">
          <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-800">
            <a href="#">
              <img class="object-cover object-center w-full h-56" :src="hospital.imageURL || 'https://via.placeholder.com/400'" alt="Hospital Image">
            </a>
            <div class="p-6">
              <a :href="hospital.website || '#'">
                <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{{ hospital.name }}</h5>
              </a>
              <p class="text-gray-700 dark:text-gray-400">{{ hospital.address }}</p>
              <a :href="hospital.website || '#'" class="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium leading-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600">
                Read more
                <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div class="flex flex-row justify-between">
      <button @click="resetSelection" class="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 capitalize">Reset Selection</button>
      <button @click="goBack" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 capitalize">Go Back to Symptoms</button>
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
      showHospitals: false
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
    // Handle error if necessary
  }
},

    resetSelection() {
      this.selectedSymptoms = [];
      this.hospitals = [];
      this.showHospitals = false;
    },
    goBack() {
      this.showHospitals = false;
    }
  },
  mounted() {
    this.fetchSymptoms();
  }
};
</script>

<style scoped>
/* Additional styles if necessary */
</style>
