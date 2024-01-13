<script setup lang="ts">
import { ref, watch, defineModel } from "vue";

import { getTimeString, parseTimeString } from "../../utils/calculation";

const model = defineModel<number>();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});

const wakeUpTimeString = ref<string>(getTimeString(model.value || 0));

watch(model, (value) => {
  wakeUpTimeString.value = getTimeString(value || 0);
});
watch(wakeUpTimeString, (dateString) => {
  model.value = parseTimeString(dateString);
});

// ...
</script>

<template>
  <div>
    <div>
      {{ props.title }}
    </div>
    <div>
      <input type="time" v-model="wakeUpTimeString" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../variables.scss";

$side-padding: 8px;
$vertical-padding: 32px;

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
@media (prefers-color-scheme: light) {
  input[type="time"] {
    color: $soft-black;
    background-color: rgba(invert($nav-background), 0.8);
    &:focus {
      color: $black;
    }
  }
}
</style>
