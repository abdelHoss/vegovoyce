<template>
  <va-card class="recipe-details-card">
    <va-card-content>
      <div class="recipe-details-header">
        <va-list>
          <va-list-item>
            <va-list-item-section avatar>
              <va-icon name="restaurant" size="large" color="secondary" />
            </va-list-item-section>
            <va-list-item-section>
              Type: {{ recipe.meal_type }}
            </va-list-item-section>
          </va-list-item>
          <va-list-item>
            <va-list-item-section avatar>
              <va-icon name="timer" size="large" color="secondary" />
            </va-list-item-section>
            <va-list-item-section>
              Total Time: {{ recipe.prep_time }}
            </va-list-item-section>
          </va-list-item>
          <va-list-item>
            <va-list-item-section avatar>
              <va-icon name="groups" size="large" color="secondary" />
            </va-list-item-section>
            <va-list-item-section>
              Serves: {{ recipe.serves }}
            </va-list-item-section>
          </va-list-item>
        </va-list>
        <va-divider></va-divider>
      </div>
      <div class="mt-5 ingredients-container">
        <va-list>
          <va-list-item
            class="mb-4"
            v-for="ingredient in recipe.ingredients"
            :key="ingredient"
            :name="ingredient"
            :to="
              ingredient.includes('::')
                ? ingredient.slice(
                    ingredient.indexOf('::') + 2,
                    ingredient.length
                  )
                : null
            "
          >
            {{
              ingredient.includes("::")
                ? ingredient.slice(0, ingredient.indexOf("::"))
                : ingredient
            }}
          </va-list-item>
        </va-list>
      </div>
    </va-card-content>
  </va-card>
</template>

<script>
export default {
  name: "recipeDetailsCard",
  props: ["recipe"],
  data() {
    return {};
  },
};
</script>

<style>
:root {
  --va-divider-color: #5a5dbe;
  --va-divider-line-width: 3px;
  --va-list-item-align-items: left;
}
.recipe-details-card {
  box-shadow: 4px 6px 15px #494444;
  border-radius: 20px;
}

.va-list {
  font-weight: bold;
}

.va-list-item {
  font-size: 1.2rem;
}

.va-list-item-section {
  font-size: 1.4rem;
  color: #5a5dbe;
  justify-content: left;
}

.ingredients-container {
  text-align: left;
}
</style>