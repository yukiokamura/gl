<script setup lang="ts">
import Aside from './components/Aside/index.vue'
import BackGround from './components/BackGround/Index.vue'
const paths = [
  {
    name: 'Metaball',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
]
</script>

<template>
  <div class="wrapper">
    <Aside :paths />
    <BackGround />
    <main class="main">
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index-primary);
}
</style>
./components/BackGround/Index.vue
