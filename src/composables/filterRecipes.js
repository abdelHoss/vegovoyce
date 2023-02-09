import fetchData from "./fetchData";

const getAllRecipes = async () => {
  const data = await fetchData();
  window.localStorage.setItem("recipes", JSON.stringify(data));
  return data;
};

const filterRecipesByQuery = async (data, query) => {
  const result = data.filter((recipe) => {
    const { name, description, ingredients } = recipe;
    let text = `${name} ${description} ${ingredients.toString()}`;
    text = text.toLowerCase();
    const searchFilter = text.search(" " + query.toLowerCase());
    if (searchFilter !== -1) {
      return recipe;
    }
  });
  return result;
};

const filterRecipeBycategory = (data, category) => {
  const result = data.filter((recipe) => {
    if (recipe.meal_type.toLowerCase() === category.toLowerCase()) {
      return recipe;
    }
  });
  return result;
};

export { filterRecipesByQuery, filterRecipeBycategory, getAllRecipes };
