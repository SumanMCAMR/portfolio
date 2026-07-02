<script setup lang="ts">
import { ref, onMounted } from 'vue'

const terminalBody = ref<HTMLElement | null>(null)

const jsonHtml = `{
  <span class="json-key">"name"</span>: <span class="json-str">"Suman Kumar"</span>,
  <span class="json-key">"role"</span>: <span class="json-str">"Software Developer"</span>,
  <span class="json-key">"stack"</span>: [<span class="json-str">"Laravel"</span>, <span class="json-str">"Vue.js"</span>, <span class="json-str">"Nuxt 3"</span>],
  <span class="json-key">"experience_years"</span>: 3,
  <span class="json-key">"location"</span>: <span class="json-str">"Kolkata, India"</span>,
  <span class="json-key">"status"</span>: <span class="json-str">"available_for_hire"</span>
}`

async function typeTerminal() {
  const body = terminalBody.value
  if (!body) return

  const cmdEl = document.createElement('div')
  cmdEl.className = 'cmd'
  body.appendChild(cmdEl)

  const cmdText = '$ curl -s api.sumankumar.dev/v1/profile'
  for (let i = 0; i <= cmdText.length; i++) {
    cmdEl.innerHTML = cmdText.slice(0, i) + '<span class="cursor"></span>'
    await new Promise(r => setTimeout(r, 18))
  }
  cmdEl.innerHTML = cmdText
  await new Promise(r => setTimeout(r, 300))

  const pre = document.createElement('pre')
  pre.style.marginTop = '14px'
  body.appendChild(pre)
  pre.innerHTML = jsonHtml
  pre.style.opacity = '0'
  pre.style.transition = 'opacity 0.5s ease'
  requestAnimationFrame(() => (pre.style.opacity = '1'))
}

onMounted(() => {
  typeTerminal()
})
</script>

<template>
  <section id="hero">
    <div class="hero-grid">
      <div class="reveal visible">
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

      <div class="terminal reveal visible">
        <div class="terminal-bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
          <span class="terminal-title">GET /suman-kumar HTTP/1.1</span>
        </div>
        <div class="terminal-body" ref="terminalBody"></div>
      </div>
    </div>
  </section>
</template>
