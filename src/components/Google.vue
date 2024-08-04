<template>
    <div>
      <!-- Google Map Container -->
      <div v-if="mapUrl" class="map-container w-full 64 ">
        <iframe
          :src="mapUrl"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import config from '../../config';
  
  // Define default coordinates
  const DEFAULT_LATITUDE = 37.7749; // San Francisco latitude
  const DEFAULT_LONGITUDE = -122.4194; // San Francisco longitude
  
  // Define component props with default values
  const props = defineProps({
    latitude: {
      type: Number,
      default: DEFAULT_LATITUDE
    },
    longitude: {
      type: Number,
      default: DEFAULT_LONGITUDE
    }
  });
  
  // Compute the Google Maps Embed API URL
  const mapUrl = computed(() => {
    return `https://www.google.com/maps/embed/v1/place?key=${config.Googl_API_KEY}&q=${props.latitude},${props.longitude}`;
  });
  </script>
  
  <style scoped>
  .map-container {
    height: 500px;
    position: relative;
  }
  </style>
  