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

function getEngineName(anySituation) {
  if (anySituation && anySituation['email . appareil']) {
    return 'usageNumerique'
  } else {
    return 'livraison'
  }
}

export default function useSituation(engine, defaultSituation) {
  const [retention, setRetention] = useSessionStorage(getEngineName(defaultSituation), defaultSituation)
  const [localSituation, setLocalSituation] = useState(retention)

  const prevSituation = useRef(null)

  if (!already(prevSituation.current, localSituation)) {
    const newSituation = { ...prevSituation.current, ...localSituation }
    prevSituation.current = newSituation
    if (engine && typeof window !== 'undefined') {
      engine.setSituation(newSituation)
      setRetention(newSituation)
    }
  }

  return {
    situation: prevSituation.current,
    setSituation: setLocalSituation,
  }
}
