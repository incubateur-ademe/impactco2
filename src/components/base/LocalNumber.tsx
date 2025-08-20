'use client'

import { useEffect, useState } from 'react'

const LocalNumber = ({ number }: { number: number }) => {
  const [value, setValue] = useState(number.toLocaleString('fr-FR'))

  useEffect(() => {
    const newValue = number.toLocaleString()
    if (newValue !== value) {
      setValue(newValue)
    }
  }, [number])

  return <>{value}</>
}

export default LocalNumber
