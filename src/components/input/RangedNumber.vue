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

// ...
</script>

<template>
  <div>
    <div>
      {{ props.title }}
    </div>
    <div>
      <input type="number" v-model="model" :min="props.min" :max="props.max" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../variables.scss";

$side-padding: 8px;
$vertical-padding: 32px;

// ...
</style>
