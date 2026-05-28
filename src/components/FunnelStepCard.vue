<template>
  <article class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-neutral-800">{{ step.name }}</p>
        <p class="mt-1 text-sm text-neutral-500">{{ step.description }}</p>
      </div>
      <span
        v-if="step.isWorstStep"
        class="rounded-md bg-[#fef9ee] px-2 py-1 text-xs font-medium text-amber-700"
      >
        Biggest drop-off
      </span>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Views</p>
        <p class="mt-1 text-sm font-medium text-neutral-700">{{ viewsLabel }}</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Proceeds</p>
        <p class="mt-1 text-sm font-medium text-neutral-700">{{ proceedsLabel }}</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Step Conversion</p>
        <p class="mt-1 text-sm font-medium text-neutral-700">{{ conversionLabel }}</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Drop-off</p>
        <p class="mt-1 text-sm font-medium text-neutral-700">{{ dropOffLabel }}</p>
      </div>
    </div>

    <div class="mt-4">
      <div class="h-2 w-full rounded-full bg-neutral-100">
        <div
          class="h-full rounded-full bg-teal-600"
          :style="{ width: `${relativeWidth}%` }"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue"
import { formatNumber, formatPercent } from "../utils/formatters.js"

const props = defineProps({
  step: {
    type: Object,
    required: true,
  },
  firstStepViews: {
    type: Number,
    default: 0,
  },
})

const viewsLabel = computed(() => formatNumber(props.step.views ?? 0))
const proceedsLabel = computed(() => formatNumber(props.step.proceeds ?? 0))
const conversionLabel = computed(() => formatPercent(props.step.stepConversionRate ?? 0))
const dropOffLabel = computed(() => formatPercent(props.step.dropOffRate ?? 0))

const relativeWidth = computed(() => {
  if (!props.firstStepViews) {
    return 0
  }

  const width = ((props.step.views ?? 0) / props.firstStepViews) * 100
  return Math.max(0, Math.min(100, Number(width.toFixed(1))))
})
</script>
