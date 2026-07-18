<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const menuOpen = ref(false)
const activeHref = ref('')
let sectionObserver: IntersectionObserver | undefined

const navItems = [
  { href: '#about', method: 'GET', label: '/about' },
  { href: '#skills', method: 'GET', label: '/skills' },
  { href: '#experience', method: 'GET', label: '/experience' },
  { href: '#projects', method: 'GET', label: '/projects' },
  { href: '#certifications', method: 'GET', label: '/certs' },
  { href: '#contact', method: 'POST', label: '/contact' },
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries.find((entry) => entry.isIntersecting)
      if (activeEntry) activeHref.value = `#${activeEntry.target.id}`
    },
    { rootMargin: '-24% 0px -68% 0px' },
  )

  navItems.forEach(({ href }) => {
    const section = document.querySelector(href)
    if (section) sectionObserver?.observe(section)
  })
})

onBeforeUnmount(() => sectionObserver?.disconnect())
</script>

<template>
  <nav>
    <a class="nav-logo" href="#hero" aria-label="Go to top">suman<span>.</span>dev</a>
    <button
      class="nav-toggle"
      type="button"
      aria-controls="primary-navigation"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      {{ menuOpen ? 'CLOSE' : 'MENU' }}
    </button>
    <ul id="primary-navigation" class="nav-links" :class="{ open: menuOpen }">
      <li v-for="item in navItems" :key="item.href">
        <a
          :href="item.href"
          :data-method="item.method"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          @click="closeMenu"
        >{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>
