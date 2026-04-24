<script setup lang="ts">
withDefaults(
  defineProps<{
    brand?: string
  }>(),
  {
    brand: 'Atmos',
  },
)

const emit = defineEmits<{
  'location-click': []
  'settings-click': []
}>()
</script>

<template>
  <header
    class="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-xl dark:bg-atmos-surfaceContainerLow/40"
    data-ds="top-app-bar"
  >
    <div
      class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-atmos-lg font-sans tracking-tight antialiased"
    >
      <div class="text-2xl font-bold text-white">
        {{ brand }}
      </div>

      <nav
        class="hidden items-center gap-atmos-lg md:flex"
        aria-label="Principal"
      >
        <slot name="nav" />
      </nav>

      <div class="flex items-center gap-atmos-md">
        <button
          type="button"
          class="rounded-full p-2 text-white transition hover:bg-white/10 active:scale-95"
          aria-label="Localização"
          @click="emit('location-click')"
        >
          <span
            class="material-symbols-outlined text-2xl leading-none"
            aria-hidden="true"
          >location_on</span>
        </button>
        <button
          type="button"
          class="rounded-full p-2 text-white transition hover:bg-white/10 active:scale-95"
          aria-label="Configurações"
          @click="emit('settings-click')"
        >
          <span
            class="material-symbols-outlined text-2xl leading-none"
            aria-hidden="true"
          >settings</span>
        </button>
      </div>
    </div>
  </header>
</template>
