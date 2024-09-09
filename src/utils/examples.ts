import { unstable_cache } from 'next/cache'
import { Example } from 'types/example'
import { getAllNotionDB } from './notion'
import { getRevalidate } from './revalidate'

export const getExamples = unstable_cache(
  async (): Promise<Example[]> => {
    try {
      const results = await getAllNotionDB<{
        Nom: { title: { plain_text: string }[] }
        Lien: { rich_text: { plain_text: string }[] }
        'Tags site': { multi_select: { name: string }[] }
        Outil: { multi_select: { name: string }[] }
        Secteur: { select: { name: string } }
        Logo: { files: { file: { url: string } }[] }
      }>('https://api.notion.com/v1/databases/ad7a6aa64a0641e08bb64e5f4010843e/query')

      const examples: Record<string, Example> = {}
      results.forEach((result) => {
        try {
          if (
            !result.properties.Nom.title[0] ||
            !result.properties.Lien.rich_text[0] ||
            !result.properties.Logo.files[0] ||
            !result.properties.Secteur.select
          ) {
            return
          }

          const name = result.properties.Nom.title.map((text) => text.plain_text).join('')
          const url = result.properties.Lien.rich_text.map((text) => text.plain_text).join('')
          const tags = result.properties['Tags site'].multi_select.map((select) => select.name)
          const links = result.properties.Outil.multi_select.map((tool) => ({
            href: url,
            label: tool.name,
            tags,
          }))

          const example = examples[name]
          if (example) {
            example.links = example.links.concat(links)
          } else {
            examples[name] = {
              name,
              activity: result.properties.Secteur.select.name,
              logo: result.properties.Logo.files[0].file.url,
              links,
            }
          }
        } catch (e) {
          console.error(e)
        }
      })
      return Object.values(examples)
    } catch {
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)

export const getCommunications = unstable_cache(
  async (): Promise<Example[]> => {
    try {
      const results = await getAllNotionDB<{
        Nom: { title: { plain_text: string }[] }
        Lien: { rich_text: { plain_text: string }[] }
        Logo: { files: { file: { url: string } }[] }
      }>('https://api.notion.com/v1/databases/7a03ed1fdf8d4d03876e445be61abccf/query')

      return results.map((result) => ({
        name: result.properties.Nom.title.map((text) => text.plain_text).join(''),
        logo: result.properties.Logo.files[0].file.url,
        links: [
          { href: result.properties.Lien.rich_text.map((text) => text.plain_text).join(''), label: '', tags: [] },
        ],
        activity: '',
      }))
    } catch {
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)
