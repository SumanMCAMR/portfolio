<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
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
import ScrollPath from './components/ScrollPath.vue'

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach((el) => el.classList.add('visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('visible')
        revealObserver?.unobserve(e.target)
      })
    },
    { threshold: 0.15 }
  )
  revealEls.forEach((el) => revealObserver?.observe(el))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<template>
  <div class="grid-bg"></div>
  <ScrollPath />
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
