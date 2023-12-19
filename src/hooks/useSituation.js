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

  const currentSituation = useRef(null)
  const prevSituation = useRef(null)

  const [usageNumerique, setUsageNumerique] = useSessionStorage('usageNumerique', {
    'email . appareil': `'smartphone'`,
    'email . taille': 0.075,
    'email . transmission . émetteur . réseau': `'fixe FR'`,
    'streaming . durée': 420,
    'streaming . appareil': `'TV'`,
    'streaming . qualité': `'SD'`,
    'streaming . transmission . réseau': `'fixe FR'`,
    'visio . appareil': `'ordinateur portable'`,
    'visio . qualité': `'audio'`,
    'visio . durée': 180,
    'visio . transmission . réseau': `'fixe FR'`,
    'visio . emplacements': 1,
  })

  if (!already(currentSituation.current, localSituation)) {
    prevSituation.current = currentSituation.current
    const newSituation = { ...currentSituation.current, ...localSituation }
    if (localSituation) {
      setUsageNumerique({ ...usageNumerique, ...localSituation })
    }
    currentSituation.current = newSituation
    engine && engine.setSituation(newSituation)
  }

  return {
    prevSituation: prevSituation.current,
    situation: currentSituation.current,
    setSituation: setLocalSituation,
  }
}
