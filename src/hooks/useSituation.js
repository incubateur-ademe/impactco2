import { useRef, useState } from 'react'
import { useSessionStorage } from './useSessionStorage'

// Check if all key/values pair of b
// already inside object a
function already(a, b) {
  if (!a || !b) {
    return false
  } else {
    return Object.keys(b).every(function (k) {
      return a[k] === b[k]
    })
  }
}

export default function useSituation(engine, defaultSituation) {
  const [localSituation, setLocalSituation] = useState(defaultSituation)

  const situation = useRef(null)

  const [usageNumerique, setUsageNumerique] = useSessionStorage('usageNumerique', {
    'email . appareil': `'smartphone'`,
    'email . taille': 0.075,
    'email . transmission . émetteur . réseau': `'fixe FR'`,
    'streaming . durée': 420,
    'streaming . appareil': `'TV'`,
    'streaming . qualité': `'HD'`,
    'streaming . transmission . réseau': `'fixe FR'`,
    'visio . appareil': `'ordinateur portable'`,
    'visio . qualité': `'SD'`,
    'visio . durée': 180,
    'visio . transmission . réseau': `'fixe FR'`,
    'visio . emplacements': 1,
  })

  if (!already(situation.current, localSituation)) {
    const newSituation = { ...usageNumerique, ...localSituation }
    if (localSituation) {
      setUsageNumerique(newSituation)
    }
    situation.current = newSituation
    engine && engine.setSituation(newSituation)
  }

  return {
    situation: situation.current,
    setSituation: setLocalSituation,
  }
}
