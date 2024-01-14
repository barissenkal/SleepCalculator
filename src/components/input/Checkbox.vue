<script setup lang="ts">
const model = defineModel<boolean>();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="inputItem">
    <div class="inputText">
      {{ props.title }}
    </div>
    <div class="checkboxWrapper">
      <input type="checkbox" v-model="model" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./common.scss";
</style>
