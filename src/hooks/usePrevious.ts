import { useEffect, useRef } from 'react'

// Inspired by https://github.com/kripod/react-hooks/blob/master/packages/state-hooks/src/usePrevious.ts
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
