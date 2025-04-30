<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps<{
  paths: {
    name: string
    path: string
  }[]
}>()
</script>
<template>
  <aside class="aside">
    <h1>yukiokamura sketch</h1>
    <div class="links">
      <div class="link-inner" v-for="path in props.paths">
        <RouterLink
          :to="path.path"
          :class="{ active: route.path === path.path }"
          >{{ path.name }}</RouterLink
        >
      </div>
    </div>
  </aside>
</template>
<style scoped>
.aside {
  position: absolute;
  left: 0;
  top: 0;
  margin-inline-start: var(--margin-base-2x);
  margin-block-start: var(--margin-base-2x);
  z-index: var(--z-index-primary);
  h1 {
    letter-spacing: var(--letter-spacing);
    font-weight: 600;
    color: var(--primary-color);
    font-size: 1.5rem;
  }
  .links {
    margin-block-start: var(--margin-base-2x);
  }
  .link-inner + .link-inner {
    margin-block-start: var(--margin-base-half);
  }
  a {
    display: inline-block;
    color: var(--primary-color);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: var(--letter-spacing);
    position: relative;
    overflow: clip;
    padding: 1px 1px;
    pointer-events: auto;
    &.active {
      pointer-events: none;
      &::before {
        transform: translate3d(100%, 0, 0);
      }
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: var(--primary-color);
      width: 100%;
      height: 1px;
      transform: translate3d(0, 0, 0);

      transition: transform 0.2s var(--easeing);
    }
    &:hover {
      &::before {
        transform: translate3d(100%, 0, 0);
      }
    }
  }
}
</style>
