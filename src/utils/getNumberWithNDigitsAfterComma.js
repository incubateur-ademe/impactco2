export default function getNumberWithNDigitsAfterComma(number, n) {
  // Check if the number is a valid number.
  if (!Number.isFinite(number)) {
    return NaN
  }

  // Get the number of digits after the decimal point.
  const decimalPointIndex = number.toString().indexOf('.')
  const numberOfDigitsAfterComma = decimalPointIndex === -1 ? 0 : number.toString().length - decimalPointIndex - 1

  // If the number of digits after the decimal point is less than or equal to N, then simply return the number.
  if (numberOfDigitsAfterComma <= n) {
    return number
  }

  // Otherwise, round the number to N digits after the decimal point and return it.
  return Math.round(number * 10 ** n) / 10 ** n
}
