<script setup lang="ts">
interface Project {
  name: string
  badge: string
  desc: string
  stack: string[]
  link?: string
}

const projects: Project[] = [
  {
    name: 'Bullfincher',
    badge: 'webskitters technology',
    desc: 'A visual-first business intelligence, data and research platform. Features dynamic charts, company financials, stock screeners, earnings calendars, and SEC filings — making corporate storytelling easier through interactive visuals.',
    stack: ['Laravel', 'Vue.js', 'Highcharts', 'MySQL', 'jQuery', 'REST API'],
    link: 'https://bullfincher.io',
  },
  {
    name: 'MyWhiteCoats',
    badge: 'webskitters technology',
    desc: 'Healthcare platform connecting patients with doctors. Features OTP-based authentication, appointment booking, real-time messaging, e-prescriptions, pharmacy locator, and a full admin dashboard.',
    stack: ['Laravel', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Bootstrap'],
    link: 'https://mywhitecoats.com',
  },
  {
    name: 'AR Restaurant Menu',
    badge: 'personal',
    desc: 'QR-based AR menu experience for restaurants. Customers scan a QR code to view 3D food models on their table using browser-based WebXR — no app installation required.',
    stack: ['Laravel 12', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'WebXR', 'Three.js'],
    link: 'https://github.com/SumanMCAMR/AR_web_app_restaurant',
  },
  {
    name: 'Ride-Sharing App',
    badge: 'personal',
    desc: 'Full-stack ride-hailing platform with real-time driver tracking, OTP verification via Twilio, WebSocket-based live updates using Pusher, and complete rider/driver workflows.',
    stack: ['Laravel', 'Vue 3', 'Pinia', 'Pusher', 'Twilio', 'MySQL'],
    link: 'https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel',
  },
]

function linkLabel(link: string): string {
  return link.includes('github.com') ? 'View on GitHub ↗' : 'Visit Website ↗'
}
</script>

<template>
  <section id="projects">
    <div class="req-line">
      <span class="method get">GET</span><span>/projects</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Selected Work</span>
    <h2 class="reveal">Projects</h2>
    <p class="section-sub reveal">A mix of professional and personal projects I've built and contributed to.</p>

    <div class="proj-grid">
      <component
        v-for="project in projects"
        :key="project.name"
        :is="project.link ? 'a' : 'div'"
        :href="project.link"
        :target="project.link ? '_blank' : undefined"
        :rel="project.link ? 'noopener' : undefined"
        class="proj-card reveal"
      >
        <div class="proj-top">
          <span class="proj-name">{{ project.name }}</span>
          <span class="badge">{{ project.badge }}</span>
        </div>
        <p class="proj-desc">{{ project.desc }}</p>
        <div class="proj-stack">
          <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
        </div>
        <span v-if="project.link" class="proj-link">{{ linkLabel(project.link) }}</span>
      </component>
    </div>
  </section>
</template>

<style scoped>
.proj-link {
  display: inline-block;
  margin-top: 12px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent-2);
  transition: color 0.2s ease;
}
a.proj-card:hover .proj-link {
  color: var(--accent);
}
</style>
