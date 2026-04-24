<script setup lang="ts">
import type { GeoLocation } from '../../types/weather'

defineProps<{
  items: GeoLocation[]
}>()

const emit = defineEmits<{
  select: [item: GeoLocation]
}>()

function formatLine(item: GeoLocation): string {
  const parts = [item.name]
  if (item.state) {
    parts.push(item.state)
  }
  parts.push(item.country)
  return parts.join(', ')
}
</script>

<template>
  <div
    v-if="items.length > 0"
    class="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm"
  >
    <p class="border-b border-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-600">
      Resultados
    </p>
    <ul
      class="divide-y divide-slate-100"
      role="listbox"
      aria-label="Locais encontrados"
    >
      <li
        v-for="(item, index) in items"
        :key="`${item.lat}-${item.lon}-${index}`"
      >
        <button
          class="flex w-full items-center justify-between px-4 py-3 text-left text-slate-800 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
          type="button"
          :aria-label="`Ver tempo em ${formatLine(item)}`"
          @click="emit('select', item)"
        >
          <span class="font-medium">{{ formatLine(item) }}</span>
          <span class="text-xs text-slate-500">{{ item.lat.toFixed(2) }}, {{ item.lon.toFixed(2) }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
