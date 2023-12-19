import { useState } from 'react'

export function useSessionStorage(keyName, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (newValue) => {
    window.sessionStorage.setItem(keyName, JSON.stringify(newValue))
    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
