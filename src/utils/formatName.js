export default function formatName(name = '', value = 1, capital) {
  const newName = name.replace(/\[s\]/g, value > 1 ? 's' : '').replace(/\[x\]/g, value > 1 ? 'x' : '')

  return capital ? newName : newName.toLowerCase()
}
