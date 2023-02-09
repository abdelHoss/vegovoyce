<template>
  <div class="reverse-container">
    <Navbar />
    <div class="child-container">
      <ListingFilter :showTitle="true" @loadCards="getRecipes" />
      <RecipeCards v-if="listing.length" :data="listing" />
      <ProgressCircle v-else-if="showProgress" />
      <div class="no-result" v-else-if="noResult">
        <h1 class="va-h1">Your search has no result!!</h1>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingFilter from "@/components/ListingFilter";
import RecipeCards from "@/components/RecipeCards";
import ProgressCircle from "@/components/ProgressCircle";
import {
  filterRecipesByQuery,
  filterRecipeBycategory,
  getAllRecipes,
} from "@/composables/filterRecipes";
import changeRoute from "@/composables/changeRoute";

export default {
  name: "ListView",
  components: { Navbar, Footer, ListingFilter, RecipeCards, ProgressCircle },
  data() {
    return {
      showProgress: false,
      noResult: false,
      recipeObject: JSON.parse(window.localStorage.getItem("recipes")),
      listing: [],
      keyword: this.$route.query.keyword || "",
      category: this.$route.query.category || "",
    };
  },
  methods: {
    async getRecipes(query, value) {
      this.showProgress = true;
      this.noResult = false;
      this.recipeObject = this.recipeObject || (await getAllRecipes());
      changeRoute(this.$route.path, query, value);
      this.filterResults(query, value);
    },
    filterResults(query, value = value.toLowerCase()) {
      filterRecipesByQuery(this.recipeObject, query).then((data) => {
        this.listing =
          value && value !== "none"
            ? filterRecipeBycategory(data, value)
            : data;
        this.noResult = data.length === 0;
        this.showProgress = false;
      });
    },
  },

  mounted() {
    if (this.keyword || this.category) {
      this.filterResults(this.keyword, this.category);
    }
  },
};
</script>

<style>
</style>