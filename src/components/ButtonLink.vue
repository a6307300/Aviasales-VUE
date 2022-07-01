<script setup></script>

<template>
  <button class="button-link">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.button-link {
  @extend %clean-input;
}
.button-link:hover {
  text-decoration: underline;
  color: $highlight-color;
}
</style>
