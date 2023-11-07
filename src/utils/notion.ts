import { z } from 'zod'

export const NotionCommandValidation = z.object({
  type: z.literal('contact'),
  email: z
    .string({ required_error: 'Veuillez renseigner un email valide.' })
    .email({ message: 'Veuillez renseigner un email valide.' }),
})

export type NotionCommand = z.infer<typeof NotionCommandValidation>
