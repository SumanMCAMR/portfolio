<template>
  <section id="about">
    <div class="req-line">
      <span class="method get">GET</span><span>/about</span>
      <span class="status">200 OK</span>
    </div>
    <span class="eyebrow">Profile</span>
    <h2 class="reveal">About Me</h2>
    <p class="section-sub reveal">A short summary of how I work and what I care about.</p>

    <div class="about-grid">
      <div class="about-text reveal">
        <p>
          I'm a <strong>Software Developer</strong> based in Kolkata with three years of experience designing and
          shipping web applications end to end. My core stack is <strong>Laravel</strong> for robust, secure backends
          and <strong>Vue.js / Nuxt 3</strong> for fast, componentized frontends.
        </p>
        <p>
          I've worked across project management systems, SaaS products, and microservice-based platforms —
          focusing on clean REST API design, database performance, and reusable component architecture. I care about
          writing code that the next developer can actually read, and about shaving milliseconds off response times
          when it matters.
        </p>
        <p>
          Outside of feature work, I enjoy code reviews, tightening query performance, and keeping teams aligned
          on coding standards.
        </p>
      </div>
      <div class="reveal">
        <div class="stat-card">
          <div class="num">3+</div>
          <div class="label">Years of Experience</div>
        </div>
        <div class="stat-card">
          <div class="num">30%</div>
          <div class="label">Faster API Response (PMS Project)</div>
        </div>
        <div class="stat-card">
          <div class="num">25%</div>
          <div class="label">Performance Gain via SQL Optimization</div>
        </div>
      </div>
    </div>
  </section>
</template>
