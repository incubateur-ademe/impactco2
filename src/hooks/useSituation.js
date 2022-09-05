import { useState, useRef } from 'react'

export default function useSituation(engine, defaultSituation) {
  const [localSituation, setLocalSituation] = useState(defaultSituation)

  const prevSituation = useRef(null)

  if (prevSituation.current !== localSituation) {
    const newSituation = { ...prevSituation.current, ...localSituation }
    prevSituation.current = newSituation
    engine.setSituation(newSituation)
  }

  return { situation: prevSituation.current, setSituation: setLocalSituation }
}
