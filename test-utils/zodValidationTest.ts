import z from 'zod'

export const normalizeZodErrorForTestExpect = (errors: { path: (string | number | symbol)[]; message: string }[]) =>
  Object.fromEntries(
    errors
      .map((error): [string, string] => [error.path.map((p) => String(p)).join('.'), error.message])
      .sort((a, b) => a[0].localeCompare(b[0]))
  )

export const expectZodValidationToFail = <T, U extends object>(
  validation: z.ZodTypeAny,
  validObject: T,
  fields: U,
  errors: { path: string[]; message: string }[]
) => {
  const result = validation.safeParse({ ...validObject, ...fields })

  if (result.success) {
    console.error(`Fields should not be valid. Expected errors: ${errors.map((error) => error.message).join(', ')}`)
    expect(result.success).toBeFalsy()
    return
  }

  const expectedErrorMessages = normalizeZodErrorForTestExpect(errors)
  const actualErrorMessages = normalizeZodErrorForTestExpect(result.error.issues)

  expect(actualErrorMessages).toEqual(expectedErrorMessages)
}
