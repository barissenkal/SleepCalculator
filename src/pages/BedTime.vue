<script setup lang="ts">
import { ref, watch } from "vue";
import {
  getGoToBedTimes,
  getTimeString,
  parseTimeString,
} from "../utils/calculation";
import CycleTime from "../components/CycleTime.vue";
import settings from "../utils/settings";

const { IdealWakeUp } = settings.getSettings();

const wakeUpTimeString = ref<string>(getTimeString(IdealWakeUp));

let bedTimes = getGoToBedTimes(IdealWakeUp);

watch(wakeUpTimeString, (dateString) => {
  const totalMinutes = parseTimeString(dateString);
  bedTimes = getGoToBedTimes(totalMinutes);
});
</script>

<template>
  <h1 class="header">Time to Go to Bed</h1>
  <div class="bedTimes">
    <CycleTime v-for="item in bedTimes" :item="item"></CycleTime>
  </div>
  <div class="datePickerBar">
    <input type="time" v-model="wakeUpTimeString" />
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

$side-padding: 8px;

.header {
  padding: 0 $side-padding;
  text-align: start;
  font-size: 40px;
}

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
