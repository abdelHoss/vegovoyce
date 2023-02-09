<template>
  <Navbar />
  <div class="reverse-container">
    <div class="child-container">
      <va-alert
        icon="help"
        v-model="showAlert"
        closeable
        center
        color="info"
        class="schedule-alert"
      >
        <p>
          To add recipes to your schedule click on a day of the week, then
          select the desired recipe and add the recipe to the schedule, to
          deselect the selected day click again on the day card. you need to add
          a breakfast, lunch, dinner and dessert for a specific day to generate
          a weekly schedule.
        </p>
      </va-alert>
      <WeekCards class="mb-5" @editSchedule="editSchedule" />
      <ScheduleDropdown
        :scheduleEditable="scheduleEditable"
        :day="selectedDay"
        :scheduleData="scheduleData"
      />
      <ListingFilter :showTitle="false" @loadCards="filterRecipes" />
      <RecipeCards
        v-if="listing.length"
        :data="listing"
        :scheduleEditable="scheduleEditable"
        :day="selectedDay"
        @scheduleData="addScheduledData"
      />
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
import WeekCards from "@/components/WeekCards";
import ListingFilter from "@/components/ListingFilter";
import RecipeCards from "@/components/RecipeCards";
import ScheduleDropdown from "@/components/ScheduleDropdown";
import {
  filterRecipesByQuery,
  filterRecipeBycategory,
  getAllRecipes,
} from "@/composables/filterRecipes";
import changeRoute from "@/composables/changeRoute";
import ProgressCircle from "@/components/ProgressCircle";

export default {
  name: "ScheduleView",
  components: {
    Navbar,
    Footer,
    WeekCards,
    ListingFilter,
    RecipeCards,
    ScheduleDropdown,
    ProgressCircle,
  },
  data() {
    return {
      recipeObject: JSON.parse(window.localStorage.getItem("recipes")),
      listing: [],
      keyword: this.$route.query.keyword || "",
      category: this.$route.query.category || "",
      scheduleEditable: false,
      showAlert: true,
      selectedDay: false,
      scheduleData: false,
      showProgress: false,
      noResult: false,
    };
  },
  methods: {
    async getRecipes() {
      this.showProgress = true;
      this.recipeObject = this.recipeObject || (await getAllRecipes());
      this.listing = this.recipeObject;
      this.showProgress = false;
    },
    filterRecipes(query, value) {
      this.noResult = false;
      changeRoute(this.$route.path, query, value);
      filterRecipesByQuery(this.recipeObject, query).then((data) => {
        this.listing =
          value && value !== "none"
            ? filterRecipeBycategory(data, value)
            : data;
        this.noResult = this.listing.length === 0;
      });
    },
    editSchedule(statement, day) {
      this.scheduleEditable = statement;
      this.selectedDay = day;
    },
    addScheduledData(name) {
      this.scheduleData = name;
    },
  },
  mounted() {
    this.getRecipes();
    if (this.keyword || this.category) {
      this.filterRecipes(this.keyword, this.category);
    }
  },
};
</script>

<style scoped>
.schedule-alert {
  margin: -50px 10% 20px;
  width: 80%;
}

.schedule-alert p {
  padding-top: 20px;
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 30px;
}

.child-container {
  margin-bottom: 10%;
}
</style>