export type Category = {
  id: number
  name: string
  emoji: string
  slug: string
  title?: string
  header: string
  sources?: { label: string; href: string }[]
  description?: string
  equivalent?: string
  gender: string
  unit: string
  include: string
  list?: boolean
  meta: {
    title: string
    description: string
  }
}
