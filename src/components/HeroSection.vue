<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const command = '$ curl -s api.sumankumar.dev/v1/profile'
const typedCommand = ref('')
const typedResponse = ref('')
const responseStarted = ref(false)
const responseComplete = ref(false)
let typingTimer: ReturnType<typeof window.setTimeout> | undefined
let stopped = false

const jsonText = `{
  "name": "Suman Kumar",
  "role": "Software Developer",
  "stack": ["Laravel", "Vue.js", "Nuxt 3"],
  "experience_years": 3,
  "location": "Kolkata, India",
  "status": "available_for_hire"
}`

function highlightJson(value: string) {
  const escaped = value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

  return escaped.replace(
    /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(\b\d+\b)/g,
    (match, key: string | undefined, jsonValue: string | undefined) => {
      if (key) return `<span class="json-key">${match}</span>`
      if (jsonValue) return `<span class="json-str">${match}</span>`
      return `<span class="json-num">${match}</span>`
    },
  )
}

const highlightedResponse = computed(() => highlightJson(typedResponse.value))

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    typingTimer = window.setTimeout(resolve, duration)
  })
}

async function typeTerminal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedCommand.value = command
    typedResponse.value = jsonText
    responseStarted.value = true
    responseComplete.value = true
    return
  }

  for (let index = 1; index <= command.length; index++) {
    if (stopped) return
    typedCommand.value = command.slice(0, index)
    await wait(12)
  }

  await wait(120)
  responseStarted.value = true

  for (let index = 1; index <= jsonText.length; index++) {
    if (stopped) return
    typedResponse.value = jsonText.slice(0, index)
    await wait(4)
  }

  responseComplete.value = true
}

onMounted(() => void typeTerminal())

onBeforeUnmount(() => {
  stopped = true
  if (typingTimer) window.clearTimeout(typingTimer)
})
</script>

<template>
  <section id="hero">
    <div class="hero-grid">
      <div class="hero-copy hero-enter">
        <div class="hero-kicker">status: open to opportunities</div>
        <h1 class="hero-name">Suman<br>Kumar</h1>
        <div class="hero-role">
          Software Developer <span class="pipe">/</span> Laravel <span class="pipe">/</span> Vue.js <span class="pipe">/</span> Nuxt
        </div>
        <p class="hero-desc">
          I build scalable, API-first web applications — from role-based SaaS platforms to
          real-time collaboration tools — with Laravel on the backend and Vue/Nuxt on the front. 3 years turning
          requirements into shipped, maintainable code.
        </p>
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary">View Projects</a>
          <a href="#contact" class="btn btn-ghost">Get In Touch</a>
        </div>
        <div class="hero-meta">
          <span>📍 Kolkata, India</span>
          <a href="mailto:sumankumarmca022@gmail.com">✉ sumankumarmca022@gmail.com</a>
          <a href="tel:8709583934">☎ 8709583934</a>
        </div>
        <div class="hero-meta" style="margin-top: 10px;">
          <a href="https://linkedin.com/in/sumanmca" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="https://github.com/SumanMCAMR" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </div>

      <div class="terminal hero-enter terminal-enter">
        <div class="terminal-bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
          <span class="terminal-title">GET /suman-kumar HTTP/1.1</span>
        </div>
        <div class="terminal-body">
          <div class="cmd">
            {{ typedCommand }}<span v-if="!responseStarted" class="cursor"></span>
          </div>
          <pre v-show="responseStarted" class="terminal-response"><code v-html="highlightedResponse"></code><span v-if="!responseComplete" class="cursor"></span></pre>
        </div>
      </div>
    </div>
  </section>
</template>
