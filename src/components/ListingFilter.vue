<template>
  <div>
    <h2 v-if="showTitle" class="va-h2">
      Search for vegan recipes by category or keyword
    </h2>
    <div class="filter-container">
      <div class="flex mt-5">
        <va-input
          class="filter-search mr-5"
          type="text"
          v-model="query"
          placeholder="Search a recipe"
          color="secondary"
        />
        <va-select
          class="filter-select"
          v-model="value"
          :options="options"
          color="secondary"
          placeholder="category"
        />
      </div>
      <va-button
        @click="handleClick"
        class="filter-submit mt-5"
        size="large"
        color="secondary"
        gradient
        >Search</va-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ListingFilter",
  props: ["showTitle"],
  data() {
    return {
      query: "",
      value: "",
      keyword: this.$route.query.keyword || "",
      category: this.$route.query.category || "",
      options: ["None", "Breakfast", "Lunch", "Dinner", "Dessert"],
    };
  },
  methods: {
    handleClick() {
      this.$emit("loadCards", this.query, this.value.toLowerCase());
    },
  },
  mounted() {
    if (this.keyword || this.category) {
      this.query = this.keyword;
      this.value = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }
  }
};
</script>

<style scoped>
.filter-container {
  width: 80%;
  margin: 0 10%;
}
.filter-search {
  width: 60%;
  box-shadow: 6px 8px 15px #494444;
  border-radius: 20px;
}

.filter-select {
  font-weight: bold;
  font-size: 1.5em;
  border-radius: 20px;
  box-shadow: 6px 8px 15px #494444;
}

.filter-submit {
  width: 30%;
  padding: 10px;
}
</style>