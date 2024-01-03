import { useMemo } from 'react'
import { ZodError } from 'zod'

const findError = (id: string, errors?: ZodError | null) => {
  if (!errors) {
    return null
  }

  const error = errors.flatten().fieldErrors[id]
  if (!error) {
    return null
  }

  return error.join(', ')
}

export default function useError(id: string, errors: ZodError | null | undefined) {
  const error = useMemo(() => findError(id, errors), [id, errors])

  return error
}
