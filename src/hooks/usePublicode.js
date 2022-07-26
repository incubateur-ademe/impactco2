import { useState } from 'react'

export default function usePublicode() {
  const [test, setTest] = useState('lol')
  return { test, setTest }
}
