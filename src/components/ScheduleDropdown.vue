<template>
  <va-button
    v-if="scheduleEditable"
    preset="secondary"
    color="secondary"
    @click="toggleSchedule"
    class="show-schedule-trigger"
  >
    {{ scheduleVisible ? "Hide" : "Show" }} recipe schedule
    <va-icon
      class="mr-2"
      :name="scheduleVisible ? 'arrow_drop_up' : 'arrow_drop_down'"
      size="50px"
    />
  </va-button>
  <div>
    <va-accordion class="schedule-dropdown" popout>
      <va-collapse flat v-model="scheduleVisible">
        <div>
          <div class="row justify-center">
            <div
              v-for="item in ['Breakfast', 'Lunch', 'Dinner', 'Dessert']"
              :key="item"
              class="flex md6 lg4"
            >
              <div v-if="data && day">
                <va-card
                  class="mx-2 schedule-card"
                  color="secondary"
                  :to="data[day][item.toLowerCase()].target"
                  :disabled="!data[day][item.toLowerCase()].name"
                  gradient
                >
                  <va-image
                    class="schedule-card-image"
                    v-if="data[day][item.toLowerCase()].image"
                    :src="data[day][item.toLowerCase()].image"
                  />
                  <va-card-title>{{ item }}</va-card-title>
                  <va-card-content>
                    <p class="va-h6" v-if="data[day][item.toLowerCase()].name">
                      {{ data[day][item.toLowerCase()].name }}
                    </p>
                    <p v-else>
                      Card is empty add a {{ item.toLowerCase() }} recipe to
                      your schedule
                    </p>
                  </va-card-content>
                </va-card>
              </div>
              <div v-else>
                <va-card
                  disabled
                  class="mx-2 schedule-card"
                  color="secondary"
                  gradient
                >
                  <va-card-title>{{ item }}</va-card-title>
                  <va-card-content>
                    Card is empty add a {{ item.toLowerCase() }} recipe to your
                  </va-card-content>
                </va-card>
              </div>
            </div>
          </div>
          <va-button
            class="mt-5"
            size="large"
            color="danger"
            round
            :disabled="!data"
            @click="resetSchedule"
            >Reset Schedule</va-button
          >
        </div>
      </va-collapse>
    </va-accordion>
  </div>
</template>

<script>
export default {
  name: "ScheduleDropdown",
  props: ["scheduleEditable", "scheduleData", "day"],
  data() {
    return {
      scheduleVisible: false,
      data: JSON.parse(localStorage.getItem("weeklyScheduleSession")),
    };
  },
  methods: {
    toggleSchedule() {
      this.scheduleVisible = !this.scheduleVisible;
    },
    resetSchedule() {
      this.$vaToast.init({
        message: `<strong>You recipe schedule has been reset</strong>`,
        color: "warning",
        dangerouslyUseHtmlString: true,
      });
      this.data = null;
      localStorage.setItem("weeklyScheduleSession", null);
    },
  },

  updated() {
    this.data = JSON.parse(localStorage.getItem("weeklyScheduleSession"));
  },
};
</script>

<style>
.schedule-dropdown {
  width: 90%;
  margin: 0 5%;
}

.schedule-card {
  height: 350px;
  margin-bottom: 2%;
}

.schedule-card-image {
  height: 200px;
}

.va-card--disabled {
  opacity: 0.8;
}

.va-collapse__header__icon {
  display: none;
}

.va-collapse__header-wrapper {
  display: none;
}
</style>