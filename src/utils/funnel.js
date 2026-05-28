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
    absoluteDropOff: views - proceeds,
  }
}

export function enrichStepsWithAnalytics(steps) {
  return steps.map((step, index) => ({
    ...step,
    absoluteDropOff: (step.views ?? 0) - (step.proceeds ?? 0),
    deltaFromPrev:
      index === 0 ? 0 : (step.views ?? 0) - (steps[index - 1].views ?? 0),
    isLastStep: index === steps.length - 1,
  }))
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
  const stepsWithAnalytics = enrichStepsWithAnalytics(processedSteps)
  const steps = enrichStepsWithWorstStep(stepsWithAnalytics)
  const firstStep = steps[0]
  const lastStep = steps[steps.length - 1]
  const totalVisitors = firstStep?.views ?? 0
  const totalCompleted = lastStep?.proceeds ?? 0
  const overallConversionRate = safeDivide(totalCompleted, totalVisitors)
  const worstStep = steps.find((step) => step.isWorstStep) ?? null

  const processedCampaign = {
    id: campaign.id,
    name: campaign.name,
    device: campaign.device,
    totalVisitors,
    totalCompleted,
    overallConversionRate,
    steps,
    worstStep,
  }

  processedCampaign.insights = getInsights(processedCampaign)

  return processedCampaign
}

export function getInsights(campaign) {
  const { steps = [], device, overallConversionRate = 0 } = campaign

  if (!steps.length) {
    return []
  }

  const worstStepIndex = steps.findIndex((step) => step.isWorstStep)

  if (worstStepIndex === -1) {
    return []
  }

  const insights = []

  if (worstStepIndex === 0) {
    insights.push(
      "The entry step loses most visitors before they see the rest of the funnel. Test a different offer, headline, or trigger timing."
    )
  } else if (worstStepIndex === steps.length - 1) {
    insights.push(
      "Users drop off right before completion. Consider reducing friction — fewer fields, clearer CTA, or stronger incentive."
    )
  } else {
    insights.push(
      "The biggest drop happens mid-funnel, after users already showed interest. Check if this step matches what the previous one promised."
    )
  }

  if (device === "mobile") {
    insights.push(
      "Mobile users may face additional friction. Consider larger inputs or a shorter form."
    )
  } else {
    insights.push(
      "A/B test the copy and CTA on the worst-performing step to identify what's causing the drop-off."
    )
  }

  if (overallConversionRate < 0.05) {
    insights.push(
      "Overall conversion is below 5%. Even small improvements at the worst step will have a significant impact on total completions."
    )
  }

  return insights
}
