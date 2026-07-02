<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loadTime = ref<string>('...')
const year = new Date().getFullYear()

onMounted(() => {
  // Capture time to interactive (when Vue mounts this footer)
  loadTime.value = `${Math.round(performance.now())}ms`

  // Update to total page load time once fully loaded
  window.addEventListener('load', () => {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navEntry && navEntry.loadEventEnd > 0) {
      loadTime.value = `${Math.round(navEntry.loadEventEnd)}ms`
    }
  })
})
</script>

<template>
  <footer>
    © {{ year }} Suman Kumar — built with Vue.js · load time: <span class="load-time">{{ loadTime }}</span>
  </footer>
</template>

<style scoped>
.load-time {
  font-family: var(--mono);
  color: var(--accent-2);
}
</style>
