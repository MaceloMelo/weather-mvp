<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: []
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onSubmit() {
  emit('search')
}
</script>

<template>
  <form
    class="mx-auto mb-atmos-xl w-full max-w-lg"
    role="search"
    aria-label="Buscar local para previsão do tempo"
    @submit.prevent="onSubmit"
  >
    <label
      class="sr-only"
      for="weather-search-input"
    >Buscar cidade ou região</label>
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-5 flex items-center text-white/60"
      >
        <span
          class="material-symbols-outlined text-2xl leading-none"
          aria-hidden="true"
        >search</span>
      </div>
      <input
        id="weather-search-input"
        class="h-14 w-full rounded-atmos-full border border-white/20 bg-white/[0.15] py-2 pl-14 pr-6 text-atmos-body-md text-white shadow-lg backdrop-blur-3xl transition placeholder:text-white/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-atmos-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
        type="search"
        autocomplete="off"
        placeholder="Buscar cidade ou região…"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
      >
    </div>
    <p class="mt-atmos-sm text-center text-atmos-body-md text-atmos-onSurfaceVariant/90">
      Padrão:
      <span class="font-medium text-atmos-onSurface">Aracaju, Sergipe, BR</span>
      — ex.:
      <span class="font-medium text-atmos-onSurface">Curitiba, BR</span>
    </p>
  </form>
</template>
