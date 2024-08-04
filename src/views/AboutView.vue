<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <!-- Google Map -->
    <div id="map" class="w-full h-80 rounded-lg shadow-md mb-6"></div>
    
    <div v-if="hospital" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-3xl font-bold mb-4">{{ hospital.name }}</h2>
      <p class="text-lg mb-2"><strong>Location:</strong> {{ hospital.location }}</p>
      <p class="text-lg mb-2"><strong>Address:</strong> {{ hospital.address }}</p>
      <p class="text-lg mb-2"><strong>Capacity:</strong> {{ hospital.capacity }}</p>
      <p class="text-lg mb-2"><strong>Beds Available:</strong> {{ hospital.bedsAvailable }}</p>
      <p class="text-lg mb-2"><strong>Level:</strong> {{ hospital.level }}</p>
      <p class="text-lg mb-2"><strong>Created At:</strong> {{ new Date(hospital.createdAt).toLocaleDateString() }}</p>
      <p class="text-lg mb-4"><strong>Updated At:</strong> {{ new Date(hospital.updatedAt).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospital: null
    };
  },
  async mounted() {
    const hospitalId = this.$route.params.id;
    try {
      const response = await this.$axios.get(`/api/hospitals/${hospitalId}`);
      this.hospital = response.data;
    
    } catch (error) {
      console.error('Error fetching hospital details:', error);
    }
  },
  methods: {
    initializeMap() {
      if (!this.hospital || !this.hospital.latitude || !this.hospital.longitude) return;

      const mapOptions = {
        center: { lat: this.hospital.latitude, lng: this.hospital.longitude },
        zoom: 15,
        mapTypeId: 'roadmap'
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);

      new google.maps.Marker({
        position: { lat: this.hospital.latitude, lng: this.hospital.longitude },
        map: map,
        title: this.hospital.name
      });
    }
  }
};
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
</style>
