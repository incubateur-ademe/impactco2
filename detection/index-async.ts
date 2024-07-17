import { initMatomo, start } from './start'

initMatomo()

const element = document.getElementById('script-detecteur-impact-co2')
if (element) {
  const search = new URLSearchParams(element.dataset.search || '')
  // @ts-expect-error: adding on purpose
  window.impactCO2Detection = () => start(search.get('theme') === 'night', search.get('language') as 'fr' | 'en')
} else {
  // @ts-expect-error: adding on purpose
  window.impactCO2Detection = start
}
