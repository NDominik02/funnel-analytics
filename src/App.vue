<template>
  <div class="min-h-screen bg-neutral-50 p-6 md:p-8">
    <div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
      <CampaignList
        :campaigns="campaigns"
        :selectedId="selectedCampaign?.id"
        @select="onSelect"
      />

      <main class="rounded-xl border border-black/8 bg-white p-5 shadow-sm md:p-6">
        <CampaignDetail v-if="selectedCampaign" :campaign="selectedCampaign" />
        <EmptyState v-else />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import CampaignList from "./components/CampaignList.vue"
import CampaignDetail from "./components/CampaignDetail.vue"
import EmptyState from "./components/EmptyState.vue"
import { calculateCampaignMetrics } from "./utils/funnel.js"
import rawData from "./data/campaigns.json"

const campaigns = ref([])
const selectedCampaign = ref(null)

onMounted(() => {
  campaigns.value = rawData.campaigns.map(calculateCampaignMetrics)
  selectedCampaign.value = campaigns.value[0]
})

function onSelect(id) {
  selectedCampaign.value = campaigns.value.find((c) => c.id === id)
}
</script>
