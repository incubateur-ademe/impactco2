import { useRef, useState } from 'react'

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

  if (!already(currentSituation.current, localSituation)) {
    prevSituation.current = currentSituation.current
    const newSituation = { ...currentSituation.current, ...localSituation }
    currentSituation.current = newSituation
    engine && engine.setSituation(newSituation)
  }

  console.log('prevSituation.current:', prevSituation.current)
  console.log('currentSituation.current:', currentSituation.current['email . appareil'])
  console.log('localSituation:', localSituation ? localSituation['email . appareil'] : null)
  console.log('------------------------')
  return {
    prevSituation: prevSituation.current,
    currentSituation: currentSituation.current,
    setSituation: setLocalSituation,
  }
}
