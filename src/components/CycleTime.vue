<script setup lang="ts">
import type { CycleItem } from "../enums";
import settings from "../utils/settings";
import { formatTime } from "../utils/format";
import { PropType } from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<CycleItem>,
    required: true,
  },
});

const BestCycle = settings.getSettings().BestCycle;
</script>

<template>
  <div class="cycleTime" :class="{ best: props.item.cycle == BestCycle }">
    <div class="cycle">{{ props.item.cycle }} CYCLES</div>
    <div class="date">{{ formatTime(props.item.date) }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables.scss";

$side-padding: 8px;
$vertical-padding: 32px;

.cycleTime {
  width: 100vw;
  text-align: start;
  .cycle {
    font-size: 1em;
    line-height: 1em;
    padding: $side-padding;
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
}

@media (prefers-color-scheme: light) {
  .cycleTime {
    &.best {
      color: $black;
    }
  }
}
</style>
