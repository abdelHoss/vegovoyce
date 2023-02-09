<template>
  <div class="row cards-container mb-5" v-if="loadData">
    <div
      class="flex md6 lg4"
      v-for="(card, index) in data"
      :key="card.id"
      :name="card.id"
    >
      <va-card
        @click="setSelected(index)"
        :to="this.scheduleEditable ? null : card.target"
        class="mx-2 my-2 cards"
        outlined
        stripe
        stripe-color="secondary"
        :disabled="this.scheduleEditable && card.sides"
      >
        <va-chip
          v-if="selectedCard === index && !card.sides"
          @click="addRecipe(card, this.day)"
          color="secondary"
          icon="add"
          size="medium"
          class="add-recipe-chip"
          >Add recipe</va-chip
        >
        <div
          v-if="selectedCard === index && !card.sides"
          class="select-box"
        ></div>
        <va-image class="card-image" :src="card.image" />
        <va-card-title style="font-size: 1.2rem">{{ card.name }}</va-card-title>
        <va-card-content
          >{{ card.description.slice(0, 150) }}...</va-card-content
        >
      </va-card>
    </div>
  </div>
</template>

<script>
import { addRecipetoSchedule } from "@/composables/scheduleManager";
export default {
  name: "RecipeCards",
  props: ["data", "scheduleEditable", "day"],
  data() {
    return {
      loadData: false,
      selectedCard: null,
    };
  },
  methods: {
    setSelected(index) {
      if (this.scheduleEditable) {
        this.selectedCard = index;
      }
    },
    addRecipe(recipe, day) {
      this.$vaToast.init({
        message: `<strong>A ${recipe.meal_type} has been added to your schedule</strong>`,
        color: "success",
        dangerouslyUseHtmlString: true,
      });
      this.scheduleData = addRecipetoSchedule(recipe, day);
      this.$emit("scheduleData", recipe.name);
    },
  },
  mounted() {
    this.loadData = true;
  },
  updated() {
    if (!this.scheduleEditable) {
      this.selectedCard = null;
    }
  },
};
</script>

<style>
.cards-container {
  margin-top: 5%;
}

.select-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 1;
  background: #5a5dbe;
}

.add-recipe-chip {
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 2;
  cursor: pointer;
}
.cards {
  height: 450px !important;
  position: relative;
}

.card-image {
  height: 300px;
}
</style>