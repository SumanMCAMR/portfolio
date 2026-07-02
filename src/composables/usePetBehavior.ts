import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { PetPosition, PetSection, PetState } from '../types/pet'

interface BehaviorHandlers {
  transitionTo: (state: PetState, options?: { durationMs?: number; force?: boolean }) => void
  showRotatingMessage: () => void
  showSectionMessage: (section: PetSection) => void
}

const storageKeys = {
  visible: 'portfolio-pet-visible',
  animations: 'portfolio-pet-animations',
}

function readStoredBoolean(key: string, fallback: boolean) {
  const stored = window.localStorage.getItem(key)
  return stored === null ? fallback : stored === 'true'
}

export function usePetBehavior(handlers: BehaviorHandlers) {
  const visible = ref(true)
  const animationsEnabled = ref(true)
  const prefersReducedMotion = ref(false)
  const isPageHidden = ref(false)
  const position = ref<PetPosition>({ right: 24, bottom: 22 })
  const asleep = ref(false)

  const effectiveAnimationsEnabled = computed(
    () => animationsEnabled.value && !prefersReducedMotion.value && !isPageHidden.value,
  )

  let inactivityTimer: ReturnType<typeof window.setTimeout> | undefined
  let walkTimer: ReturnType<typeof window.setTimeout> | undefined
  let scrollTimer: ReturnType<typeof window.setTimeout> | undefined
  let messageTimer: ReturnType<typeof window.setTimeout> | undefined
  let lastScrollY = 0
  let lastSection = ''
  let motionQuery: MediaQueryList | undefined
  let sectionObserver: IntersectionObserver | undefined

  function handleMotionChange(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches
  }

  function clampPosition(nextRight: number) {
    const bubbleWidth = Math.min(window.innerWidth * 0.82, 320)
    const bubbleSafeRight = Math.max(12, window.innerWidth - bubbleWidth - 12)
    const maxTravelRight = window.innerWidth < 640 ? 48 : 220
    const maxRight = Math.max(12, Math.min(maxTravelRight, bubbleSafeRight))
    position.value = {
      right: Math.min(Math.max(12, nextRight), maxRight),
      bottom: window.innerWidth < 640 ? 12 : 22,
    }
  }

  function persist() {
    window.localStorage.setItem(storageKeys.visible, String(visible.value))
    window.localStorage.setItem(storageKeys.animations, String(animationsEnabled.value))
  }

  function setVisible(nextVisible: boolean) {
    visible.value = nextVisible
    persist()
  }

  function toggleVisible() {
    setVisible(!visible.value)
  }

  function toggleAnimations() {
    animationsEnabled.value = !animationsEnabled.value
    persist()
  }

  function scheduleWalk() {
    if (walkTimer) window.clearTimeout(walkTimer)

    const delay = 15000 + Math.random() * 15000
    walkTimer = window.setTimeout(() => {
      if (visible.value && effectiveAnimationsEnabled.value && !asleep.value) {
        const delta = Math.round((Math.random() - 0.5) * 180)
        clampPosition(position.value.right + delta)
        handlers.transitionTo('walking', { durationMs: 1300 })
      }
      scheduleWalk()
    }, delay)
  }

  function resetInactivity() {
    if (inactivityTimer) window.clearTimeout(inactivityTimer)

    if (asleep.value) {
      asleep.value = false
      handlers.transitionTo('idle', { force: true })
    }

    inactivityTimer = window.setTimeout(() => {
      if (!visible.value) return
      asleep.value = true
      handlers.transitionTo('sleeping', { force: true })
    }, 60000)
  }

  function handleScroll() {
    resetInactivity()
    if (!visible.value || asleep.value) return

    const currentY = window.scrollY
    const scrollingDown = currentY > lastScrollY
    lastScrollY = currentY
    clampPosition(scrollingDown ? 24 : 96)
    handlers.transitionTo('walking', { durationMs: 800 })

    if (!scrollTimer) {
      scrollTimer = window.setTimeout(() => {
        scrollTimer = undefined
      }, 1200)
    }
  }

  function scheduleMessageRotation() {
    if (messageTimer) window.clearTimeout(messageTimer)
    messageTimer = window.setTimeout(() => {
      if (visible.value && !asleep.value) handlers.showRotatingMessage()
      scheduleMessageRotation()
    }, 22000 + Math.random() * 12000)
  }

  function handleVisibilityChange() {
    isPageHidden.value = document.hidden
  }

  function handleResize() {
    clampPosition(position.value.right)
  }

  function setupSectionObserver() {
    const sections: PetSection[] = ['projects', 'experience', 'skills', 'contact']
    sectionObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const id = active?.target.id as PetSection | undefined
        if (id && id !== lastSection) {
          lastSection = id
          handlers.showSectionMessage(id)
          if (id === 'projects') handlers.transitionTo('walking', { durationMs: 1200 })
          if (id === 'experience') handlers.transitionTo('typing', { durationMs: 1800 })
          if (id === 'skills') handlers.transitionTo('celebrating', { durationMs: 1400 })
          if (id === 'contact') handlers.transitionTo('waving', { durationMs: 1600 })
        }
      },
      { threshold: 0.45 },
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver?.observe(el)
    })
  }

  onMounted(() => {
    visible.value = readStoredBoolean(storageKeys.visible, true)
    animationsEnabled.value = readStoredBoolean(storageKeys.animations, true)
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = motionQuery.matches

    motionQuery.addEventListener('change', handleMotionChange)
    window.addEventListener('mousemove', resetInactivity, { passive: true })
    window.addEventListener('touchstart', resetInactivity, { passive: true })
    window.addEventListener('keydown', resetInactivity)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    lastScrollY = window.scrollY
    clampPosition(position.value.right)
    resetInactivity()
    scheduleWalk()
    scheduleMessageRotation()
    setupSectionObserver()
  })

  onBeforeUnmount(() => {
    if (inactivityTimer) window.clearTimeout(inactivityTimer)
    if (walkTimer) window.clearTimeout(walkTimer)
    if (scrollTimer) window.clearTimeout(scrollTimer)
    if (messageTimer) window.clearTimeout(messageTimer)
    window.removeEventListener('mousemove', resetInactivity)
    window.removeEventListener('touchstart', resetInactivity)
    window.removeEventListener('keydown', resetInactivity)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    motionQuery?.removeEventListener('change', handleMotionChange)
    sectionObserver?.disconnect()
  })

  return {
    visible,
    animationsEnabled,
    effectiveAnimationsEnabled,
    prefersReducedMotion,
    position,
    asleep,
    toggleVisible,
    toggleAnimations,
  }
}
