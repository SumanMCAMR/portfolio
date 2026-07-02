import { computed, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type { MascotSkin, PetDirection, PetState } from '../types/pet'

interface TransitionOptions {
  durationMs?: number
  force?: boolean
}

const frameDurations: Record<PetState, number> = {
  idle: 900,
  walking: 220,
  waving: 420,
  sleeping: 1400,
  celebrating: 260,
  talking: 340,
  typing: 180,
}

export function usePetStateMachine(
  skin: MascotSkin,
  animationsEnabled: Ref<boolean>,
) {
  const state = ref<PetState>('idle')
  const previousState = ref<PetState>('idle')
  const frameIndex = ref(0)
  const direction = ref<PetDirection>('left')

  let frameTimer: ReturnType<typeof window.setInterval> | undefined
  let transitionTimer: ReturnType<typeof window.setTimeout> | undefined

  const frames = computed(() => skin.frames[state.value])
  const currentFrame = computed(() => frames.value[frameIndex.value] ?? frames.value[0])

  function clearFrameTimer() {
    if (frameTimer) window.clearInterval(frameTimer)
    frameTimer = undefined
  }

  function startFrameTimer() {
    clearFrameTimer()
    frameIndex.value = 0

    if (!animationsEnabled.value || frames.value.length < 2) return

    frameTimer = window.setInterval(() => {
      frameIndex.value = (frameIndex.value + 1) % frames.value.length
    }, frameDurations[state.value])
  }

  function transitionTo(nextState: PetState, options: TransitionOptions = {}) {
    if (!options.force && state.value === 'sleeping' && nextState !== 'idle') return

    if (transitionTimer) window.clearTimeout(transitionTimer)
    previousState.value = state.value
    state.value = nextState

    if (options.durationMs && nextState !== 'sleeping') {
      transitionTimer = window.setTimeout(() => {
        state.value = 'idle'
      }, options.durationMs)
    }
  }

  watch([state, animationsEnabled], startFrameTimer, { immediate: true })

  onBeforeUnmount(() => {
    clearFrameTimer()
    if (transitionTimer) window.clearTimeout(transitionTimer)
  })

  return {
    state,
    previousState,
    currentFrame,
    direction,
    transitionTo,
  }
}
