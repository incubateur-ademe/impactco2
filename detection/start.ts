import React, { render } from 'preact/compat'
import 'utils/variables.css'
import Detector, { regex } from 'components/externalModules/detection/Detector'
import './style.css'

const transform = (element: Element, darkMode?: boolean) => {
  const hasImpact = regex.exec(element.innerHTML)
  if (hasImpact && hasImpact[1] !== '0') {
    const etiquette = document.createElement('DIV')
    etiquette.className = 'impactCO2-container'
    if (darkMode) {
      etiquette.classList.add('night')
    }
    const existingValues = element.innerHTML.split(hasImpact[0])
    const before = document.createElement('DIV')
    before.className = 'impactCO2-container'
    before.innerHTML = existingValues[0]
    const after = document.createElement('DIV')
    after.className = 'impactCO2-container'
    after.innerHTML = existingValues[1]
    transform(after, darkMode)
    render(React.createElement(Detector, { impact: hasImpact[0] }), etiquette)
    element.replaceChildren(before, etiquette, after)
  }
}

export const start = (darkMode?: boolean) => {
  const elems = document.querySelectorAll('*')
  Array.from(elems)
    .filter((elem) => {
      console.log(elem.className)
      if (
        elem.tagName !== 'HEAD' &&
        elem.tagName !== 'STYLE' &&
        elem.tagName !== 'BUTTON' &&
        [...elem.childNodes.values()].every(
          (child) =>
            child.nodeName === '#text' || child.nodeName === 'SUB' || child.nodeName == 'SPAN' || child.nodeName === 'A'
        )
      ) {
        return true
      }
      return false
    })
    .forEach((elem) => {
      if (elem.textContent) {
        try {
          transform(elem, darkMode)
        } catch (e) {
          console.error('Impossible de générer les équivalents', e)
        }
      }
    })
}
