<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const stats = [
  { value: 3, suffix: '+', label: 'Years of Experience' },
  { value: 30, suffix: '%', label: 'Faster API Response (PMS Project)' },
  { value: 25, suffix: '%', label: 'Performance Gain via SQL Optimization' },
]

const displayedStats = ref(stats.map(() => 0))
const statsElement = ref<HTMLElement | null>(null)
let statsObserver: IntersectionObserver | undefined
let animationFrame: number | undefined

function showFinalStats() {
  displayedStats.value = stats.map((stat) => stat.value)
}

function animateStats() {
  const startedAt = performance.now()
  const duration = 850

  const update = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayedStats.value = stats.map((stat) => Math.round(stat.value * eased))

    if (progress < 1) animationFrame = requestAnimationFrame(update)
  }

  animationFrame = requestAnimationFrame(update)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showFinalStats()
    return
  }

  statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      animateStats()
      statsObserver?.disconnect()
    },
    { threshold: 0.45 },
  )

  if (statsElement.value) statsObserver.observe(statsElement.value)
})

onBeforeUnmount(() => {
  statsObserver?.disconnect()
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <section id="about">
    <div class="req-line">
      <span class="method get">GET</span><span>/about</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Profile</span>
    <h2 class="reveal">About Me</h2>
    <p class="section-sub reveal">A short summary of how I work and what I care about.</p>

    <div class="about-grid">
      <div class="about-text reveal" style="--reveal-order: 2">
        <p>
          I'm a <strong>Software Developer</strong> based in Kolkata with three years of experience designing and
          shipping web applications end to end. My core stack is <strong>Laravel</strong> for robust, secure backends
          and <strong>Vue.js / Nuxt 3</strong> for fast, componentized frontends.
        </p>
        <p>
          I've worked across project management systems, SaaS products, and microservice-based platforms —
          focusing on clean REST API design, database performance, and reusable component architecture. I care about
          writing code that the next developer can actually read, and about shaving milliseconds off response times
          when it matters.
        </p>
        <p>
          Outside of feature work, I enjoy code reviews, tightening query performance, and keeping teams aligned
          on coding standards.
        </p>
      </div>
      <div ref="statsElement" class="stats-stack reveal" style="--reveal-order: 3">
        <div v-for="(stat, index) in stats" :key="stat.label" class="stat-card">
          <div class="num">{{ displayedStats[index] }}{{ stat.suffix }}</div>
          <div class="label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
