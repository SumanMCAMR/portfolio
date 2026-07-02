<script setup lang="ts">
const projects = [
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
      <div v-for="project in projects" :key="project.name" class="proj-card reveal">
        <div class="proj-top">
          <span class="proj-name">{{ project.name }}</span>
          <span class="badge">{{ project.badge }}</span>
        </div>
        <p class="proj-desc">{{ project.desc }}</p>
        <div class="proj-stack">
          <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
        </div>
      </div>

      <div class="edit-note reveal">
        <b>Note:</b> These four projects are drafted from your resume's experience section. Replace the names,
        descriptions, and stacks with your specific projects — and add a link/badge for each once you have live
        demos or GitHub repos to point to.
      </div>
    </div>
  </section>
</template>
