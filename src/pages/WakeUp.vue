<script setup lang="ts">
import { getWakeUpTimes } from "../utils/calculation";
import { computed } from "vue";
import CycleTime from "../components/CycleTime.vue";
import { useMinuteNow } from "../composables/useMinuteNow";

const now = useMinuteNow();
const wakeUpTimes = computed(() => getWakeUpTimes(now.value));
</script>

<template>
  <div class="wakeUpTimes">
    <h1>Time to Wake Up</h1>
    <CycleTime
      v-for="item in wakeUpTimes"
      :key="item.cycle"
      :item="item"
    ></CycleTime>
  </div>
</template>

<style lang="scss" scoped>
@use "../scss/mixins.scss" as *;

$extra-padding: 20px;

.wakeUpTimes {
  @include pageContent($extra-padding);
}
</style>
