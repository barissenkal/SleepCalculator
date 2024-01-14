<script setup lang="ts">
import { ref, watch } from "vue";

const model = defineModel<number>({
  required: true,
});

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

// Internal ref for better controlling updates to model.
const num = ref<number>(model.value);

// Update internal value on model changes. (No range limit check)
watch(model, (value) => (num.value = value));

function plus() {
  num.value++;
  limitNumAndUpdateModel();
}
function minus() {
  num.value--;
  limitNumAndUpdateModel();
}

function selectInput(event: MouseEvent) {
  // @ts-ignore
  if (event.target && event.target.select) {
    // @ts-ignore
    event.target.select();
  }
}

function limitNumAndUpdateModel() {
  if (props.max != null && num.value > props.max) {
    model.value = num.value = props.max;
  } else if (props.min != null && num.value < props.min) {
    model.value = num.value = props.min;
  } else {
    model.value = num.value;
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
        v-model="num"
        :min="props.min"
        :max="props.max"
        @change="limitNumAndUpdateModel()"
        @click="selectInput"
      />
      <button @click="minus">−</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./common.scss";
</style>
