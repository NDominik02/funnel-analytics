export function formatPercent(value, decimals = 1) {
  return `${(Number(value) * 100).toFixed(decimals)}%`
}

export function formatNumber(value) {
  return Number(value).toLocaleString("en-US")
}
