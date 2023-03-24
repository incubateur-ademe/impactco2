import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'

export default function useScreenshot(slug) {
  const ref = useRef(null)

  const [isScreenshotting, setIsScreenshotting] = useState(false)

  const takeScreenshot = () => {
    setIsScreenshotting(true)
    setTimeout(() => {
      if (ref.current === null) {
        return
      }
      toPng(ref.current, {
        cacheBust: true,
        filter: (node) => {
          return !node.className || !node.className.includes
            ? true
            : !node.className?.includes('noscreenshot')
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
    }, 20)
    window?._paq?.push(['trackEvent', 'Interaction', 'Screenshot', slug])
  }

  return { ref, takeScreenshot, isScreenshotting }
}
