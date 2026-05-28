<template>
  <div
    class="flex w-full items-center gap-3 rounded-lg border border-[#fde68a] bg-[#fef9ee] p-4 text-sm font-medium text-amber-900"
  >
    <svg
      class="h-5 w-5 shrink-0 text-amber-500"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 2.5L18 16.5H2L10 2.5Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path d="M10 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="10" cy="14" r="0.75" fill="currentColor" />
    </svg>

    <p>
      Biggest drop-off: {{ worstStepName }} — {{ dropOffRateLabel }} of users
      dropped here
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { formatPercent } from "../utils/formatters.js"

const props = defineProps({
  worstStep: {
    type: Object,
    required: true,
  },
})

const worstStepName = computed(() => props.worstStep?.name ?? "Unknown step")

const dropOffRateLabel = computed(() =>
  formatPercent(props.worstStep?.dropOffRate ?? 0)
)
</script>
