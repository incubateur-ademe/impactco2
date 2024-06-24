import axios from 'axios'
import { unstable_cache } from 'next/cache'
import { GuideUtilisationRow } from 'types/guideUtilisation'
import { getNotionContentProps } from 'components/Notion/utils'
import { getRevalidate } from './revalidate'

export const getGuideUtilisation = unstable_cache(
  async (): Promise<GuideUtilisationRow[]> => {
    try {
      const results = await axios.post<{
        results: {
          id: string
          properties: {
            Name: { title: { plain_text: string }[] }
            Order: { number: number }
          }
        }[]
      }>(
        'https://api.notion.com/v1/databases/81cb9bd7e22d46cdb153b113bf005418/query',
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
        .sort((a, b) => a.properties.Order.number - b.properties.Order.number)
        .map((result) => ({
          title: result.properties.Name.title.map((title) => title.plain_text).join(''),
          content: contents.find((content) => content.id === result.id)?.content,
        }))
    } catch (e) {
      console.error(e)
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_REVALIDATE) }
)
