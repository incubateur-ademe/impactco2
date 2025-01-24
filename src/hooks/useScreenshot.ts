'use client'

import { useEffect, useRef, useState } from 'react'
import { track } from 'utils/matomo'
import useTheme from 'components/layout/UseTheme'

export default function useScreenshot(slug: string, tracking: string) {
  const ref = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()

  const [isScreenshotting, setIsScreenshotting] = useState(false)
  useEffect(() => {
    if (isScreenshotting) {
      import('html-to-image').then((mod) => {
        if (ref.current !== null) {
          mod
            .toPng(ref.current, {
              cacheBust: true,
              backgroundColor: theme === 'night' ? 'black' : 'white', // variables CSS non disponibles au moment du screenshot
              filter: (node: HTMLElement) => {
                return !node.classList?.contains('no-screenshot')
              },
            })
            .then((dataUrl) => {
              const link = document.createElement('a')
              link.download = `${slug}.png`
              link.href = dataUrl
              link.click()

              setIsScreenshotting(false)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }, [ref, isScreenshotting, slug])

  const takeScreenshot = () => {
    track(tracking, 'Screenshot', slug)
    setIsScreenshotting(true)
  }

  return { ref, takeScreenshot, isScreenshotting }
}
