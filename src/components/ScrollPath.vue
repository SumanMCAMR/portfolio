<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useScrollPath } from '../composables/useScrollPath'

const svg = ref<SVGSVGElement | null>(null)
const line = ref<SVGPathElement | null>(null)
const glow = ref<SVGPathElement | null>(null)
const head = ref<SVGGElement | null>(null)
const gradient = ref<SVGLinearGradientElement | null>(null)

const id = useId().replaceAll(':', '')
const gradientId = `scroll-path-gradient-${id}`

const { pathData, ready, reducedMotion, svgHeight, svgWidth } = useScrollPath({
  svg,
  line,
  glow,
  head,
  gradient,
})

const viewBox = computed(() => `0 0 ${svgWidth.value} ${svgHeight.value}`)
</script>

<template>
  <svg
    v-show="ready && !reducedMotion && pathData"
    ref="svg"
    class="scroll-path"
    :viewBox="viewBox"
    :width="svgWidth"
    :height="svgHeight"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        ref="gradient"
        gradientUnits="userSpaceOnUse"
        :x1="0"
        :y1="0"
        :x2="svgWidth"
        :y2="svgHeight * 0.62"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#5EEAD4" />
        <stop offset="0.48" stop-color="#D8FFF9" />
        <stop offset="1" stop-color="#FF5A3C" />
      </linearGradient>
    </defs>

    <path
      ref="glow"
      class="scroll-path__glow"
      :d="pathData"
      :stroke="`url(#${gradientId})`"
    />
    <path ref="line" class="scroll-path__line" :d="pathData" :stroke="`url(#${gradientId})`" />

    <g ref="head" class="scroll-path__head">
      <text x="9" y="0">⚡</text>
    </g>
  </svg>
</template>

<style scoped>
.scroll-path {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: block;
  overflow: visible;
  pointer-events: none;
}

.scroll-path__line,
.scroll-path__glow {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.scroll-path__line {
  stroke-width: 3;
  opacity: 0.92;
}

.scroll-path__glow {
  stroke-width: 10;
  opacity: 0.14;
}

.scroll-path__head {
  will-change: transform;
}

.scroll-path__head text {
  dominant-baseline: middle;
  font-family: system-ui, sans-serif;
  font-size: 18px;
}

@media (max-width: 700px) {
  .scroll-path__line { stroke-width: 2.5; }
  .scroll-path__glow { stroke-width: 8; }
  .scroll-path__head text { font-size: 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-path { display: none; }
}
</style>
