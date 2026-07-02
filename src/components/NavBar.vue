<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

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
</script>

<template>
  <nav>
    <div class="nav-logo">suman<span>.</span>dev</div>
    <button class="nav-toggle" @click="toggleMenu">MENU</button>
    <ul class="nav-links" :class="{ open: menuOpen }">
      <li v-for="item in navItems" :key="item.href">
        <a :href="item.href" :data-method="item.method" @click="closeMenu">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>
