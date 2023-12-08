export default function getStringAfterLastSlash(input: string): string {
  const lastSlashIndex = input.lastIndexOf('/')

  if (lastSlashIndex === -1 || lastSlashIndex === input.length - 1) {
    // Aucun "/" trouvé ou le dernier caractère est "/"
    return ''
  }

  return input.substring(lastSlashIndex + 1)
}
