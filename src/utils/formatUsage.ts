import { Equivalent } from 'types/equivalent'

export default function formatUsage(equivalent: Equivalent, years?: number) {
  if ('usage' in equivalent && equivalent.usage) {
    return (years || equivalent.usage.defaultyears) * equivalent.usage.peryear
  }
  if ('ecv' in equivalent && equivalent.ecv?.find((ecv) => [6, 7, 8].includes(ecv.id))) {
    const usage = equivalent.ecv.reduce((acc, cur) => acc + ([6, 7, 8].includes(cur.id) ? cur.value : 0), 0)
    return usage
  }
  return 0
}
