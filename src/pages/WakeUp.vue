<script setup lang="ts">
import { getWakeUpTimes } from "../utils/calculation";
import { onMounted, onUnmounted } from "vue";
import CycleTime from "../components/CycleTime.vue";

let wakeUpTimes = getWakeUpTimes();

let intervalTimerID = null;
onMounted(() => {
  // @ts-ignore
  intervalTimerID = setInterval(() => {
    wakeUpTimes = getWakeUpTimes();
  }, 1000);
});
onUnmounted(() => {
  if (intervalTimerID) clearInterval(intervalTimerID);
});
</script>

<template>
  <div class="wakeUpTimes">
    <h1>Time to Wake Up</h1>
    <CycleTime v-for="item in wakeUpTimes" :item="item"></CycleTime>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

$extra-padding: 20px;
$margin-top: env(safe-area-inset-top);
$padding-bottom: calc(
  $extra-padding + $nav-bar-height + $nav-bar-padding-bottom
);

.wakeUpTimes {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - ($margin-top + $padding-bottom));
  margin-top: $margin-top;
  padding-bottom: $padding-bottom;
}
</style>
