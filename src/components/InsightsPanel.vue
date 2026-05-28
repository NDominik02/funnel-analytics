<template>
  <section class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
    <h3 class="text-sm uppercase tracking-wide text-neutral-500">Insights</h3>
    <div class="mt-3 space-y-4">
      <p
        v-for="(insight, index) in insights"
        :key="`${index}-${insight}`"
        class="text-sm text-neutral-700"
      >
        {{ insight }}
      </p>
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
