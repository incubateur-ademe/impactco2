import { z } from 'zod'

export const NotionCommandValidation = z
  .object({
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
  })
  .superRefine(({ structure, other }, ctx) => {
    if (structure === 'autre' && !other) {
      ctx.addIssue({
        path: ['other'],
        code: 'custom',
        message: 'Veuillez preciser votre structure.',
      })
    }
  })

export type NotionCommand = z.infer<typeof NotionCommandValidation>
