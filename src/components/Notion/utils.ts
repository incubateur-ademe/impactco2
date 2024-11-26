import { NotionAPI } from 'notion-client'

export const getNotionContentProps = async (id: string) => {
  const notion = new NotionAPI()
  return notion.getPage(id)
}

export const improveAccessibility = (ref: HTMLDivElement) => {
  const elements = ref.getElementsByTagName('svg')
  for (const element of elements) {
    element.setAttribute('alt', '')
  }

  const mains = ref.getElementsByTagName('main')
  for (const main of mains) {
    main.outerHTML = `<div>${main.innerHTML}</div>`
  }
  const lis = ref.getElementsByTagName('li')
  for (const li of lis) {
    li.innerHTML = `<p>${li.innerHTML}</p>`
  }
  const texts = ref.getElementsByClassName('notion-text')
  for (const text of texts) {
    text.innerHTML = `<p>${text.innerHTML}</p>`
  }
  const calloutTexts = ref.getElementsByClassName('notion-callout-text')
  for (const calloutText of calloutTexts) {
    calloutText.innerHTML = `<p>${calloutText.innerHTML}</p>`
  }

  const icons = ref.getElementsByClassName('notion-page-icon')
  for (const icon of icons) {
    if (icon.tagName.toLowerCase() === 'span') {
      icon.removeAttribute('role')
      icon.removeAttribute('aria-label')
      icon.setAttribute('aria-hidden', 'true')
    }
  }
  const fastLinks = ref.getElementsByClassName('notion-hash-link')
  for (const fastLink of fastLinks) {
    fastLink.remove()
  }
}
