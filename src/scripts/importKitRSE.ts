import 'dotenv/config'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { getAllNotionDBUncached, getNotionContent } from '../utils/notion'
import { prismaClient } from '../utils/prismaClient'
import { checkFileExistsOnS3, uploadFileToS3 } from 'src/utils/s3/bucket'

const notion = new NotionAPI({ authToken: process.env.NOTION_API_KEY })

const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const sanitizePathPart = (value: string) => value.replace(/[^a-zA-Z0-9._-]/g, '_')

const resolveSignedSource = ({ signedUrls, id }: { signedUrls: ExtendedRecordMap['signed_urls']; id: string }) => {
  const signedUrl = signedUrls[id]
  return signedUrl ? `https://www.notion.so/image/${encodeURIComponent(signedUrl)}?table=block&cache=v2&id=${id}` : null
}

const downloadFileWithRetries = async (url: string, maxRetries = 3): Promise<Buffer> => {
  let attempt = 0
  let currentUrl = url

  while (attempt <= maxRetries) {
    const response = await fetch(currentUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/*,*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (location) {
        currentUrl = location
        continue
      }
    }

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer()
      return Buffer.from(arrayBuffer)
    }

    console.log(currentUrl, response.status, attempt)
    if (attempt === maxRetries || (response.status !== 429 && response.status < 500)) {
      throw new Error(`Failed to download Notion asset (${response.status}) from ${url}`)
    }

    const retryAfterSeconds = parseInt(response.headers.get('retry-after') || '0', 10)
    await sleep((Number.isNaN(retryAfterSeconds) ? 2 : retryAfterSeconds) * 1000)
    attempt += 1
  }

  throw new Error(`Failed to download Notion asset from ${url}`)
}

type MutableImageBlock = {
  type: string
  id: string
  parent_table?: string
  format: {
    page_cover: string
  }
  properties?: Record<string, string[][][]>
}

const getMutableBlockFromEntry = (entry: unknown): MutableImageBlock | undefined => {
  if (!entry || typeof entry !== 'object') {
    return undefined
  }

  const direct = entry as MutableImageBlock
  if (direct.type) {
    return direct
  }

  const firstValue = (entry as { value?: unknown }).value
  if (firstValue && typeof firstValue === 'object') {
    const firstLevel = firstValue as MutableImageBlock
    if (firstLevel.type) {
      return firstLevel
    }

    const secondValue = (firstValue as { value?: unknown }).value
    if (secondValue && typeof secondValue === 'object') {
      const secondLevel = secondValue as MutableImageBlock
      if (secondLevel.type) {
        return secondLevel
      }
    }
  }

  return undefined
}

const downloadImage = async (recordMap: ExtendedRecordMap, id: string, name?: string) => {
  const resolvedSource = resolveSignedSource({
    signedUrls: recordMap.signed_urls,
    id: name || id,
  })

  if (resolvedSource) {
    const localFilename = `${sanitizePathPart(id)}.png`
    const fileExists = await checkFileExistsOnS3(localFilename)

    if (fileExists) {
      console.log(`Skipped Notion image ${id} (already exists on S3)`)
    } else {
      const fileBuffer = await downloadFileWithRetries(resolvedSource)
      await uploadFileToS3(localFilename, fileBuffer)
      console.log(`Saved Notion image ${id}`)
    }
  }
}

const downloadImages = async (recordMap: ExtendedRecordMap) => {
  if (!recordMap.block) {
    return { mainImage: '', metaImage: '' }
  }

  let mainImage = ''
  let metaImage = ''
  for (const [, blockWithRole] of Object.entries(recordMap.block)) {
    const block = getMutableBlockFromEntry(blockWithRole)
    if (!block || (block.type !== 'image' && block.type !== 'page')) {
      continue
    }

    if (block.type === 'page' && block.parent_table === 'collection') {
      mainImage = block.id
      const metaImageInfos = block.properties?.['r=Em']?.[0][1][0][1]
      metaImage = metaImageInfos?.split(':')[1] || ''
      await downloadImage(recordMap, metaImage, metaImageInfos)
    }

    await downloadImage(recordMap, block.id)
  }
  return { mainImage, metaImage }
}

const importFromNotion = async () => {
  if (process.env.AUTO_IMPORT_KIT_RSE !== 'true') {
    return
  }

  const results = await getAllNotionDBUncached<{
    Nom: { title: { plain_text: string }[] }
    'A publier': { checkbox: boolean }
    'Contenu OK': { checkbox: boolean }
    Date: { date: { start: string; end?: string } }
    Description: { plain_text?: string }
    'Meta image': { url: string } | { files: { file: { url: string } }[] }
  }>('https://api.notion.com/v1/databases/25d6523d57d7808b90c3cfa1ae74d039/query')

  const contentById: { id: string; image: string; metaImage: string; content: string }[] = []
  const readyEvents = results.filter((result) => result.properties['A publier']?.checkbox)
  console.log(`Importing ${readyEvents.length} Calendar Events from Notion`)
  for (const result of readyEvents) {
    console.log(
      `Importing Calendar Event ${result.id} - ${result.properties.Nom.title.map((title) => title.plain_text).join('')}`
    )

    const content = await getNotionContent(notion, result.id)
    if (!content) {
      continue
    }

    const { mainImage, metaImage } = await downloadImages(content)
    contentById.push({ id: result.id, image: mainImage, metaImage, content: JSON.stringify(content) })
  }

  const calendarEventsData = readyEvents.flatMap((result) => {
    const { content, image, metaImage } = contentById.find((item) => item.id === result.id) ?? {
      content: '',
      image: '',
      metaImage: '',
    }
    return [
      {
        id: result.id,
        title: result.properties.Nom.title.map((title) => title.plain_text).join(''),
        startDate: new Date(result.properties.Date.date.start),
        endDate: result.properties.Date.date.end ? new Date(result.properties.Date.date.end) : null,
        content: result.properties['Contenu OK'].checkbox ? content : '',
        description: result.properties.Description.plain_text?.trim() || '',
        image,
        metaImage,
      },
    ]
  })

  await prismaClient.$transaction([
    prismaClient.calendarEvent.deleteMany(),
    prismaClient.calendarEvent.createMany({ data: calendarEventsData }),
  ])

  console.log(`Successfully imported ${calendarEventsData.length} calendar events`)
}

importFromNotion()
