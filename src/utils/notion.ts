import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const NotionCommandValidation = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('contact'),
      from: z.string(),
      other: z.string().optional(),
      needs: z.string().optional(),
      structure: z
        .string({ required_error: 'Veuillez renseigner votre structure.' })
        .min(1, 'Veuillez renseigner votre structure.'),
      email: z
        .string({ required_error: 'Veuillez renseigner un email valide.' })
        .email({ message: 'Veuillez renseigner un email valide.' }),
      accepted: z.literal(true, { errorMap: () => ({ message: 'Veuillez lire et accepter' }) }),
      newsletter: z.boolean(),
    }),
    z.object({
      type: z.literal('suggestion'),
      from: z.string(),
      text: z.string().optional(),
      avis: z.number().min(1).max(5).optional(),
      suggestionType: z
        .string({ required_error: 'Veuillez renseigner le type de suggestion.' })
        .min(1, 'Veuillez renseigner le type de suggestion.'),
      email: z.string().email({ message: 'Veuillez renseigner un email valide.' }).optional().or(z.literal('')),
      accepted: z.literal(true, { errorMap: () => ({ message: 'Veuillez lire et accepter' }) }),
    }),
  ])
  .superRefine((values, ctx) => {
    if (values.type === 'contact' && values.structure === 'autre' && !values.other) {
      ctx.addIssue({
        path: ['other'],
        code: 'custom',
        message: 'Veuillez preciser votre structure.',
      })
    }

    if (values.type === 'suggestion') {
      if (values.suggestionType !== 'avis' && !values.text) {
        ctx.addIssue({
          path: ['text'],
          code: 'custom',
          message:
            values.suggestionType === 'idee' ? 'Veuillez décrire votre idée.' : 'Veuillez décrire le bug rencontré.',
        })
      }
      if (values.suggestionType === 'avis' && !values.avis) {
        ctx.addIssue({
          path: ['avis'],
          code: 'custom',
          message: 'Veuillez indiquer une note.',
        })
      }
    }
  })

export type NotionCommand = z.infer<typeof NotionCommandValidation>

export const getAllNotionDB = async <T>(url: string): Promise<{ id: string; properties: T }[]> => {
  let results: { id: string; properties: T }[] = []
  let axiosResponse:
    | AxiosResponse<{
        results: {
          id: string
          properties: T
        }[]
        next_cursor: boolean
        has_more: boolean
      }>
    | undefined = undefined

  while (!axiosResponse || axiosResponse.data.has_more) {
    axiosResponse = await axios.post<{
      results: {
        id: string
        properties: T
      }[]
      next_cursor: boolean
      has_more: boolean
    }>(
      url,
      { start_cursor: axiosResponse ? axiosResponse.data.next_cursor : undefined },
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
