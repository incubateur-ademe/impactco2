import { NotionCommand, NotionCommandValidation } from '../src/utils/notion'
import { expectZodValidationToFail } from './zodValidationTest'

describe('Notion api command', () => {
  const validCommand: NotionCommand = {
    type: 'contact',
    email: 'test@cool.fr',
  }

  it('allows valid command', () => {
    const result = NotionCommandValidation.safeParse(validCommand)
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
})
