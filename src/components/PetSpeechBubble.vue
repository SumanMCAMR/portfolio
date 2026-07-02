<script setup lang="ts">
import type { PetAction, PetMessage } from '../types/pet'

defineProps<{
  message: PetMessage
  animationsEnabled: boolean
}>()

const emit = defineEmits<{
  action: [action: PetAction]
  close: []
}>()
</script>

<template>
  <aside
    class="pet-bubble absolute bottom-[calc(100%+10px)] right-0 w-[min(82vw,340px)] rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-alt)] text-left font-sans text-sm text-[color:var(--text)] shadow-2xl"
    :class="{ 'motion-off': !animationsEnabled }"
    role="status"
    aria-live="polite"
  >
    <button
      class="pet-bubble-close"
      type="button"
      aria-label="Close mascot message"
      @click="emit('close')"
    >
      ×
    </button>

    <p class="pet-bubble-text">{{ message.text }}</p>

    <div v-if="message.actions?.length" class="pet-bubble-actions">
      <button
        v-for="action in message.actions"
        :key="action.id"
        class="rounded-md border border-[color:var(--line)] bg-[rgba(94,234,212,0.08)] px-3 py-2 font-mono text-xs text-[color:var(--accent-2)] transition hover:border-[color:var(--accent-2)] hover:bg-[rgba(94,234,212,0.14)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
        type="button"
        @click="emit('action', action)"
      >
        {{ action.label }}
      </button>
    </div>
  </aside>
</template>

<style scoped>
.pet-bubble {
  padding: 18px 50px 18px 20px;
  transform-origin: bottom right;
  animation: bubble-pop 180ms ease-out both;
}

.pet-bubble-close {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(22, 27, 39, 0.82);
  color: var(--text-dim);
  font-size: 22px;
  line-height: 1;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.pet-bubble-close:hover,
.pet-bubble-close:focus {
  border-color: var(--line);
  background: var(--bg-raise);
  color: var(--text);
  outline: none;
}

.pet-bubble-close:focus {
  box-shadow: 0 0 0 2px var(--accent-2);
}

.pet-bubble-text {
  max-width: 100%;
  padding-right: 8px;
  line-height: 1.55;
}

.pet-bubble-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.pet-bubble::after {
  content: '';
  position: absolute;
  right: 34px;
  bottom: -8px;
  width: 14px;
  height: 14px;
  background: var(--bg-alt);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transform: rotate(45deg);
}

.motion-off {
  animation: none;
}

@media (max-width: 480px) {
  .pet-bubble {
    padding: 16px 46px 16px 18px;
  }
}

@keyframes bubble-pop {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
