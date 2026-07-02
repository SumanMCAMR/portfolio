<script setup lang="ts">
interface Certification {
  name: string
  issuer: string
  year?: string
  link?: string
}

const certs: Certification[] = [
  { 
    name: 'Project Management Foundations', 
    issuer: 'LinkedIn Learning', 
    link: 'https://www.linkedin.com/learning/certificates/120357064d6504edfe0be0483d861d982322752b6e6abbd05ed258e186de2c50?trk=share_certificate' 
  },
]
</script>

<template>
  <section id="certifications">
    <div class="req-line">
      <span class="method get">GET</span><span>/certifications</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Credentials</span>
    <h2 class="reveal">Certifications</h2>
    <p class="section-sub reveal">Professional courses and completed certifications.</p>

    <div class="cert-list">
      <div v-for="(cert, idx) in certs" :key="idx" class="cert-item reveal">
        <div>
          <div class="cert-name">
            <a v-if="cert.link" :href="cert.link" target="_blank" rel="noopener" class="cert-link">
              {{ cert.name }} ↗
            </a>
            <span v-else>{{ cert.name }}</span>
          </div>
          <div class="cert-issuer">{{ cert.issuer }}</div>
        </div>
        <div v-if="cert.year" class="cert-year">{{ cert.year }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cert-link {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
}
.cert-link:hover {
  color: var(--accent);
}
</style>
