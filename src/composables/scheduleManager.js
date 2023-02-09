const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const mealTypes = ["breakfast", "lunch", "dinner", "dessert"];

const scheduleSchema = () => {
  let schema = {};
  const dayScheduleObject = {
    name: null,
    image: null,
    target: null,
    keywords: [],
  };

  weekDays.map((day) => {
    schema[day] = {};
    mealTypes.map(
      (meal) => (schema[day][meal] = Object.assign({}, dayScheduleObject))
    );
  });
  return schema;
};

const addRecipetoSchedule = (recipe, day) => {
  let scheduleObject = JSON.parse(
    localStorage.getItem("weeklyScheduleSession")
  );
  if (!scheduleObject) {
    scheduleObject = scheduleSchema();
  }
  scheduleObject[day][recipe.meal_type.toLowerCase()] = recipe;
  localStorage.setItem("weeklyScheduleSession", JSON.stringify(scheduleObject));
  if (verifySchedule(scheduleObject)) {
    generateSchedule(scheduleObject, day);
  }
  return scheduleObject;
};

const verifySchedule = (data) => {
  let scheduleValid = false;
  for (let day in data) {
    if (
      data[day]["breakfast"].name &&
      data[day]["lunch"].name &&
      data[day]["dinner"].name &&
      data[day]["dessert"].name
    ) {
      scheduleValid = true;
    }
  }
  return scheduleValid;
};

const generateSchedule = (data, day) => {
  const weekArray = weekDays.concat(weekDays);
  const recipes = filterRecipesByType();
  let selectedDayIndex = weekArray.indexOf(day);
  const filteredRecipesId = [];
  for (let index = 0; index < 6; index++) {
    let actualIndex = selectedDayIndex + 1;
    let actualDay = weekArray[selectedDayIndex];
    let actualObject = data[weekArray[actualIndex]];
    mealTypes.map((type, typeIndex) => {
      let recipesByType = recipes[typeIndex];
      let similarKeywords = true;
      let idRegistered = true;
      while (similarKeywords && idRegistered) {
        let randomRecipe =
          recipesByType[Math.floor(Math.random() * recipesByType.length)];
        actualObject[type] = randomRecipe;
        const concatenatedKeywords =
          actualIndex === 0
            ? data[weekArray[6]][type].keywords.concat(
                data[weekArray[5]][type].keywords
              )
            : data[actualDay][type].keywords.concat(
                actualIndex === 1
                  ? data[weekArray[6]][type].keywords
                  : data[weekArray[selectedDayIndex - 1]][type].keywords
              );
        similarKeywords = concatenatedKeywords.some((keyword) =>
          randomRecipe.keywords.includes(keyword)
        );

        idRegistered = filteredRecipesId.some(id => randomRecipe.id === id);
        if (!similarKeywords && !idRegistered) {
          data[weekArray[actualIndex]][type] = actualObject[type];
          filteredRecipesId.push(actualObject[type].id);
        }
      }
    });
    selectedDayIndex++;
  }
  localStorage.setItem("weeklyScheduleSession", JSON.stringify(data));
};

const filterRecipesByType = () => {
  let breakfastRecipes = [];
  let lunchRecipes = [];
  let dinnerRecipes = [];
  let dessertRecipes = [];
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  recipes.map((recipe) => {
    if (!recipe.sides) {
      switch (recipe.meal_type) {
        case "Breakfast":
          breakfastRecipes.push(recipe);
          break;
        case "Lunch":
          lunchRecipes.push(recipe);
          break;
        case "Dinner":
          dinnerRecipes.push(recipe);
          break;
        default:
          dessertRecipes.push(recipe);
      }
    }
  });
  return [breakfastRecipes, lunchRecipes, dinnerRecipes, dessertRecipes];
};

export { addRecipetoSchedule };
