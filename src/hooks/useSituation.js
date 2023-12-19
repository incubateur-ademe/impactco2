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
  const [bla, setBla] = useSessionStorage('usageNumerique', defaultSituation)
  const [localSituation, setLocalSituation] = useState(bla)

  const prevSituation = useRef(null)

  if (!already(prevSituation.current, localSituation)) {
    console.log('localSituation:', localSituation)
    const newSituation = { ...prevSituation.current, ...localSituation }
    console.log('newSituation:', newSituation)
    prevSituation.current = newSituation
    engine && engine.setSituation(newSituation)
    if (typeof window !== 'undefined') setBla(newSituation)
  }

  return {
    situation: prevSituation.current,
    setSituation: setLocalSituation,
  }
}
