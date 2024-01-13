<script setup lang="ts">
import type { CycleItem } from "../enums";
import settings from "../utils/settings";
import { formatHours, formatTime } from "../utils/format";
import { PropType } from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<CycleItem>,
    required: true,
  },
  unavailable: {
    type: Boolean,
    default: false,
  },
});

const { BestCycle, CycleClock, SleepCycleLength } = settings.getSettings();

function getLengthText(cycle: number) {
  return formatHours(cycle * SleepCycleLength);
}
</script>

<template>
  <div
    class="cycleTime"
    :class="{ best: props.item.cycle == BestCycle, unavailable: unavailable }"
  >
    <div class="cycle">
      {{ props.item.cycle }} CYCLES
      <span v-if="CycleClock">({{ getLengthText(props.item.cycle) }})</span>
    </div>
    <div class="date">{{ formatTime(props.item.date) }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

$vertical-padding: 32px;

.cycleTime {
  width: 100vw;
  text-align: start;
  .cycle {
    font-size: 1em;
    line-height: 1em;
    padding: $side-padding/2 $side-padding;
  }
  .date {
    font-size: 3em;
    line-height: 1em;
    padding: 0 $side-padding;
    font-family: monospace;
    font-weight: bold;
  }
  &:not(:first-child) {
    padding-top: $vertical-padding;
  }
  &.best {
    color: $white;
    .cycle {
      font-weight: bold;
    }
  }
  &.unavailable {
    opacity: 0.25;
    color: rgba(red, $soft-transparency);
  }
  &.best.unavailable {
    color: red;
  }
}

@media only print and (prefers-color-scheme: light) {
  .cycleTime {
    &.best {
      color: $black;
    }
  }
}
</style>
