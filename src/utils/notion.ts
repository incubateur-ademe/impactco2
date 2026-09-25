import axios, { AxiosResponse } from 'axios'
import { unstable_cache } from 'next/cache'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { z } from 'zod'
import { getRevalidate } from './revalidate'

export const NotionCommandValidation = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('rendezvous'),
    from: z.string({ message: 'Required' }),
    structure: z
      .string({ message: 'Veuillez renseigner votre structure.' })
      .min(1, 'Veuillez renseigner votre structure.'),
    suggestionType: z
      .string({ message: 'Veuillez renseigner votre demande.' })
      .min(1, 'Veuillez renseigner votre demande.'),
    text: z.string({ message: 'Veuillez renseigner votre message.' }).min(1, 'Veuillez renseigner votre message.'),
    email: z.string({ message: 'Veuillez renseigner un email valide.' }).email('Veuillez renseigner un email valide.'),
    accepted: z
      .boolean({ message: 'Veuillez lire et accepter la politique de protection des données personnelles' })
      .refine((v) => v === true, {
        message: 'Veuillez lire et accepter la politique de protection des données personnelles',
      }),
    newsletter: z.boolean(),
  }),
  z.object({
    type: z.literal('suggestion'),
    from: z.string({ message: 'Required' }),
    structure: z
      .string({ message: 'Veuillez renseigner votre structure.' })
      .min(1, 'Veuillez renseigner votre structure.'),
    suggestionType: z
      .string({ message: 'Veuillez spécifier votre type de retour.' })
      .min(1, 'Veuillez spécifier votre type de retour.'),
    text: z.string({ message: 'Veuillez renseigner votre message.' }).min(1, 'Veuillez renseigner votre message.'),
    email: z.string({ message: 'Veuillez renseigner un email valide.' }).email('Veuillez renseigner un email valide.'),
    accepted: z
      .boolean({ message: 'Veuillez lire et accepter la politique de protection des données personnelles' })
      .refine((v) => v === true, {
        message: 'Veuillez lire et accepter la politique de protection des données personnelles',
      }),
    newsletter: z.boolean(),
  }),
])

export type NotionCommand = z.infer<typeof NotionCommandValidation>

type NotionResult<T> = { id: string; properties: T; last_edited_time: string; created_time: string }
export const getAllNotionDB = unstable_cache(async <T>(url: string) => getAllNotionDBUncached<T>(url), undefined, {
  revalidate: getRevalidate(process.env.NOTION_TABLE_REVALIDATE),
})

export const getAllNotionDBUncached = async <T>(url: string) => {
  if (!process.env.NOTION_API_KEY) {
    return []
  }
  let results: NotionResult<T>[] = []
  let axiosResponse:
    | AxiosResponse<{
        results: NotionResult<T>[]
        next_cursor: boolean
        has_more: boolean
      }>
    | undefined = undefined

  while (!axiosResponse || axiosResponse.data.has_more) {
    axiosResponse = await axios.post<{
      results: NotionResult<T>[]
      next_cursor: boolean
      has_more: boolean
    }>(
      url,
      {
        start_cursor: axiosResponse ? axiosResponse.data.next_cursor : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    )

    results = results.concat(axiosResponse.data.results)
  }

  return results
}

const DEFAULT_MAX_RETRIES = 4

export const getNotionRetryMetadata = (error: unknown) => {
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

export const runWithNotionRetry = async <T>(operation: () => Promise<T>) => {
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

export const sanitizeRecordMap = (recordMap: ExtendedRecordMap) => {
  if (!recordMap.block) {
    return recordMap
  }

  const sanitized = { ...recordMap }
  sanitized.block = Object.fromEntries(
    Object.entries(recordMap.block).filter(([, block]) => (block as BlockWithRole)?.value?.role !== 'none')
  )

  const ids = Object.keys(sanitized.block)
  Object.values(sanitized.block).forEach((block: BlockWithRole) => {
    if (block?.value?.content) {
      block.value.content = block.value.content.filter((id) => ids.includes(id))
    }
  })

  return sanitized
}

export const getNotionContent = async (notion: NotionAPI, id: string) => {
  try {
    const content = await runWithNotionRetry(() => notion.getPage(id, { fetchCustomEmojis: true }))
    return content ? sanitizeRecordMap(content) : undefined
  } catch (error) {
    console.error('Unable to get content from Notion', error)
    return undefined
  }
}
