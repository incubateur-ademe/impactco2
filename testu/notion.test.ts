import { NotionCommand, NotionCommandValidation } from '../src/utils/notion'
import { expectZodValidationToFail } from '../test-utils/zodValidationTest'

describe('Notion api command', () => {
  describe('Contact', () => {
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

    it('does not allow valid command with other structure and no specification', () => {
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

  describe('Suggestion', () => {
    const validCommand: NotionCommand = {
      type: 'suggestion',
      from: 'test',
      suggestionType: 'bug',
      text: 'Ca marche pas !',
    }

    it('allows valid command', () => {
      const result = NotionCommandValidation.safeParse(validCommand)
      expect(result.success).toEqual(true)
    })

    it('allows valid command with avis and note', () => {
      const result = NotionCommandValidation.safeParse({
        ...validCommand,
        suggestionType: 'avis',
        avis: 4,
        test: undefined,
      })
      expect(result.success).toEqual(true)
    })

    it('does not allow valid command with avis and no note', () => {
      expectZodValidationToFail(
        // @ts-expect-error: Zod too complex
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: 'avis',
        },
        [
          {
            path: ['avis'],
            message: 'Veuillez indiquer une note.',
          },
        ]
      )
    })

    it('allows valid command with email', () => {
      const result = NotionCommandValidation.safeParse({ ...validCommand, email: 'test@ok.fr' })
      expect(result.success).toEqual(true)
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

    it('does not allow empty suggestion', () => {
      expectZodValidationToFail(
        // @ts-expect-error: Zod too complex
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: undefined,
        },
        [
          {
            path: ['suggestionType'],
            message: 'Veuillez renseigner le type de suggestion.',
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

    it('does not allow empty text for bug', () => {
      expectZodValidationToFail(
        // @ts-expect-error: Zod too complex
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: 'bug',
          text: undefined,
        },
        [
          {
            path: ['text'],
            message: 'Veuillez décrire le bug rencontré.',
          },
        ]
      )
    })

    it('does not allow empty text for idea', () => {
      expectZodValidationToFail(
        // @ts-expect-error: Zod too complex
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: 'idee',
          text: undefined,
        },
        [
          {
            path: ['text'],
            message: 'Veuillez décrire votre idée.',
          },
        ]
      )
    })
  })
})
