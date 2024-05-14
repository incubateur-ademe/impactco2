import Engine from 'publicodes'

export const evaluateNumber = (engine: Engine, value: string) => {
  const result = engine.evaluate(value).nodeValue

  if (result === null || result === undefined) {
    throw new Error(`${value} cannot be evaluated`)
  }

  return result as number
}
