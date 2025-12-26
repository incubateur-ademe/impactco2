import { useMemo } from 'react'
import { ZodError, treeifyError } from 'zod'

const findError = (id: string, errors?: ZodError<Record<string, unknown>> | null) => {
  if (!errors) {
    return null
  }

  const error = treeifyError<Record<string, unknown>>(errors).properties?.[id]
  if (!error) {
    return null
  }

  return error.errors.join(', ')
}

export default function useError(id: string | undefined, errors: ZodError<Record<string, unknown>> | null | undefined) {
  const error = useMemo(() => (id ? findError(id, errors) : null), [id, errors])

  return error
}
