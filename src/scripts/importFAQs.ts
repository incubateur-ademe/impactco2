import 'dotenv/config'
import { NotionAPI } from 'notion-client'
import { FAQCategory } from 'types/faq'
import { getAllNotionDBUncached, getNotionContent } from '../utils/notion'
import { prismaClient } from '../utils/prismaClient'

const notion = new NotionAPI({ authToken: process.env.NOTION_API_KEY })

const importFromNotion = async () => {
  if (process.env.AUTO_IMPORT_FAQS !== 'true') {
    return
  }

  const results = await getAllNotionDBUncached<{
    Name: { title: { plain_text: string }[] }
    Outils: { multi_select: { name: string }[] }
    'Pages du site': { multi_select: { name: string }[] }
    Ancre: { select: { name: string } }
    Categorie: { select: { name: FAQCategory } }
    Langage: { select: { name: string } }
  }>('https://api.notion.com/v1/databases/f21b76594988440c98fc153d73ad5730/query')

  const contentById: { id: string; content: string | undefined }[] = []
  console.log(`Importing ${results.length} FAQs from Notion`)
  for (const result of results) {
    console.log(
      `Importing FAQ ${result.id} - ${result.properties.Name.title.map((title) => title.plain_text).join('')}`
    )
    const content = await getNotionContent(notion, result.id)
    contentById.push({ id: result.id, content: content ? JSON.stringify(content) : undefined })
  }

  const contentMap = new Map(
    contentById.filter((item) => item.content !== undefined).map((item) => [item.id, item.content])
  )

  const faqsData = results.flatMap((result) => {
    const content = contentMap.get(result.id)
    if (!content) {
      return []
    }
    return [
      {
        id: result.id,
        title: result.properties.Name.title.map((title) => title.plain_text).join(''),
        pages: result.properties['Pages du site'].multi_select.map((select) => select.name),
        categorie: result.properties.Categorie.select?.name || '',
        ancre: result.properties.Ancre.select?.name || null,
        outils: result.properties.Outils.multi_select.map((select) => select.name),
        content,
        language: result.properties.Langage.select?.name.toUpperCase() || 'FR',
        createdAt: new Date(result.created_time),
      },
    ]
  })

  await prismaClient.$transaction([prismaClient.faq.deleteMany(), prismaClient.faq.createMany({ data: faqsData })])
}

importFromNotion()
