export default function formatName(name = '', value = 1, capital?: boolean) {
  if (!name) {
    return name
  }

  const newName = name
    .replace(/\[s\]/g, value > 1 ? 's' : '')
    .replace(/\[x\]/g, value > 1 ? 'x' : '')
    .replace(/\[es\]/g, value > 1 ? 'es' : '')

  return capital ? `${newName[0].toUpperCase()}${newName.slice(1)}` : newName.toLowerCase()
}
