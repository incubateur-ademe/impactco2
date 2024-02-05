import React, { render } from 'preact/compat'
import 'utils/variables.css'
import Detector, { regex } from 'components/externalModules/detection/Detector'
import './style.css'

const elems = document.querySelectorAll('*')
Array.from(elems)
  .filter((elem) => elem.childNodes.length === 1 && elem.childNodes[0].nodeName === '#text')
  .forEach((elem) => {
    if (elem.textContent) {
      const hasImpact = regex.exec(elem.textContent)
      if (hasImpact) {
        const etiquette = document.createElement('DIV')
        etiquette.classList.add('impactCO2-container')
        etiquette.classList.add('night')
        const existingValues = elem.innerHTML.split(hasImpact[0])
        elem.replaceWith(existingValues[0], etiquette, existingValues[1])
        const test = React.createElement(Detector, { impact: hasImpact[0] })
        render(test, etiquette)
      }
    }
  })
