import { NotionCommand, NotionCommandValidation } from '../src/utils/notion'
import { expectZodValidationToFail } from '../test-utils/zodValidationTest'

describe('Notion api command', () => {
  const validCommand: NotionCommand = {
    type: 'contact',
    email: 'test@cool.fr',
    structure: 'association',
    from: 'test',
  }

  it('allows valid command', () => {
    const result = NotionCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid command with other structure and specification', () => {
    const result = NotionCommandValidation.safeParse({ ...validCommand, structure: 'autre', other: 'autres' })
    expect(result.success).toEqual(true)
  })

  it('does allows valid command with other structure and no specification', () => {
    expectZodValidationToFail(
      // @ts-expect-error: Zod too complex
      NotionCommandValidation,
      validCommand,
      {
        structure: 'autre',
      },
      [
        {
          path: ['other'],
          message: 'Veuillez preciser votre structure.',
        },
      ]
    )
  })

  it('allows valid command with needs', () => {
    const result = NotionCommandValidation.safeParse({ ...validCommand, needs: 'mes besoin' })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty email', () => {
    expectZodValidationToFail(
      // @ts-expect-error: Zod too complex
      NotionCommandValidation,
      validCommand,
      {
        email: undefined,
      },
      [
        {
          path: ['email'],
          message: 'Veuillez renseigner un email valide.',
        },
      ]
    )
  })

  it('does not allow unvalid email', () => {
    expectZodValidationToFail(
      // @ts-expect-error: Zod too complex
      NotionCommandValidation,
      validCommand,
      {
        email: 'juste du texte',
      },
      [
        {
          path: ['email'],
          message: 'Veuillez renseigner un email valide.',
        },
      ]
    )
  })

  it('does not allow empty structure', () => {
    expectZodValidationToFail(
      // @ts-expect-error: Zod too complex
      NotionCommandValidation,
      validCommand,
      {
        structure: undefined,
      },
      [
        {
          path: ['structure'],
          message: 'Veuillez renseigner votre structure.',
        },
      ]
    )
  })

  it('does not allow empty from', () => {
    expectZodValidationToFail(
      // @ts-expect-error: Zod too complex
      NotionCommandValidation,
      validCommand,
      {
        from: undefined,
      },
      [
        {
          path: ['from'],
          message: 'Required',
        },
      ]
    )
  })
})
