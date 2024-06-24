import axios from 'axios'
import { unstable_cache } from 'next/cache'
import { FAQ } from 'types/faq'
import { getNotionContentProps } from 'components/Notion/utils'
import { getRevalidate } from './revalidate'

export const getFAQs = unstable_cache(
  async (): Promise<FAQ[]> => {
    try {
      const results = await axios.post<{
        results: {
          id: string
          properties: {
            Name: { title: { plain_text: string }[] }
            'Page(s)': { multi_select: { name: string }[] }
            Section: { select: { name: string } }
            Order: { number: number }
          }
        }[]
      }>(
        'https://api.notion.com/v1/databases/f21b76594988440c98fc153d73ad5730/query',
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      )

      const contents = await Promise.all(
        results.data.results.map(async (result) => {
          try {
            const content = await getNotionContentProps(result.id)
            return {
              id: result.id,
              content,
            }
          } catch (e) {
            console.error(e)
            return { id: null, content: null }
          }
        })
      )

      return results.data.results
        .filter(
          (result) =>
            result.properties['Page(s)'] &&
            result.properties['Page(s)'].multi_select &&
            result.properties['Page(s)'].multi_select.length > 0
        )
        .sort((a, b) => a.properties.Order.number - b.properties.Order.number)
        .map((result) => ({
          title: result.properties.Name.title.map((title) => title.plain_text).join(''),
          pages: result.properties['Page(s)'].multi_select.map((select) => select.name),
          content: contents.find((content) => content.id === result.id)?.content,
          section: result.properties.Section.select.name,
        }))
    } catch (e) {
      console.error(e)
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)
