import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'

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
          console.log(node.class)
          return !node.classList ? true : !node.classList[0]?.includes('Button')
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
  }

  return { ref, takeScreenshot, isScreenshotting }
}
