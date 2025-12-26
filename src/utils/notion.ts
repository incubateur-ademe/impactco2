import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

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

type NotionResult<T> = { id: string; properties: T; last_edited_time: string }
export const getAllNotionDB = async <T>(url: string) => {
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
