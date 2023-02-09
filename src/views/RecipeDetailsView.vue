<template>
  <div v-if="recipeObject.length" class="reverse-container">
    <div class="child-container">
      <Navbar />
      <div class="row justify-space-evenly mb-5">
        <div class="flex md6">
          <RecipeDetailsCard :recipe="recipe" />
        </div>
        <div class="flex md4">
          <va-image :src="recipe.image" :alt="recipe.name" />
          <p class="va-h3">{{ recipe.name }}</p>
        </div>
      </div>
      <div class="row justify-center mb-5">
        <div class="flex md8 mb-5">
          <va-card>
            <va-card-content class="description">
              <p class="va-h6">{{ recipe.description }}</p>
            </va-card-content>
          </va-card>
        </div>
        <div class="flex md8">
          <h3 class="va-h3">Recipe Instructions</h3>
        </div>
        <div class="flex md8">
          <div
            v-for="(instruction, index) in recipe.instructions"
            :key="instruction"
            class="step-card mb-5"
          >
            <div class="step-chip">Step {{ index + 1 }}</div>
            <div class="va-h6 instruction">
              {{ instruction }}
            </div>
          </div>
          <div v-if="recipe.tips.length" class="step-card">
            <div class="step-chip">Tips</div>
            <div class="ml-5">
              <ul class="va-unordered">
                <li v-for="tip in recipe.tips" :key="tip" class="mb-4">
                  <p class="va-h6">
                    {{ tip }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="recipe.video" class="video-container">
            <p class="va-h5 my-5">
              This video might help you to follow the recipe
            </p>
            <iframe
              class="recipe-video"
              :src="recipe.video"
              :title="recipe.name"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
  <div v-else-if="redirect404">
    <NotFoundView />
  </div>
  <div v-else>
    <ProgressCircle />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressCircle from "@/components/ProgressCircle";
import NotFoundView from "@/views/NotFoundView";
import RecipeDetailsCard from "@/components/RecipeDetailsCard";
import fetchData from "@/composables/fetchData";
export default {
  name: "RecipeDetailsView",
  props: ["id"],
  components: {
    Navbar,
    Footer,
    NotFoundView,
    ProgressCircle,
    RecipeDetailsCard,
  },
  data() {
    return {
      recipeObject: [],
      recipe: null,
      redirect404: false,
      recipeName: this.$route.params.name.replaceAll("-", ""),
    };
  },
  methods: {},
  mounted() {
    if (!isNaN(this.id)) {
      fetchData(this.id).then((data) => {
        if (data) {
          const fetchedName = data.name.replaceAll(/[- ]/g, "").toLowerCase();
          if (fetchedName === this.recipeName) {
            this.recipeObject.push(data);
            this.recipe = data;
          } else {
            this.redirect404 = true;
          }
        } else {
          this.redirect404 = true;
        }
      });
    } else {
      this.redirect404 = true;
    }
  },
};
</script>

<style scoped>
.child-container {
  height: auto;
}
.va-image {
  border-radius: 50px 0;
  border-right: 0.5px solid #5a5dbe;
  border-bottom: 0.5px solid #5a5dbe;
}

.description {
  text-align: left;
  word-spacing: 5px;
  letter-spacing: 1px;
}

.description p {
  line-height: 30px;
}

.step-card {
  display: flex;
  border-radius: 25px;
  box-shadow: 2px 3px 10px #494444;
  background: rgba(255, 255, 255, 0.7);
}

.step-chip {
  background: #5a5dbe;
  font-size: 1.4rem;
  color: white;
  padding: 20px;
  border-radius: 25px;
  border-radius: 0 25px 25px 0;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 60px;
}

.instruction {
  padding: 20px;
  line-height: 40px;
}

ul.va-unordered > li:before {
  background-color: #5a5dbe;
}

.recipe-video {
  height: 350px;
  width: 80%;
  border: 0;
}

.video-container {
  margin-top: 10% !important;
}
</style>