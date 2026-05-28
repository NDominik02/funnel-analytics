<template>
  <section class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
    <h3 class="text-sm uppercase tracking-wide text-neutral-500">Insights</h3>
    <div class="mt-3 space-y-4">
      <div
        v-for="(insight, index) in insights"
        :key="`${index}-${insight}`"
        class="flex items-start gap-3 text-sm text-neutral-700"
        style="line-height: 1.7"
      >
        <svg
          class="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2a6 6 0 0 0-4-10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="min-w-0 flex-1">{{ insight }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  insights: {
    type: Array,
    default: () => [],
  },
})
</script>
