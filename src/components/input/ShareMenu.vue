<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  shareAction: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="inputItem" @click="shareAction">
    <div class="inputText">
      {{ props.title }}
    </div>
    <div class="shareButtonWrapper">↑</div>
  </div>
</template>

<style lang="scss" scoped>
@import "./common.scss";
</style>
