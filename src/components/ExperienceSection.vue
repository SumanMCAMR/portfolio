<script setup lang="ts">
interface TimelineItem {
  role: string
  date: string
  org: string
  points?: string[]
}

const items: TimelineItem[] = [
  {
    role: 'Software Developer',
    date: 'Aug 2024 — Present',
    org: 'Webskitters Technology Solutions Pvt. Ltd, Kolkata',
    points: [
      'Developed a scalable Project Management System (PMS) with role-based access and real-time collaboration.',
      'Designed and implemented REST APIs in Laravel for multimodule integrations.',
      'Engineered reusable Vue.js components, reducing frontend development time.',
      'Contributed to a SaaS platform using Laravel and Vue.js with microservices architecture.',
      'Optimized database queries and API caching, improving response time by up to 30%.',
      'Participated in code reviews and enforced coding standards across the team.',
    ],
  },
  {
    role: 'Software Developer',
    date: 'Jun 2023 — Aug 2024',
    org: 'WebReinvent Technologies Pvt. Ltd, New Delhi',
    points: [
      'Developed backend features in Laravel, including authentication systems and API endpoints.',
      'Built reusable Vue.js components integrated with REST APIs.',
      'Improved application performance by 25% through SQL optimization and caching.',
    ],
  },
  {
    role: 'MCA, Computer Applications',
    date: '2021 — 2023',
    org: 'Manav Rachna International Institute of Research and Studies · CGPA 7.8',
  },
  {
    role: 'BCA, Computer Applications',
    date: '2016 — 2019',
    org: 'B.S.S College, Supaul · 78%',
  },
]
</script>

<template>
  <section id="experience">
    <div class="req-line">
      <span class="method get">GET</span><span>/experience</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Work History</span>
    <h2 class="reveal">Experience</h2>
    <p class="section-sub reveal">Two roles, one continuous thread: Laravel backends, Vue/Nuxt frontends.</p>

    <div class="timeline reveal reveal-path">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="tl-item reveal"
        :style="{ '--reveal-order': idx }"
      >
        <div class="tl-head">
          <span class="tl-role">{{ item.role }}</span>
          <span class="tl-date">{{ item.date }}</span>
        </div>
        <div class="tl-org">{{ item.org }}</div>
        <ul v-if="item.points" class="tl-list">
          <li v-for="(point, pIdx) in item.points" :key="pIdx">{{ point }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
