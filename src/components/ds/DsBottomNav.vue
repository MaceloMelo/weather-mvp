<script setup lang="ts">
export type BottomNavItemId = 'home' | 'forecast' | 'radar'

withDefaults(
  defineProps<{
    activeId?: BottomNavItemId
  }>(),
  {
    activeId: 'home',
  },
)

const emit = defineEmits<{
  navigate: [id: BottomNavItemId]
}>()

const items: { id: BottomNavItemId; label: string; icon: string }[] = [
  { id: 'home', label: 'Início', icon: 'cloud' },
  { id: 'forecast', label: 'Previsão', icon: 'calendar_month' },
  { id: 'radar', label: 'Radar', icon: 'map' },
]

function onSelect(id: BottomNavItemId) {
  emit('navigate', id)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 z-50 w-full rounded-t-[32px] border-t border-white/20 bg-white/10 backdrop-blur-2xl dark:bg-black/20"
    aria-label="Navegação inferior"
    data-ds="bottom-nav"
  >
    <div
      class="flex h-24 items-center justify-around px-atmos-lg pb-6 pt-3"
    >
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="flex flex-col items-center justify-center rounded-full p-3 transition active:scale-90"
        :class="
          activeId === item.id
            ? 'bg-white/20 text-white dark:bg-atmos-primary/20 dark:text-atmos-primary'
            : 'text-white/50 hover:text-white dark:text-atmos-onSurfaceVariant dark:hover:text-atmos-onSurface'
        "
        :aria-current="activeId === item.id ? 'page' : undefined"
        @click="onSelect(item.id)"
      >
        <span
          class="material-symbols-outlined"
          aria-hidden="true"
        >{{ item.icon }}</span>
        <span
          class="mt-1 text-[11px] font-medium uppercase tracking-widest"
        >{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
