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
  <div class="bedTimes">
    <h1>Time to Go to Bed</h1>
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

$extra-padding: 102px;
$margin-top: env(safe-area-inset-top);
$padding-bottom: calc(
  $extra-padding + $nav-bar-height + $nav-bar-padding-bottom
);

.bedTimes {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - ($margin-top + $padding-bottom));
  margin-top: $margin-top;
  padding-bottom: $padding-bottom;
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
@media only print and (prefers-color-scheme: light) {
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
