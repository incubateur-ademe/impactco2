export default function slugify(str: string): string {
  const withoutDiacritics = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return withoutDiacritics
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
