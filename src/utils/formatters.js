import { computeECVWithMultiplier } from './computeECV'
import formatName from './formatName'
import formatNumber from './formatNumber'

export function fullSentenceFormat(obj) {
  return (
    formatNumber(obj.weight / computeECVWithMultiplier(obj.equivalent)) +
    ' ' +
    formatName(
      (obj.equivalent.prefix || '') + obj.equivalent.name,
      obj.weight / computeECVWithMultiplier(obj.equivalent)
    )
  )
}
