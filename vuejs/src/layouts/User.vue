<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <NavBar class="flex-shrink-0" />

    <!-- Main content area -->
    <div class="flex-grow">
      <router-view />
    </div>

    <!-- Footer -->
    <Footer class="flex-shrink-0" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Footer,
    NavBar,
  }
}
</script>
