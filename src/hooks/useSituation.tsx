import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import { useRef, useState } from 'react'

export const evaluateNumber = (engine: Engine, value: string) => {
  const result = engine.evaluate(value).nodeValue

  if (result === null || result === undefined) {
    throw new Error(`${value} cannot be evaluated`)
  }

  return result as number
}

export default function useSituation(
  engine: Engine,
  defaultSituation?: Partial<Record<string, PublicodesExpression | ASTNode>>
) {
  const [localSituation, setLocalSituation] = useState(defaultSituation)
  const prevSituation = useRef(defaultSituation)

  if (prevSituation.current !== localSituation) {
    const newSituation = { ...prevSituation.current, ...localSituation }
    prevSituation.current = newSituation
    engine && engine.setSituation(newSituation)
  }

  return { situation: prevSituation.current, setSituation: setLocalSituation }
}
