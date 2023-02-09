<template>
  <div class="header-bg">
    <Navbar />
    <div class="about-header">
      <div class="about-caption">
        <p>
          Puzzled for tonight dinner or afternoon lunch? Also gotta make sure
          its all green, you're vegan right??
        </p>
      </div>
    </div>
    <div ref="about" class="header-bg about-container">
      <div class="row" style="width: 100%">
        <div class="flex md-6" style="width: 50%">
          <div class="about-intro-caption">
            <p
              class="animate__animated animate__fadeInDown"
              :class="{
                animate__fadeInDown: animateHome,
                invisible: !animateHome,
              }"
            >
              What is all this
            </p>
            <div
              class="animate__delay-1s intro-underline animate__animated"
              :class="{
                animate__bounceInLeft: animateHome,
                invisible: !animateHome,
              }"
            ></div>
          </div>
          <div
            class="about-article animate__delay-1s animate__animated"
            :class="{
              animate__bounceInLeft: animateHome,
              invisible: !animateHome,
            }"
          >
            <div class="mb-5">
              VegoVoyce is a one-stop-shop for all your vegan recipe needs. Our
              user-friendly service allows you to easily search and filter
              through our extensive database of delicious plant-based recipes.
              You can browse by category or use specific keywords to find the
              perfect dish for any occasion.
              <!-- VegoVoyce is a service that allows you to search for vegan recipes
              in our database and filter recipes by category or by specific keyword, it
              also organizes a weekly recipe schedule for breakfast, lunch,
              dinner and dessert -->
            </div>
            <div class="second-about-block">
              Plus, our weekly recipe schedule provides you with breakfast,
              lunch, dinner and dessert options for the week, so you'll never
              run out of meal ideas. Make your vegan journey even more
              delicious!
            </div>
          </div>
        </div>
        <div class="flex md-6">
          <img
            class="animate__delay-2s about-image animate__animated"
            :class="{ animate__bounceIn: animateHome, invisible: !animateHome }"
            src="../assets/images/vegetables_plate.png"
          />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "AboutView",
  components: { Navbar, Footer },
  data() {
    return {
      animateHome: false,
    };
  },
  mounted() {
    const { top } = this.$refs.about.getBoundingClientRect();
    window.addEventListener("scroll", () => {
      if (scrollY >= top / 2) {
        this.animateHome = true;
      }
    });
  },
};
</script>

<style scoped>
.about-image {
  width: 100%;
}

.child-container {
  padding-top: 10%;
}

.about-header {
  width: 100%;
  height: 100%;
  background-color: #4dbd8a;
}

.about-caption p {
  font-size: 5rem;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 15% 0 0 2%;
  width: 95%;
  color: #fff;
}

.about-container {
  padding-top: 5%;
}
.about-intro-caption {
  font-size: 2rem;
  letter-spacing: 3px;
  margin-left: 100px;
  font-weight: bolder;
}

.intro-underline {
  width: 250px;
  height: 8px;
  background: #5a5dbe;
  margin-top: 15px;
}

.invisible {
  visibility: hidden;
}

.about-article {
  margin: 35px 0 0 5%;
  font-size: 1.8rem;
  letter-spacing: 2px;
  word-spacing: 4px;
  text-align: left;
}

.second-about-block {
  margin-bottom: 10%;
}
</style>