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
    class="flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-end"
    role="search"
    aria-label="Buscar local para previsão do tempo"
    @submit.prevent="onSubmit"
  >
    <div class="min-w-0 flex-1">
      <label
        class="mb-1 block text-left text-sm font-medium text-slate-700"
        for="weather-search-input"
      >
        Cidade, estado ou país
      </label>
      <input
        id="weather-search-input"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:bg-slate-100"
        type="search"
        autocomplete="off"
        placeholder="Ex.: São Paulo, SP, BR ou Londres, GB"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
      >
    </div>
    <button
      class="inline-flex shrink-0 items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
      type="submit"
      :disabled="disabled"
    >
      Buscar
    </button>
  </form>
</template>
