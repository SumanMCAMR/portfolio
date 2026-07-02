import { onBeforeUnmount, ref } from 'vue'
import type { PetMessage, PetSection } from '../types/pet'

const guideActions = [
  { id: 'view-projects', label: 'View Projects', kind: 'scroll' as const, target: '#projects' },
  { id: 'see-experience', label: 'See Experience', kind: 'scroll' as const, target: '#experience' },
  {
    id: 'download-resume',
    label: 'Download Resume',
    kind: 'download' as const,
    target: '/Suman_Kumar_Laravel_Resume.pdf',
  },
  { id: 'contact-me', label: 'Contact Me', kind: 'scroll' as const, target: '#contact' },
]

const rotatingMessages = [
  "Hi, I'm Suman's coding companion.",
  'Welcome to my portfolio.',
  'I specialize in Laravel and Vue.js.',
  'I enjoy building scalable web applications.',
  'Check out my latest projects.',
  'Feel free to download my resume.',
  "Let's connect if you're hiring.",
]

const sectionMessages: Record<PetSection, PetMessage> = {
  projects: {
    id: 'section-projects',
    text: 'Take a look at some of my Laravel and Vue.js work.',
    state: 'walking',
    actions: [guideActions[0]],
  },
  experience: {
    id: 'section-experience',
    text: "Here's where I've been building scalable web applications.",
    state: 'typing',
    actions: [guideActions[1]],
  },
  skills: {
    id: 'section-skills',
    text: 'This is the toolbox I use to build and ship reliable products.',
    state: 'celebrating',
  },
  contact: {
    id: 'section-contact',
    text: "Let's connect and discuss opportunities.",
    state: 'waving',
    actions: [guideActions[3]],
  },
}

export function usePetMessages() {
  const currentMessage = ref<PetMessage | null>(null)
  let messageTimer: ReturnType<typeof window.setTimeout> | undefined
  let rotateIndex = 0

  function hideMessage() {
    currentMessage.value = null
    if (messageTimer) window.clearTimeout(messageTimer)
    messageTimer = undefined
  }

  function showMessage(message: PetMessage) {
    if (messageTimer) window.clearTimeout(messageTimer)
    currentMessage.value = message

    if (message.durationMs !== 0) {
      messageTimer = window.setTimeout(hideMessage, message.durationMs ?? 7000)
    }
  }

  function showGuideMessage() {
    showMessage({
      id: 'guide-menu',
      text: 'Need the quick tour? I can take you to the key sections.',
      state: 'talking',
      durationMs: 0,
      actions: guideActions,
    })
  }

  function showRotatingMessage() {
    if (currentMessage.value?.durationMs === 0) return

    const text = rotatingMessages[rotateIndex % rotatingMessages.length]
    rotateIndex += 1
    showMessage({
      id: `rotation-${rotateIndex}`,
      text,
      state: 'talking',
      durationMs: 5500,
    })
  }

  function showSectionMessage(section: PetSection) {
    if (currentMessage.value?.durationMs === 0) return

    showMessage({ ...sectionMessages[section], durationMs: 7000 })
  }

  onBeforeUnmount(() => {
    if (messageTimer) window.clearTimeout(messageTimer)
  })

  return {
    currentMessage,
    showMessage,
    showGuideMessage,
    showRotatingMessage,
    showSectionMessage,
    hideMessage,
  }
}
