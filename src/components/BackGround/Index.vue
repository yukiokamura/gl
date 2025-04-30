<script setup lang="ts">
import { onMounted } from 'vue'
import GL from './GL/index'
import { useTemplateRef } from 'vue'

const glElement = useTemplateRef('gl')

onMounted(() => {
  const gl = new GL(glElement.value!)
  gl.load('MetaBall')
  const resizer = new ResizeObserver(() => {
    gl.onResize()
  })
  resizer.observe(glElement.value!)

  const update = (t: number) => {
    gl.update(t)
    requestAnimationFrame(update)
  }
  update(0)
})
</script>
<template>
  <div class="gl" ref="gl">
    <canvas></canvas>
  </div>
</template>
<style scoped>
.gl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
