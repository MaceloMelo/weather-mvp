<script setup lang="ts">
/**
 * Placeholder alinhado ao layout Stitch até integração com API de previsão (Human Gate).
 */
</script>

<template>
  <section
    class="w-full"
    aria-labelledby="forecast-strip-title"
  >
    <div
      class="mb-atmos-md flex items-center justify-between"
    >
      <h2
        id="forecast-strip-title"
        class="text-atmos-headline-md text-white"
      >
        Previsão para 5 dias
      </h2>
      <button
        type="button"
        disabled
        class="flex cursor-not-allowed items-center gap-atmos-xs text-atmos-label-caps text-atmos-onSurfaceVariant opacity-60"
        title="Disponível em breve"
      >
        Ver detalhes
        <span
          class="material-symbols-outlined text-sm"
          aria-hidden="true"
        >arrow_forward</span>
      </button>
    </div>
    <div
      class="flex gap-atmos-md overflow-x-auto pb-atmos-md no-scrollbar"
    >
      <div
        class="atmos-glass-panel flex min-w-[140px] flex-1 flex-col items-center gap-atmos-sm rounded-3xl p-atmos-md opacity-70"
      >
        <span class="text-atmos-label-caps text-white/60">—</span>
        <span
          class="material-symbols-outlined text-3xl text-atmos-onSurfaceVariant"
          aria-hidden="true"
        >hourglass_empty</span>
        <p class="text-center text-atmos-body-md text-white/50">
          Em breve
        </p>
      </div>
    </div>
  </section>
</template>
