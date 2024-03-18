import formatName from './formatName'
import formatNumber from './formatNumber'

export default function fullSentenceFormat(obj) {
  return (
    formatNumber(obj.weight / obj.equivalent.value).toLocaleString() +
    ' ' +
    formatName((obj.equivalent.prefix || '') + obj.equivalent.name, obj.weight / obj.equivalent.value)
  )
}
