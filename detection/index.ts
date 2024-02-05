import React, { render } from 'preact/compat'
import 'utils/variables.css'
import Detector, { regex } from 'components/externalModules/detection/Detector'
import './style.css'

const elems = document.querySelectorAll('*')
Array.from(elems)
  .filter((elem) => {
    if (
      elem.tagName !== 'HEAD' &&
      elem.tagName !== 'STYLE' &&
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
      const hasImpact = regex.exec(elem.innerHTML)
      if (hasImpact) {
        const etiquette = document.createElement('DIV')
        etiquette.className = 'impactCO2-container'
        const existingValues = elem.innerHTML.split(hasImpact[0])
        const before = document.createElement('DIV')
        before.className = 'impactCO2-container'
        before.innerHTML = existingValues[0]
        const after = document.createElement('DIV')
        after.className = 'impactCO2-container'
        after.innerHTML = existingValues[1]
        elem.replaceChildren(before, etiquette, after)
        const test = React.createElement(Detector, { impact: hasImpact[0] })
        render(test, etiquette)
      }
    }
  })
