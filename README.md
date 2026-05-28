# Funnel Analytics – Popup Campaign Mini-App

A small web app that helps marketers understand step-level drop-offs in multi-step popup campaigns — not just overall conversion.

## How to run it

**Prerequisites**

- [Node.js](https://nodejs.org/) **18 or newer** (LTS recommended)
- **npm** 9+ (included with Node)

**Setup**

```bash
cd funnel-analytics
npm install
npm run dev
```

Open **http://localhost:5173** in your browser (Vite prints the exact URL in the terminal).

**Optional — production build**

```bash
npm run build
npm run preview
```

## How to use

1. Select a campaign from the left panel
2. Review the step-by-step funnel on the right
3. The biggest drop-off step is highlighted automatically
4. Scroll down for rule-based insights

## Stack

- Vue 3 + Vite + Tailwind CSS v4
- Static data: `src/data/campaigns.json`
- No backend, authentication, or router

## Project structure

```
src/
  data/           – campaign JSON
  utils/
    funnel.js     – metrics, worst step, insights
    formatters.js – number and percent formatting
  components/
    CampaignList / CampaignListItem
    CampaignDetail
    SummaryCards
    ProblemStepAlert
    FunnelStepCard
    InsightsPanel
    EmptyState
```

## Design notes

- Business logic lives in `src/utils/funnel.js`
- Visual calculations (e.g. bar width) stay in components
- Worst step is chosen by **drop-off rate**, not absolute drop-off count
