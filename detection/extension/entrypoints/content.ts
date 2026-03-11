import { start } from '../../start'

export default defineContentScript({
  matches: ['*://*/*'],
  runAt: 'document_idle',

  main() {
    // If the script is already load, do not run the extension
    if (
      document.getElementById('script-detecteur-impact-co2') !== null ||
      typeof (window as Window & { impactCO2Detection?: unknown }).impactCO2Detection !== 'undefined'
    ) {
      return
    }

    start()

    setTimeout(start, 2000)

    let debounceTimer: ReturnType<typeof setTimeout>

    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        observer.disconnect()
        start()
        requestAnimationFrame(() => {
          observer.observe(document.body, { childList: true, subtree: true })
        })
      }, 500)
    })

    observer.observe(document.body, { childList: true, subtree: true })
  },
})
