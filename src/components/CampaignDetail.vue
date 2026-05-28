<template>
  <section class="space-y-6">
    <header class="flex items-center gap-3">
      <h2 class="text-xl font-semibold text-neutral-800">{{ campaign.name }}</h2>
      <span
        class="rounded-full px-2.5 py-1 text-xs"
        :class="
          campaign.device === 'mobile'
            ? 'bg-teal-50 text-teal-700'
            : 'bg-neutral-100 text-neutral-600'
        "
      >
        {{ campaign.device }}
      </span>
    </header>

    <SummaryCards :campaign="campaign" />

    <ProblemStepAlert :worst-step="campaign.worstStep" />

    <section>
      <h3 class="mb-3 text-sm uppercase tracking-wide text-neutral-500">
        Funnel Steps
      </h3>
      <div class="space-y-3">
        <FunnelStepCard
          v-for="step in campaign.steps"
          :key="step.id"
          :step="step"
          :first-step-views="campaign.totalVisitors"
        />
      </div>
    </section>

    <InsightsPanel
      v-if="campaign.insights && campaign.insights.length > 0"
      :insights="campaign.insights"
    />
  </section>
</template>

<script setup>
import FunnelStepCard from "./FunnelStepCard.vue"
import InsightsPanel from "./InsightsPanel.vue"
import ProblemStepAlert from "./ProblemStepAlert.vue"
import SummaryCards from "./SummaryCards.vue"

defineProps({
  campaign: {
    type: Object,
    required: true,
  },
})
</script>
