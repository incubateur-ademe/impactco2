export default function getFrenchFormattedNumber(number: number) {
  // Get the number in string format.
  const numberString = number.toString()

  // Replace the decimal point with a comma.
  const formattedNumberString = numberString.replace('.', ',')

  return formattedNumberString
}
