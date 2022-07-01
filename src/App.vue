<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";
.inside__view {
  @extend %display-center;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}
.full__view {
  @extend %display-center;
  box-sizing: content-box;
  width: 100vw;
  height: 98vh;
}
</style>
