<script setup lang="ts">
const skillGroups = [
  { key: '"languages"', tags: ['PHP', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'jQuery'] },
  { key: '"frameworks"', tags: ['Laravel', 'Vue.js', 'Nuxt 3', 'React', 'Next.js'] },
  { key: '"backend"', tags: ['REST APIs', 'MVC', 'Sanctum', 'Passport', 'Queues & Jobs', 'Artisan CLI', 'Eloquent ORM'] },
  { key: '"frontend"', tags: ['SPA Development', 'Axios', 'Pinia', 'Vuex'] },
  { key: '"database"', tags: ['MySQL', 'PostgreSQL'] },
  { key: '"tools_and_concepts"', tags: ['Git', 'GitHub', 'Postman', 'Composer', 'Microservices', 'Caching'] },
]
</script>

<template>
  <section id="skills">
    <div class="req-line">
      <span class="method get">GET</span><span>/skills</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Toolbox</span>
    <h2 class="reveal">Technical Skills</h2>
    <p class="section-sub reveal">The languages, frameworks, and tools I use to build and ship.</p>

    <div class="skill-groups">
      <div v-for="group in skillGroups" :key="group.key" class="skill-card reveal">
        <span class="key">{{ group.key }}</span>
        <div class="tag-row">
          <span v-for="tag in group.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
