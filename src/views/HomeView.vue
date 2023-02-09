<template>
  <Header />
  <div class="home-bg">
    <div class="row">
      <div class="flex md8">
        <div class="glass-card">
          <h3 class="va-h3">
            We believe that eating vegan doesn't have to be bland or boring! Our
            mission is to provide you with a weekly schedule of delicious and
            creative vegan recipes that will make your taste buds sing. We know
            that eating a plant-based diet can be a challenge, but with our
            help, you'll be whipping up mouth-watering meals in no time. So,
            whether you're a committed vegan or just looking to add more veggies
            to your diet, join us on this delicious journey!
          </h3>
        </div>
      </div>
      <div class="flex md4">
        <img
          class="home-image"
          src="../assets/images/home-img.jpg"
          alt="Home page image"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "HomeView",
  components: { Header, Footer },
};
</script>

<style>
.home-bg {
  margin-top: 6%;
  width: 100%;
  height: 100vh;
  background-image: url(../assets/images/bg-header-reverse.png);
  background-size: cover;
}

.home-bg .row {
  margin-bottom: 5rem;
}

.home-image {
  width: 70%;
  border-radius: 40px;
}

.glass-card {
  width: 60%;
  text-align: right;
  padding: 30px;
  margin: -30px auto 0;
  background: rgba(242, 242, 242, 0.32);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
}
</style>