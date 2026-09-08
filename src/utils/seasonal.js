import { septemberConfig } from '../config/seasonal.js'

export function isSeasonActive(date = new Date(), config = septemberConfig) {
  if (config.mode === 'off') return false
  if (config.mode === 'on') return true
  const month = new Intl.DateTimeFormat('en-US', { month: 'numeric', timeZone: config.timeZone }).format(date)
  return Number(month) === config.month
}
