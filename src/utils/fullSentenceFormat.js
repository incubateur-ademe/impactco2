import { computeECV } from './computeECV'
import formatName from './formatName'
import formatNumber from './formatNumber'

export default function fullSentenceFormat(obj) {
  return (
    formatNumber(obj.weight / computeECV(obj.equivalent)).toLocaleString() +
    ' ' +
    formatName((obj.equivalent.prefix || '') + obj.equivalent.name, obj.weight / computeECV(obj.equivalent))
  )
}
