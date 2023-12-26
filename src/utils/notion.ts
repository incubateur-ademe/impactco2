import { z } from 'zod'

export const NotionCommandValidation = z.object({
  type: z.literal('contact'),
  email: z
    .string({ required_error: 'Veuillez renseigner un email valide.' })
    .email({ message: 'Veuillez renseigner un email valide.' }),
  needs: z.string().optional(),
  structure: z.string(),
  other: z.string().optional(),
  from: z.string(),
})

export type NotionCommand = z.infer<typeof NotionCommandValidation>
