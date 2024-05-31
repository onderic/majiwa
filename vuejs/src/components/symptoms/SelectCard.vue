<template>
    <div class="flex flex-col items-center py-20">
      <h3 class="mb-10 lg:text-3xl text-sm font-medium text-gray-900">Select your symptoms to help us find the nearest medical centers that can assist you:</h3>
      <ul class="grid w-3/4  gap-6 md:grid-cols-3 ">
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
      <button @click="submitSymptoms" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 w-3/4 capitalize ">Find nearest medical hubs</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        symptoms: [
          { id: 1, name: 'Fever' },
          { id: 2, name: 'Cough' },
          { id: 3, name: 'Headache' },
          { id: 4, name: 'Fatigue' },
          { id: 5, name: 'Sore Throat' },
          { id: 6, name: 'Runny Nose' },
          { id: 7, name: 'Muscle Pain' },
          { id: 8, name: 'Shortness of Breath' },
          { id: 9, name: 'Loss of Taste' },
          { id: 10, name: 'Loss of Smell' },
          { id: 11, name: 'Chills' },
          { id: 12, name: 'Nausea' },
         
          
        ],
        selectedSymptoms: []
      };
    },
    methods: {
      submitSymptoms() {
        console.log('Selected Symptoms:', this.selectedSymptoms);
        // Here you can make an API call to send the selected symptoms to the backend
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles if necessary */
  </style>
  