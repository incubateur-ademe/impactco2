import { NotionCommand, NotionCommandValidation } from '../src/utils/notion'
import { expectZodValidationToFail } from '../test-utils/zodValidationTest'

describe('Notion api command', () => {
  describe('Suggestion', () => {
    const validCommand: NotionCommand = {
      type: 'suggestion',
      email: 'test@test.fr',
      from: 'test',
      structure: 'etat',
      suggestionType: 'bug',
      text: 'Ca marche pas !',
      accepted: true,
      newsletter: false,
    }

    it('allows valid command', () => {
      const result = NotionCommandValidation.safeParse(validCommand)
      expect(result.success).toEqual(true)
    })

    it('does not allow valid command with not accepted', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          accepted: 'false',
        },
        [
          {
            path: ['accepted'],
            message: 'Veuillez lire et accepter la politique de protection des données personnelles',
          },
        ]
      )
    })

    it('does not allow valid command with empty acceptation', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          accepted: undefined,
        },
        [
          {
            path: ['accepted'],
            message: 'Veuillez lire et accepter la politique de protection des données personnelles',
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

    it('does not allow empty suggestion', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: undefined,
        },
        [
          {
            path: ['suggestionType'],
            message: 'Veuillez spécifier votre type de retour.',
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
            message: 'Veuillez renseigner votre structure.',
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

    it('does not allow empty text ', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          text: undefined,
        },
        [
          {
            path: ['text'],
            message: 'Veuillez renseigner votre message.',
          },
        ]
      )
    })
  })
  describe('Rendez-vous', () => {
    const validCommand: NotionCommand = {
      type: 'rendezvous',
      email: 'test@test.fr',
      from: 'test',
      structure: 'etat',
      suggestionType: 'bug',
      text: 'Ca marche pas !',
      accepted: true,
      newsletter: false,
    }

    it('allows valid command', () => {
      const result = NotionCommandValidation.safeParse(validCommand)
      expect(result.success).toEqual(true)
    })

    it('does not allow valid command with not accepted', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          accepted: 'false',
        },
        [
          {
            path: ['accepted'],
            message: 'Veuillez lire et accepter la politique de protection des données personnelles',
          },
        ]
      )
    })

    it('does not allow valid command with empty acceptation', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          accepted: undefined,
        },
        [
          {
            path: ['accepted'],
            message: 'Veuillez lire et accepter la politique de protection des données personnelles',
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

    it('does not allow empty suggestion', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          suggestionType: undefined,
        },
        [
          {
            path: ['suggestionType'],
            message: 'Veuillez renseigner votre demande.',
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
            message: 'Veuillez renseigner votre structure.',
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

    it('does not allow empty text ', () => {
      expectZodValidationToFail(
        NotionCommandValidation,
        validCommand,
        {
          text: undefined,
        },
        [
          {
            path: ['text'],
            message: 'Veuillez renseigner votre message.',
          },
        ]
      )
    })
  })
})
