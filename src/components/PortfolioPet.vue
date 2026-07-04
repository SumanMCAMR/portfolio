<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { sumanMascotSkin } from '../assets/mascots/suman/skin'
import { usePetBehavior } from '../composables/usePetBehavior'
import { usePetMessages } from '../composables/usePetMessages'
import { usePetStateMachine } from '../composables/usePetStateMachine'
import type { PetAction } from '../types/pet'
import PetSpeechBubble from './PetSpeechBubble.vue'

const messages = usePetMessages()
const animationGate = ref(true)
const stateMachine = usePetStateMachine(sumanMascotSkin, animationGate)
const behavior = usePetBehavior({
  transitionTo: (nextState, options) => stateMachine.transitionTo(nextState, options),
  showRotatingMessage: messages.showRotatingMessage,
  showSectionMessage: messages.showSectionMessage,
})

const confetti = ref<number[]>([])

watch(
  behavior.effectiveAnimationsEnabled,
  (enabled) => {
    animationGate.value = enabled
  },
  { immediate: true },
)

const petStyle = computed(() => ({
  right: `${behavior.position.value.right}px`,
  bottom: `${behavior.position.value.bottom}px`,
}))

const spriteClasses = computed(() => ({
  'pet-idle': stateMachine.state.value === 'idle',
  'pet-walk': stateMachine.state.value === 'walking',
  'pet-wave': stateMachine.state.value === 'waving',
  'pet-sleep': stateMachine.state.value === 'sleeping',
  'pet-celebrate': stateMachine.state.value === 'celebrating',
  'pet-talk': stateMachine.state.value === 'talking',
  'pet-type': stateMachine.state.value === 'typing',
  'motion-off': !behavior.effectiveAnimationsEnabled.value,
}))

function scrollToTarget(target?: string) {
  if (!target) return
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function runConfetti() {
  confetti.value = Array.from({ length: 14 }, (_, index) => index)
  window.setTimeout(() => {
    confetti.value = []
  }, 1200)
}

async function downloadResume(target?: string) {
  const resumePath = target ?? '/Suman_Kumar_Resume.pdf'

  try {
    const response = await fetch(resumePath, { method: 'HEAD' })
    if (!response.ok) throw new Error('Resume not found')

    const link = document.createElement('a')
    link.href = resumePath
    link.download = 'Suman-Kumar-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()

    stateMachine.transitionTo('celebrating', { durationMs: 1800, force: true })
    runConfetti()
    messages.showMessage({
      id: 'resume-downloaded',
      text: 'Resume download started. Thanks for taking a closer look.',
      state: 'celebrating',
    })
  } catch {
    messages.showMessage({
      id: 'resume-missing',
      text: 'Resume file is not available yet. Add it to public/ and update the mascot resume target.',
      state: 'talking',
      durationMs: 8000,
    })
  }
}

function handleAction(action: PetAction) {
  if (action.kind === 'scroll') {
    scrollToTarget(action.target)
    stateMachine.transitionTo(action.id === 'contact-me' ? 'waving' : 'walking', {
      durationMs: 1400,
      force: true,
    })
  }

  if (action.kind === 'download') {
    void downloadResume(action.target)
  }

  if (action.kind === 'toggleAnimations') {
    behavior.toggleAnimations()
  }
}

function openGuide() {
  messages.showGuideMessage()
  stateMachine.transitionTo('talking', { durationMs: 1200, force: true })
}
</script>

<template>
  <button
    v-if="!behavior.visible.value"
    class="fixed bottom-4 right-4 z-[90] rounded-full border border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-3 font-mono text-xs text-[color:var(--accent-2)] shadow-2xl transition hover:border-[color:var(--accent-2)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
    type="button"
    aria-label="Show portfolio guide mascot"
    @click="behavior.toggleVisible"
  >
    Guide
  </button>

  <div
    v-else
    class="portfolio-pet fixed z-[90] flex w-28 flex-col items-end sm:w-36"
    :style="petStyle"
    aria-label="Interactive portfolio guide mascot"
  >
    <PetSpeechBubble
      v-if="messages.currentMessage.value"
      :message="messages.currentMessage.value"
      :animations-enabled="behavior.effectiveAnimationsEnabled.value"
      @action="handleAction"
      @close="messages.hideMessage"
    />

    <div class="absolute -top-3 right-0 flex gap-1">
      <button
        class="pet-mini-btn"
        type="button"
        :aria-label="behavior.animationsEnabled.value ? 'Disable mascot animations' : 'Enable mascot animations'"
        @click="behavior.toggleAnimations"
      >
        {{ behavior.animationsEnabled.value ? 'II' : '▶' }}
      </button>
      <button
        class="pet-mini-btn"
        type="button"
        aria-label="Hide portfolio guide mascot"
        @click="behavior.toggleVisible"
      >
        ×
      </button>
    </div>

    <button
      class="pet-stage relative mt-4 grid aspect-square w-full place-items-end focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
      type="button"
      aria-label="Open portfolio guide actions"
      @click="openGuide"
    >
      <span v-if="stateMachine.state.value === 'sleeping'" class="zzz" aria-hidden="true">Zzz</span>
      <span
        v-for="piece in confetti"
        :key="piece"
        class="confetti-piece"
        :style="{ '--i': piece }"
        aria-hidden="true"
      ></span>
      <img
        class="pet-sprite"
        :class="spriteClasses"
        :src="stateMachine.currentFrame.value"
        :alt="sumanMascotSkin.alt"
        draggable="false"
      >
    </button>
  </div>
</template>

<style scoped>
.pet-mini-btn {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--bg-alt);
  color: var(--text-dim);
  font-family: var(--mono);
  font-size: 12px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.pet-mini-btn:hover,
.pet-mini-btn:focus {
  border-color: var(--accent-2);
  color: var(--accent-2);
  outline: none;
}

.pet-stage {
  border-radius: 999px;
  touch-action: manipulation;
}

.pet-sprite {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  filter: drop-shadow(0 18px 18px rgba(0, 0, 0, 0.45));
  transform-origin: 50% 100%;
  user-select: none;
}

.pet-idle {
  animation: pet-breathe 2.8s ease-in-out infinite;
}

.pet-walk {
  animation: pet-walk 380ms steps(2) infinite;
}

.pet-wave {
  animation: pet-wave 700ms ease-in-out infinite;
}

.pet-sleep {
  animation: pet-sleep 3s ease-in-out infinite;
}

.pet-celebrate {
  animation: pet-celebrate 520ms ease-in-out infinite;
}

.pet-talk {
  animation: pet-talk 520ms ease-in-out infinite;
}

.pet-type {
  animation: pet-type 240ms steps(2) infinite;
}

.motion-off {
  animation: none;
}

.zzz {
  position: absolute;
  top: 8%;
  right: 8%;
  z-index: 2;
  color: #ffffff;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
  animation: zzz-rise 1.8s ease-in-out infinite;
}

.confetti-piece {
  --angle: calc(var(--i) * 25deg);
  position: absolute;
  left: 50%;
  top: 20%;
  width: 5px;
  height: 10px;
  border-radius: 2px;
  background: hsl(calc(var(--i) * 38), 80%, 60%);
  transform: rotate(var(--angle));
  animation: confetti-pop 950ms ease-out forwards;
}

@keyframes pet-breathe {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.015);
  }
}

@keyframes pet-walk {
  0%, 100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-6px) rotate(1deg);
  }
}

@keyframes pet-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-4deg) translateY(-3px);
  }
}

@keyframes pet-sleep {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.94;
  }
  50% {
    transform: translateY(2px) scale(0.985);
    opacity: 1;
  }
}

@keyframes pet-celebrate {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}

@keyframes pet-talk {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px) scale(1.01);
  }
}

@keyframes pet-type {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px);
  }
}

@keyframes zzz-rise {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.9);
  }
  45% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateY(-18px) scale(1.1);
  }
}

@keyframes confetti-pop {
  to {
    opacity: 0;
    transform: translate(
        calc(cos(var(--angle)) * 72px),
        calc(sin(var(--angle)) * -72px)
      )
      rotate(240deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pet-sprite,
  .zzz,
  .confetti-piece {
    animation: none !important;
  }
}
</style>
