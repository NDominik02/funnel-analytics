<template>
  <section class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
    <h3 class="text-sm uppercase tracking-wide text-neutral-500">Insights</h3>
    <ul class="mt-3 divide-y divide-neutral-100">
      <li
        v-for="(insight, index) in insights"
        :key="`${index}-${insight}`"
        class="flex items-start gap-3 py-2 text-sm text-neutral-700"
      >
        <span
          class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
          aria-hidden="true"
        />
        <span>{{ insight }}</span>
      </li>
    </ul>
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
