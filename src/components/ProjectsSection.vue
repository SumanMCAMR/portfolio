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
    name: 'AR Restaurant Menu',
    badge: 'personal',
    desc: 'QR-based AR menu experience for restaurants. Customers scan a QR code to view 3D food models on their table using browser-based WebXR — no app installation required.',
    stack: ['Laravel 12', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'WebXR', 'Three.js'],
    link: 'https://github.com/SumanMCAMR/AR_web_app_restaurant',
  },
  {
    name: 'Project Management System',
    badge: 'production',
    desc: 'Role-based PMS with real-time collaboration and multimodule REST API integrations, built for cross-team workflow tracking.',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'Sanctum'],
  },
  {
    name: 'Multi-tenant SaaS Platform',
    badge: 'production',
    desc: 'Microservices-based SaaS product with Laravel APIs and a Vue.js frontend, optimized for caching and query performance.',
    stack: ['Laravel', 'Vue.js', 'Microservices', 'Redis'],
  },
  {
    name: 'Reusable Component Library',
    badge: 'internal',
    desc: 'A set of reusable Vue.js components used across internal products, cutting frontend build time on new features.',
    stack: ['Vue.js', 'Pinia', 'Axios'],
  },
  {
    name: 'Auth & API Gateway',
    badge: 'production',
    desc: 'Authentication system and API endpoints built with Laravel Sanctum/Passport, backing multiple client applications.',
    stack: ['Laravel', 'Passport', 'REST'],
  },
]
</script>

<template>
  <section id="projects">
    <div class="req-line">
      <span class="method get">GET</span><span>/projects</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Selected Work</span>
    <h2 class="reveal">Projects</h2>
    <p class="section-sub reveal">Built from real work history — swap in your live demos, repos, and case studies.</p>

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
        <span v-if="project.link" class="proj-link">View on GitHub ↗</span>
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
