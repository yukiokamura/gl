<script setup lang="ts">
const props = defineProps<{
  title: string
  subTitle: string
}>()
</script>
<template>
  <div class="title">
    <h1>{{ props.title }}</h1>
    <h2>{{ props.subTitle }}</h2>
  </div>
</template>
<style scoped>
.title {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-inline-start: var(--margin-base-2x);
  margin-block-end: var(--margin-base-2x);
  z-index: var(--z-index-primary);
  h1 {
    font-size: 4rem;
    font-weight: 600;
    color: var(--primary-color);
    letter-spacing: var(--letter-spacing-2x);
  }
  h2 {
    font-size: 0.75rem;
    font-weight: 300;
    color: var(--primary-color);
    letter-spacing: var(--letter-spacing);
    text-align: right;
    margin-block-start: var(--margin-base-half);
  }
}
</style>
