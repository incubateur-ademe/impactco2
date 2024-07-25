import { initMatomo, start } from './start'

initMatomo()

const element = document.getElementById('script-detecteur-impact-co2')
if (element) {
  const search = new URLSearchParams(element.dataset.search || '')
  start(search.get('theme') === 'night', search.get('language') as 'fr' | 'en')
  setTimeout(() => start(search.get('theme') === 'night', search.get('language') as 'fr' | 'en'), 2000)
} else {
  start()
  setTimeout(start, 2000)
}
