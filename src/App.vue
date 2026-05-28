<template>
  <div class="min-h-screen bg-neutral-50">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-[320px_1fr] md:p-8">
      <div :class="mobileDetailOpen ? 'hidden md:block' : 'block'">
        <CampaignList
          :campaigns="campaigns"
          :selectedId="selectedCampaign?.id"
          @select="onSelect"
        />
      </div>

      <main
        class="rounded-xl border border-black/8 bg-white p-5 shadow-sm md:block md:p-6"
        :class="mobileDetailOpen && selectedCampaign ? 'block' : 'hidden'"
      >
        <button
          type="button"
          class="mb-4 text-sm font-medium text-teal-700 md:hidden"
          @click="onMobileBack"
        >
          ← Back
        </button>
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
const mobileDetailOpen = ref(false)

onMounted(() => {
  campaigns.value = rawData.campaigns.map(calculateCampaignMetrics)
  if (window.matchMedia("(min-width: 768px)").matches) {
    selectedCampaign.value = campaigns.value[0]
  }
})

function onSelect(id) {
  selectedCampaign.value = campaigns.value.find((c) => c.id === id)
  mobileDetailOpen.value = true
}

function onMobileBack() {
  mobileDetailOpen.value = false
}
</script>
