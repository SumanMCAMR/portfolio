<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import PortfolioPet from './components/PortfolioPet.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    },
    { threshold: 0.15 }
  )
  revealEls.forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="grid-bg"></div>
  <NavBar />
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <ExperienceSection />
  <ProjectsSection />
  <CertificationsSection />
  <ContactSection />
  <FooterSection />
  <PortfolioPet />
</template>
