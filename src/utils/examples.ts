import axios from 'axios'
import { unstable_cache } from 'next/cache'
import { Example } from 'types/example'
import { getRevalidate } from './revalidate'

export const getExamples = unstable_cache(
  async (): Promise<Example[]> => {
    try {
      const results = await axios.post<{
        results: {
          properties: {
            Nom: { title: { plain_text: string }[] }
            Lien: { rich_text: { plain_text: string }[] }
            'Tags site': { multi_select: { name: string }[] }
            Outil: { multi_select: { name: string }[] }
            Secteur: { select: { name: string } }
            Logo: { files: { file: { url: string } }[] }
          }
        }[]
      }>(
        'https://api.notion.com/v1/databases/ad7a6aa64a0641e08bb64e5f4010843e/query',
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      )

      const examples: Record<string, Example> = {}

      results.data.results.forEach((result) => {
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
          const links = result.properties.Outil.multi_select.map((tool) => ({
            href: result.properties.Lien.rich_text.map((text) => text.plain_text).join(''),
            label: tool.name,
          }))
          const tags = result.properties['Tags site'].multi_select.map((select) => select.name)

          const example = examples[name]
          if (example) {
            example.links = example.links.concat(links)
            example.tags = example.tags.concat(tags)
          } else {
            examples[name] = {
              name,
              activity: result.properties.Secteur.select.name,
              logo: result.properties.Logo.files[0].file.url,
              tags,
              links,
            }
          }
        } catch (e) {
          console.error(e)
        }
      })
      return Object.values(examples)
    } catch (e) {
      console.error(e)
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)

export const getCommunications = unstable_cache(
  async (): Promise<Example[]> => {
    try {
      const results = await axios.post<{
        results: {
          properties: {
            Nom: { title: { plain_text: string }[] }
            Lien: { rich_text: { plain_text: string }[] }
            Logo: { files: { file: { url: string } }[] }
          }
        }[]
      }>(
        'https://api.notion.com/v1/databases/7a03ed1fdf8d4d03876e445be61abccf/query',
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      )

      return results.data.results.map((result) => ({
        name: result.properties.Nom.title.map((text) => text.plain_text).join(''),
        logo: result.properties.Logo.files[0].file.url,
        links: [{ href: result.properties.Lien.rich_text.map((text) => text.plain_text).join(''), label: '' }],
        tags: [],
        activity: '',
      }))
    } catch (e) {
      console.error(e)
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)
