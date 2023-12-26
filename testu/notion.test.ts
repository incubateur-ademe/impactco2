import { NotionCommand, NotionCommandValidation } from '../src/utils/notion'
import { expectZodValidationToFail } from '../test-utils/zodValidationTest'

describe('Notion api command', () => {
  const validCommand: NotionCommand = {
    type: 'contact',
    email: 'test@cool.fr',
    structure: 'nimps',
    from: 'test',
  }

  it('allows valid command', () => {
    const result = NotionCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid command with other structure', () => {
    const result = NotionCommandValidation.safeParse({ ...validCommand, other: 'autres' })
    expect(result.success).toEqual(true)
  })

  it('allows valid command with needs', () => {
    const result = NotionCommandValidation.safeParse({ ...validCommand, needs: 'mes besoin' })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty email', () => {
    expectZodValidationToFail(
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
      NotionCommandValidation,
      validCommand,
      {
        structure: undefined,
      },
      [
        {
          path: ['structure'],
          message: 'Required',
        },
      ]
    )
  })

  it('does not allow empty from', () => {
    expectZodValidationToFail(
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
