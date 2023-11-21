export default function getFrenchFormattedNumber(number) {
  // Check if the number is a valid number.
  if (!Number.isFinite(number)) {
    return NaN
  }

  // Get the number in string format.
  const numberString = number.toString()

  // Replace the decimal point with a comma.
  const formattedNumberString = numberString.replace('.', ',')

  return formattedNumberString
}
