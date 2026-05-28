export function safeDivide(numerator, denominator) {
  if (!denominator) {
    return 0
  }

  return numerator / denominator
}

export function calculateStepMetrics(step) {
  const views = step.views ?? 0
  const proceeds = step.proceeds ?? 0
  const dropOffCount = views - proceeds

  return {
    ...step,
    stepConversionRate: safeDivide(proceeds, views),
    dropOffCount,
    dropOffRate: safeDivide(dropOffCount, views),
  }
}

export function enrichStepsWithWorstStep(steps) {
  let highestDropOffRate = -1
  let worstStepIndex = -1

  steps.forEach((step, index) => {
    if (step.dropOffRate > highestDropOffRate) {
      highestDropOffRate = step.dropOffRate
      worstStepIndex = index
    }
  })

  return steps.map((step, index) => ({
    ...step,
    isWorstStep: index === worstStepIndex,
  }))
}

export function calculateCampaignMetrics(campaign) {
  const rawSteps = Array.isArray(campaign.steps) ? campaign.steps : []
  const processedSteps = rawSteps.map(calculateStepMetrics)
  const steps = enrichStepsWithWorstStep(processedSteps)
  const firstStep = steps[0]
  const lastStep = steps[steps.length - 1]
  const totalVisitors = firstStep?.views ?? 0
  const totalCompleted = lastStep?.proceeds ?? 0
  const overallConversionRate = safeDivide(totalCompleted, totalVisitors)
  const worstStep = steps.find((step) => step.isWorstStep) ?? null

  return {
    id: campaign.id,
    name: campaign.name,
    device: campaign.device,
    totalVisitors,
    totalCompleted,
    overallConversionRate,
    steps,
    worstStep,
    insights: getInsights({ device: campaign.device, steps, worstStep }),
  }
}

export function getInsights(campaign) {
  const insights = []
  const { worstStep, steps = [], device } = campaign

  if (worstStep?.type === "email" && worstStep.dropOffRate > 0.6) {
    insights.push(
      "The email form likely creates too much friction. Consider reducing required fields."
    )
  }

  if (
    steps[0]?.stepConversionRate > 0.25 &&
    steps[1] &&
    steps[1].dropOffRate > 0.6
  ) {
    insights.push(
      "The teaser works, but the next step may not match user expectations. Review copy continuity between steps."
    )
  }

  if (device === "mobile" && worstStep?.type === "email") {
    insights.push(
      "Mobile users face higher form friction. Consider a shorter form or larger inputs."
    )
  }

  return insights
}
