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
</script>

<template>
  <div class="inputItem">
    <div class="inputText">
      {{ props.title }}
    </div>
    <div class="timeWrapper">
      <input type="time" step="300" v-model="wakeUpTimeString" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./common.scss";
</style>
