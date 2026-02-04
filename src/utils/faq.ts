import { unstable_cache } from 'next/cache'
import { FAQ, FAQCategory } from 'types/faq'
import { getNotionContentProps } from 'components/Notion/utils'
import { getAllNotionDB } from './notion'
import { getRevalidate } from './revalidate'

export const getFAQs = unstable_cache(
  async (filter?: string, language?: string): Promise<FAQ[]> => {
    try {
      const results = await getAllNotionDB<{
        Name: { title: { plain_text: string }[] }
        Outils: { multi_select: { name: string }[] }
        'Pages du site': { multi_select: { name: string }[] }
        Ancre: { select: { name: string } }
        Categorie: { select: { name: FAQCategory } }
        Langage: { select: { name: string } }
      }>('https://api.notion.com/v1/databases/f21b76594988440c98fc153d73ad5730/query')

      const resultsToGet = results
        .filter(
          (result) =>
            result.properties['Pages du site'] &&
            result.properties['Pages du site'].multi_select &&
            result.properties['Pages du site'].multi_select.length > 0 &&
            result.properties.Categorie.select
        )
        .filter((result) => result.properties.Langage.select?.name.toUpperCase() === (language?.toUpperCase() || 'FR'))

      const contents = await Promise.all(
        resultsToGet
          .filter((result) =>
            filter
              ? result.properties['Pages du site']?.multi_select?.some(
                  (select) => select.name === filter || select.name === 'Toutes les pages'
                )
              : true
          )
          .filter(
            (result) => result.properties.Langage.select?.name.toUpperCase() === (language?.toUpperCase() || 'FR')
          )
          .map(async (result) => {
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

      return resultsToGet
        .sort((a, b) => {
          return new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
        })
        .map((result) => {
          try {
            return {
              title: result.properties.Name.title.map((title) => title.plain_text).join(''),
              pages: result.properties['Pages du site'].multi_select.map((select) => select.name),
              content: contents.find((content) => content.id === result.id)?.content || undefined,
              categorie: result.properties.Categorie.select.name,
              ancre: result.properties.Ancre.select?.name,
              outils: result.properties.Outils.multi_select.map((select) => select.name),
            }
          } catch (e) {
            console.error('Error processing FAQ item:', e)
            return null
          }
        })
        .filter((result) => !!result)
    } catch {
      return []
    }
  },
  undefined,
  { revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE) }
)
