import 'dotenv/config'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { FAQCategory } from 'types/faq'
import { getAllNotionDBUncached } from '../utils/notion'
import { prismaClient } from '../utils/prismaClient'

const notion = new NotionAPI()

const DEFAULT_MAX_RETRIES = 4

const getNotionRetryMetadata = (error: unknown) => {
  const genericError = error as {
    status: number
    response: {
      headers: {
        get: (headerName: string) => string
      }
    }
  }

  return {
    status: genericError.status,
    retryAfter: parseInt(genericError.response.headers.get('retry-after'), 10) * 1000 || 60000,
  }
}

const runWithNotionRetry = async <T>(operation: () => Promise<T>) => {
  let attempt = 0

  while (true) {
    try {
      return await operation()
    } catch (error) {
      const metadata = getNotionRetryMetadata(error)
      if (!metadata || (metadata.status !== 429 && metadata.status !== 529) || attempt >= DEFAULT_MAX_RETRIES) {
        throw error
      }

      await new Promise((resolve) => setTimeout(resolve, metadata.retryAfter + 1000))
      attempt += 1
    }
  }
}
type BlockWithRole = ExtendedRecordMap['block'][string] & { value?: { role?: string; content?: string[] } }

const sanitizeRecordMap = (recordMap: ExtendedRecordMap) => {
  if (!recordMap.block) {
    return recordMap
  }

  // Reconstruit le recordMap en gardant seulement les blocs valides
  const sanitized = { ...recordMap }
  sanitized.block = Object.fromEntries(
    Object.entries(recordMap.block).filter(([, block]) => (block as BlockWithRole)?.value?.role !== 'none')
  )

  const ids = Object.keys(sanitized.block)
  // Met à jour les références de contenu pour chaque bloc
  Object.values(sanitized.block).forEach((block: BlockWithRole) => {
    if (block?.value?.content) {
      block.value.content = block.value.content.filter((id) => ids.includes(id))
    }
  })

  return sanitized
}

const getNotionContent = async (id: string) => {
  try {
    const content = await runWithNotionRetry(() => notion.getPage(id))
    return content ? sanitizeRecordMap(content) : undefined
  } catch (error) {
    console.error('Unable to get content from Notion', error)
    return undefined
  }
}

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

  const contentById: { id: string; content: ExtendedRecordMap | undefined }[] = []
  console.log(`Importing ${results.length} FAQs from Notion`)
  for (const result of results) {
    console.log(
      `Importing FAQ ${result.id} - ${result.properties.Name.title.map((title) => title.plain_text).join('')}`
    )
    const content = await getNotionContent(result.id)
    contentById.push({ id: result.id, content })
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
        content: JSON.stringify(content),
        language: result.properties.Langage.select?.name.toUpperCase() || 'FR',
        createdAt: new Date(result.created_time),
      },
    ]
  })

  await prismaClient.$transaction([prismaClient.faq.deleteMany(), prismaClient.faq.createMany({ data: faqsData })])
}

importFromNotion()
