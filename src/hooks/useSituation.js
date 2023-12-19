import { useRef, useState } from 'react'

export default function useSituation(engine, defaultSituation) {
  const [localSituation, setLocalSituation] = useState(defaultSituation)

  const prevSituation = useRef(null)
  console.log('prevSituation:', prevSituation)

  console.log('localSituation:', localSituation)
  if (prevSituation.current !== localSituation) {
    const newSituation = { ...prevSituation.current, ...localSituation }
    prevSituation.current = newSituation
    engine && engine.setSituation(newSituation)
  }

  return { situation: prevSituation.current, setSituation: setLocalSituation }
}
