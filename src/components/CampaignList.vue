<template>
  <aside class="rounded-xl border border-black/8 bg-white p-4 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold text-neutral-900">Campaigns</h2>

    <ul class="space-y-2">
      <li v-for="campaign in campaigns" :key="campaign.id">
        <CampaignListItem
          :campaign="campaign"
          :is-selected="campaign.id === selectedId"
          @select="emit('select', $event)"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup>
import CampaignListItem from "./CampaignListItem.vue"

defineProps({
  campaigns: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["select"])
</script>
