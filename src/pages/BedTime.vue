<script setup lang="ts">
import { computed, ref } from "vue";
import {
  getGoToBedTimes,
  getTimeString,
  parseTimeString,
} from "../utils/calculation";
import CycleTime from "../components/CycleTime.vue";
import settings from "../utils/settings";
import { useMinuteNow } from "../composables/useMinuteNow";

const { IdealWakeUp } = settings.getSettings();

const now = useMinuteNow();
const wakeUpTimeString = ref<string>(getTimeString(IdealWakeUp));

const bedTimes = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  now.value; // update when now changes
  return getGoToBedTimes(parseTimeString(wakeUpTimeString.value));
});
</script>

<template>
  <div class="bedTimes">
    <h1>Time to Go to Bed</h1>
    <CycleTime
      v-for="item in bedTimes"
      :key="item.cycle"
      :item="item"
      :unavailable="item.date < now"
    ></CycleTime>
  </div>
  <div class="datePickerBar">
    <input type="time" step="300" v-model="wakeUpTimeString" />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "../scss/variables.scss" as *;
@use "../scss/mixins.scss" as *;

$extra-padding: 102px;
$margin-top: env(safe-area-inset-top);
$padding-bottom: calc(
  $extra-padding + $nav-bar-height + $nav-bar-padding-bottom
);

.bedTimes {
  @include pageContent($extra-padding);
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
      background-color: rgba(color.invert($nav-background), 0.8);
      &:focus {
        color: $black;
      }
    }
  }
}
</style>
