<script setup lang="ts">
const model = defineModel<number>();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
});

function plus() {
  model.value = (model.value || 0) + 1;
}
function minus() {
  model.value = (model.value || 0) - 1;
}
function selectInput(event: MouseEvent) {
  // @ts-ignore
  if (event.target && event.target.select) {
    // @ts-ignore
    event.target.select();
  }
}
</script>

<template>
  <div class="inputItem">
    <div class="inputText">
      {{ props.title }}
    </div>
    <div class="numberWrapper">
      <button @click="plus">+</button>
      <input
        type="number"
        pattern="[0-9]*"
        v-model="model"
        :min="props.min"
        :max="props.max"
        @click="selectInput"
      />
      <button @click="minus">−</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./inputStyles.scss";
</style>
