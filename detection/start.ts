import React, { render } from 'preact/compat'
import 'utils/variables.css'
import Detector, { regexs } from 'components/externalModules/detection/Detector'
import './style.css'

const className = 'impactCO2-container'
const forbiddenTag = ['TITLE', 'HEAD', 'STYLE', 'SCRIPT', 'path', 'IMG', 'META', 'BUTTON', 'A']

const transform = (element: Element, language: 'fr' | 'en', darkMode?: boolean) => {
  if (forbiddenTag.includes(element.tagName) || element.getAttribute('impactCO2') === 'managed') {
    return
  }

  const hasImpact = regexs[language].exec(element.innerHTML)
  if (hasImpact && hasImpact[1] !== '0') {
    const etiquette = document.createElement('DIV')
    etiquette.className = className
    if (darkMode) {
      etiquette.classList.add('night')
    }
    const existingValues = element.innerHTML.split(hasImpact[0])
    const before = document.createElement('DIV')
    before.className = className
    before.innerHTML = existingValues[0]
    const after = document.createElement('DIV')
    after.className = className
    after.innerHTML = existingValues[1]
    transform(after, language, darkMode)
    render(React.createElement(Detector, { impact: hasImpact[0], language }), etiquette)
    element.setAttribute('impactCO2', 'managed')
    element.replaceChildren(before, etiquette, after)
  }
}

const transformText = (element: Element, language: 'fr' | 'en', darkMode?: boolean) => {
  ;[...element.childNodes.values()]
    .filter((child) => child.nodeName === '#text')
    .forEach((child) => {
      if (child.textContent) {
        const hasImpact = regexs[language].exec(child.textContent)
        if (hasImpact && hasImpact[1] !== '0') {
          const etiquette = document.createElement('DIV')
          etiquette.className = className
          if (darkMode) {
            etiquette.classList.add('night')
          }
          const existingValues = child.textContent.split(hasImpact[0])
          const before = document.createElement('DIV')
          before.className = className
          before.innerHTML = existingValues[0]
          const after = document.createElement('DIV')
          after.className = className
          after.innerHTML = existingValues[1]
          transform(after, language, darkMode)
          render(React.createElement(Detector, { impact: hasImpact[0], language }), etiquette)
          child.replaceWith(before, etiquette, after)
        }
      }
    })
}
export const initMatomo = () => {
  //@ts-expect-error: Matomo redefinition
  const paqInit = window._paq
  //@ts-expect-error: Matomo redefinition
  const _paq_impactco2 = (window._paq_impactco2 = window._paq_impactco2 || [])
  ;(function () {
    //@ts-expect-error: injected MATOMO_SITE_URL, MATOMO_SITE_ID constant from env var, see webpack.config.js
    const u = MATOMO_SITE_URL
    _paq_impactco2.push(['setTrackerUrl', u + '/matomo.php'])
    //@ts-expect-error: injected MATOMO_SITE_URL, MATOMO_SITE_ID constant from env var, see webpack.config.js
    _paq_impactco2.push(['setSiteId', MATOMO_SITE_ID])
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.src = u + '/matomo.js'
    g.onload = function () {
      //@ts-expect-error: Matomo redefinition
      window._paq_impactco2 = window._paq
      //@ts-expect-error: Matomo redefinition
      window._paq = paqInit
    }
    //@ts-expect-error: Matomo redefinition
    s.parentNode.insertBefore(g, s)
  })()

  //@ts-expect-error: Matomo redefinition
  window.please = {}
  window.please.track = function (ary) {
    //@ts-expect-error: Matomo redefinition
    window?._paq_impactco2?.push(ary)
  }
}

export const start = (darkMode?: boolean, language?: 'fr' | 'en') => {
  const elems = document.querySelectorAll('*')

  Array.from(elems)
    .filter((elem) => {
      if (
        !forbiddenTag.includes(elem.tagName) &&
        [...elem.childNodes.values()].every(
          (child) =>
            child.nodeName === '#text' ||
            child.nodeName === 'SUB' ||
            child.nodeName === 'SUP' ||
            child.nodeName == 'SPAN' ||
            child.nodeName == 'STRONG' ||
            child.nodeName === 'A' ||
            child.nodeName === 'EM' ||
            child.nodeName === 'B' ||
            child.nodeName === 'BR'
        )
      ) {
        return true
      }
      return false
    })
    .reverse()
    .forEach((elem) => {
      try {
        const childs = [...elem.childNodes.values()]
        if (
          childs.every((child) => child.nodeName === '#text' || child.nodeName === 'SUB' || child.nodeName === 'SUP')
        ) {
          transform(elem, language || 'fr', darkMode)
        } else {
          ;[...elem.children].forEach((child) => {
            transform(child, language || 'fr', darkMode)
          })
          transformText(elem, language || 'fr', darkMode)
        }
      } catch (e) {
        console.error('Impossible de générer les équivalents', e)
      }
    })
}
