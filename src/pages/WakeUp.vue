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
@import "../scss/mixins.scss";

$extra-padding: 20px;

.wakeUpTimes {
  @include pageContent($extra-padding);
}
</style>
