<script setup lang="ts">
import { getWakeUpTimes } from "../utils/calculation";
import { computed, onMounted, onUnmounted, ref } from "vue";
import CycleTime from "../components/CycleTime.vue";

const now = ref<Date>(new Date());
const wakeUpTimes = computed(() => getWakeUpTimes(now.value));

let intervalTimerID = null;
onMounted(() => {
  // @ts-ignore
  intervalTimerID = setInterval(() => {
    const current = new Date();
    if (current.valueOf() - now.value.valueOf() >= 60 * 1000) {
      now.value = current;
    }
  }, 500);
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
@use "../scss/mixins.scss" as *;

$extra-padding: 20px;

.wakeUpTimes {
  @include pageContent($extra-padding);
}
</style>
