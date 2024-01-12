<script setup lang="ts">
const model = defineModel<boolean>();

const props = defineProps({
  title: {
    type: String,
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
      <input type="checkbox" v-model="model" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../variables.scss";

$side-padding: 8px;
$vertical-padding: 32px;

// ...
</style>
