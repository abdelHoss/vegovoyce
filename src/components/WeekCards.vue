<template>
  <div style="text-align: center">
    <div class="row justify-space-around">
      <div class="flex" v-for="(date, index) in weeklySchedule" :key="date.day">
        <va-popover
          placement="right"
          :hover-over-timeout="400"
          class="mr-2 mb-2"
          :message="date.date"
        >
          <div
            class="date-card"
            @click="setSelectedIndex(index, date.dayWeek)"
            :class="{ 'card-selected': selectedIndex === index }"
            :style="{
              background:
                index === 0 || index === 1 || index === 6 ? '#FFF' : '',
            }"
          >
            <div class="day">{{ date.day }}</div>
          </div>
        </va-popover>
      </div>
    </div>
  </div>
</template>

<script>
import getWeekDays from "@/composables/getWeekDays";

export default {
  name: "Weekcards",
  data() {
    return {
      weeklySchedule: getWeekDays(),
      selectedIndex: null,
      selectedDay: null,
    };
  },
  methods: {
    setSelectedIndex(index, day) {
      // if (this.selectedIndex !== index) {
      //   this.selectedIndex = index;
      //   this.selectedDay = day;
      // } else {
      //   this.selectedIndex = this.selectedDay = null;
      // }
      this.selectedIndex = this.selectedIndex === index ? null : index;
      this.$emit("editSchedule", this.selectedIndex !== null, day);
    },
  },
};
</script>

<style>
.date-card {
  width: calc(100vw / 9);
  height: calc(100vw / 9);
  background: #4dbd8a;
  border-radius: 25px;
  box-shadow: 6px 8px 15px #494444;
  cursor: pointer;
}

.card-selected {
  border: 6px solid #222121;
}

.day {
  font-size: 5rem;
  font-weight: bold;
  padding-top: 25%;
}
</style>