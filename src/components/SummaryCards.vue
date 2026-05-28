<template>
  <section class="grid grid-cols-1 gap-3 md:grid-cols-3">
    <article class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
      <p class="text-xs uppercase tracking-wide text-neutral-500">
        Overall Conversion
      </p>
      <p class="mt-2 text-2xl font-semibold text-teal-700">
        {{ overallConversionLabel }}
      </p>
    </article>

    <article class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
      <p class="text-xs uppercase tracking-wide text-neutral-500">
        Total Visitors
      </p>
      <p class="mt-2 text-2xl font-semibold text-neutral-800">
        {{ totalVisitorsLabel }}
      </p>
    </article>

    <article class="rounded-lg border border-black/8 bg-white p-4 shadow-sm">
      <p class="text-xs uppercase tracking-wide text-neutral-500">
        Biggest Drop-off
      </p>
      <p class="mt-2 text-lg font-semibold text-neutral-800">
        {{ worstStepName }}
      </p>
      <p class="mt-1 text-sm font-medium text-amber-600">
        {{ worstStepDropOffLabel }}
      </p>
    </article>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { formatNumber, formatPercent } from "../utils/formatters.js"

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
})

const overallConversionLabel = computed(() =>
  formatPercent(props.campaign.overallConversionRate ?? 0)
)

const totalVisitorsLabel = computed(() =>
  formatNumber(props.campaign.totalVisitors ?? 0)
)

const worstStepName = computed(() => props.campaign.worstStep?.name ?? "N/A")

const worstStepDropOffLabel = computed(() =>
  formatPercent(props.campaign.worstStep?.dropOffRate ?? 0)
)
</script>
