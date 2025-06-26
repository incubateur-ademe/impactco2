export default function formatName(name = '', value = 1) {
  if (!name) {
    return name
  }

  return name
    .replace(/\[s\]/g, value >= 2 ? 's' : '')
    .replace(/\[x\]/g, value >= 2 ? 'x' : '')
    .replace(/\[es\]/g, value >= 2 ? 'es' : '')
}
