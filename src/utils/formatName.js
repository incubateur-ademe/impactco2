export default function formatName(name = '', value = 1, capital) {
  const newName = name.replaceAll('[s]', value > 1 ? 's' : '').replaceAll('[x]', value > 1 ? 'x' : '')

  return capital ? newName : newName.toLowerCase()
}
