<template>
  <div class="min-h-screen p-8">
    <CampaignList
      :campaigns="campaigns"
      :selectedId="selectedCampaign?.id"
      @select="onSelect"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import CampaignList from "./components/CampaignList.vue"
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
