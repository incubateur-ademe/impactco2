import { searchValidation } from 'pages/api/search'
import { expectZodValidationToFail } from '../test-utils/zodValidationTest'

describe('Search api command', () => {
  const validCommand = {
    search: 'adresse',
  }

  it('allows valid command', () => {
    const result = searchValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid limit', () => {
    const result = searchValidation.safeParse({ ...validCommand, limit: 4 })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty search', () => {
    expectZodValidationToFail(
      searchValidation,
      validCommand,
      {
        search: undefined,
      },
      [
        {
          path: ['search'],
          message: 'Required',
        },
      ]
    )
  })
  it('does not allow weird limit', () => {
    expectZodValidationToFail(
      searchValidation,
      validCommand,
      {
        limit: "j'en ai pas !!!",
      },
      [
        {
          path: ['limit'],
          message: 'Expected number, received string',
        },
      ]
    )
  })
})
