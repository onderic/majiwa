<template>
  <div>
  
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main>
      <Services />

      <!-- Testimonial Component -->
      <Testimonial />

    </main>

  </div>
</template>

<script>
import Header from '@/components/HeaderArea.vue'
import Testimonial from '@/components/Testimonial.vue'
import Services from '@/components/Services.vue'


export default {
  components: {
    Header,
    Testimonial,
    Services
  }
}
</script>

<style>
/* Home view page styles */
</style>
