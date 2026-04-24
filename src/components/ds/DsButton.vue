<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex shrink-0 items-center justify-center rounded-atmos-full px-atmos-md py-2.5 font-medium transition focus:outline-none focus:ring-2 focus:ring-atmos-primary/40 focus:ring-offset-2 focus:ring-offset-atmos-surface disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary'
        ? 'bg-gradient-to-r from-atmos-primaryContainer to-atmos-primary text-atmos-onPrimary'
        : 'border border-white/25 bg-white/10 text-atmos-onSurface backdrop-blur-md hover:bg-white/15',
    ]"
    data-ds="button"
  >
    <slot />
  </button>
</template>
