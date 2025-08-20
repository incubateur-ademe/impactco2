import { RandomCategory } from 'components/comparateur/randomEtiquette'
import { initMatomo, start } from './start'

initMatomo()

const element = document.getElementById('script-detecteur-impact-co2')
if (element) {
  const search = new URLSearchParams(element.dataset.search || '')
  start(
    search.get('theme') === 'night',
    search.get('language') as 'fr' | 'en',
    search.get('category') as RandomCategory,
    search.get('equivalents') as string
  )
  setTimeout(
    () =>
      start(
        search.get('theme') === 'night',
        search.get('language') as 'fr' | 'en',
        search.get('category') as RandomCategory,
        search.get('equivalents') as string
      ),
    2000
  )
} else {
  start()
  setTimeout(start, 2000)
}
