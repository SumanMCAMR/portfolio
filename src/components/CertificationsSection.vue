<script setup lang="ts">
const certs = [
  { name: 'Add your certification title', issuer: 'Issuing organization', year: '20XX' },
  { name: 'Add your certification title', issuer: 'Issuing organization', year: '20XX' },
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
    <p class="section-sub reveal">Placeholder entries — add your actual certificates and issue years here.</p>

    <div class="cert-list">
      <div v-for="(cert, idx) in certs" :key="idx" class="cert-item reveal">
        <div>
          <div class="cert-name">{{ cert.name }}</div>
          <div class="cert-issuer">{{ cert.issuer }}</div>
        </div>
        <div class="cert-year">{{ cert.year }}</div>
      </div>
    </div>
  </section>
</template>
