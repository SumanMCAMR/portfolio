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
    class="pet-bubble absolute bottom-[calc(100%+10px)] right-0 w-[min(82vw,320px)] rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-alt)] p-[21px] text-left font-sans text-sm text-[color:var(--text)] shadow-2xl"
    :class="{ 'motion-off': !animationsEnabled }"
    role="status"
    aria-live="polite"
  >
    <button
      class="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md border border-transparent text-[color:var(--text-dim)] transition hover:border-[color:var(--line)] hover:text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
      type="button"
      aria-label="Close mascot message"
      @click="emit('close')"
    >
      ×
    </button>

    <p class="pr-10 leading-6">{{ message.text }}</p>

    <div v-if="message.actions?.length" class="mt-3 flex flex-wrap gap-2">
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
  transform-origin: bottom right;
  animation: bubble-pop 180ms ease-out both;
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
