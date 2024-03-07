export default function formatName(name = '', value = 1, capital?: boolean) {
  const newName = name
    .replace(/\[s\]/g, value > 1 ? 's' : '')
    .replace(/\[x\]/g, value > 1 ? 'x' : '')
    .replace(/\[es\]/g, value > 1 ? 'es' : '')

  return capital ? newName : newName.toLowerCase()
}
