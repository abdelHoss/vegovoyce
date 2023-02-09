<template>
  <div class="reverse-container">
    <Navbar />
    <div class="child-container">
      <h1 style="font-size: 10rem">404</h1>
      <p class="va-h1">Its seems you are lost...</p>
      <p class="va-h3">{{ $route.path }} do not exist</p>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "NotFoundView",
  components: { Navbar, Footer },
};
</script>

<style scoped>
.child-container {
  color: #5a5dbe;
  height: 100%;
}
</style>