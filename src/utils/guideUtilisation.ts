import { unstable_cache } from 'next/cache'
import { GuideUtilisationRow } from 'types/guideUtilisation'
import { getNotionContentProps } from 'components/Notion/utils'
import { getAllNotionDB } from './notion'
import { getRevalidate } from './revalidate'

export const getGuideUtilisation = unstable_cache(
  async (): Promise<GuideUtilisationRow[]> => {
    try {
      const results = await getAllNotionDB<{
        Name: { title: { plain_text: string }[] }
        Order: { number: number }
      }>('https://api.notion.com/v1/databases/81cb9bd7e22d46cdb153b113bf005418/query')

      const contents = await Promise.all(
        results.map(async (result) => {
          try {
            const content = await getNotionContentProps(result.id)
            return {
              id: result.id,
              content,
            }
          } catch {
            return { id: null, content: null }
          }
        })
      )

      return results
        .sort((a, b) => a.properties.Order.number - b.properties.Order.number)
        .map((result) => ({
          title: result.properties.Name.title.map((title) => title.plain_text).join(''),
          content: contents.find((content) => content.id === result.id)?.content,
        }))
    } catch {
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_REVALIDATE) }
)
