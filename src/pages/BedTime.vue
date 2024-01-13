<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import {
  getGoToBedTimes,
  getTimeString,
  parseTimeString,
} from "../utils/calculation";
import CycleTime from "../components/CycleTime.vue";
import settings from "../utils/settings";

const { IdealWakeUp } = settings.getSettings();

const now = ref<Date>(new Date());
const wakeUpTimeString = ref<string>(getTimeString(IdealWakeUp));

let bedTimes = getGoToBedTimes(IdealWakeUp);

watch(wakeUpTimeString, (dateString) => {
  const totalMinutes = parseTimeString(dateString);
  bedTimes = getGoToBedTimes(totalMinutes);
});

let intervalTimerID = null;
onMounted(() => {
  // @ts-ignore
  intervalTimerID = setInterval(() => {
    now.value = new Date();
  }, 1000);
});
onUnmounted(() => {
  if (intervalTimerID) clearInterval(intervalTimerID);
});
</script>

<template>
  <h1>Time to Go to Bed</h1>
  <div class="bedTimes">
    <CycleTime
      v-for="item in bedTimes"
      :item="item"
      :unavailable="item.date < now"
    ></CycleTime>
  </div>
  <div class="datePickerBar">
    <input type="time" step="300" v-model="wakeUpTimeString" />
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

.datePickerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 8px;
  padding-bottom: calc(12px + $nav-bar-height + $nav-bar-padding-bottom);
  input[type="time"] {
    font-size: 3em;
    font-family: monospace;
    font-weight: bold;
    color: $soft-white;
    background-color: rgba($nav-background, 0.8);
    border-radius: 0.5em;
    padding: 0.2em 0.4em;
    border: none;
    &:focus {
      outline: none;
      color: $white;
    }
  }
}
@media (prefers-color-scheme: light) {
  .datePickerBar {
    input[type="time"] {
      color: $soft-black;
      background-color: rgba(invert($nav-background), 0.8);
      &:focus {
        color: $black;
      }
    }
  }
}
</style>
