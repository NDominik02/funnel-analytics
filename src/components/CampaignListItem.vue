<template>
  <button
    type="button"
    class="relative w-full overflow-hidden rounded-lg border border-black/8 bg-white p-4 text-left shadow-sm transition-colors hover:bg-neutral-50"
    :class="isSelected ? 'bg-[#f0f9f9]' : ''"
    @click="emit('select', campaign.id)"
  >
    <div
      v-if="isSelected"
      class="absolute inset-y-0 left-0 w-[3px] bg-teal-700"
    />

    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p
          class="truncate text-neutral-900"
          :class="isSelected ? 'font-semibold' : 'font-medium'"
        >
          {{ campaign.name }}
        </p>
        <span class="mt-1 inline-block text-xs text-neutral-500">
          {{ campaign.device }}
        </span>
      </div>

      <div class="text-right">
        <p class="text-xl font-semibold text-teal-700">
          {{ conversionRateLabel }}
        </p>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-2 gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Visitors</p>
        <p class="mt-1 text-sm text-neutral-600">{{ visitorsLabel }}</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-500">Steps</p>
        <p class="mt-1 text-sm text-neutral-600">{{ stepCountLabel }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue"
import { formatNumber, formatPercent } from "../utils/formatters.js"

const props = defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["select"])

const conversionRateLabel = computed(() =>
  formatPercent(props.campaign.overallConversionRate ?? 0)
)

const visitorsLabel = computed(() => formatNumber(props.campaign.totalVisitors ?? 0))

const stepCountLabel = computed(() => {
  const stepCount = Array.isArray(props.campaign.steps) ? props.campaign.steps.length : 0
  return `${stepCount} steps`
})
</script>
