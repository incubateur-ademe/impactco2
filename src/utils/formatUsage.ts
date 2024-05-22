import { Equivalent } from 'types/equivalent'

const usageIds = [6, 7, 8]
export default function formatUsage(equivalent: Equivalent, years?: number) {
  if ('usage' in equivalent && equivalent.usage) {
    return typeof equivalent.usage === 'number'
      ? equivalent.usage
      : (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }
  if ('ecv' in equivalent && equivalent.ecv?.find((ecv) => usageIds.includes(ecv.id))) {
    const usage = equivalent.ecv.reduce((acc, cur) => acc + (usageIds.includes(cur.id) ? cur.value : 0), 0)
    return usage
  }
  return 0
}
