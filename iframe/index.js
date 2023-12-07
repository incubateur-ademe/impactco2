// below : injected WEBPACK_SITE_URL constant from env var, see webpack.config.js

/* eslint-disable no-undef */
import { iframeResize } from 'iframe-resizer'

const buttonOnly = !!document.getElementById('mon-impact-transport')

const script =
  document.getElementById('mon-impact-transport') ||
  document.getElementById('datagir-teletravail') ||
  document.getElementById('ecolab-transport') ||
  document.getElementById('datagir-mon-convertisseur-co2') ||
  document.getElementById('datagir-impact-co2') ||
  document.getElementById('impact-livraison') ||
  document.getElementById('impact-co2')

if (buttonOnly) {
  let simpleButtonScreen = document.createElement('div')
  simpleButtonScreen.innerHTML = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  <a target="_blank" title="Impact carbone de vos déplacements (ouvre le site impactCO2 dans un nouvel onglet)" href="${WEBPACK_SITE_URL}/transport/itineraire" style="background-color: rgb(38, 130, 124); color:white; cursor:pointer; display:block; padding:1rem; border-radius:8px; text-decoration: none; text-align: center;">
    Découvrez l'impact carbone de vos déplacements
  </a>
  </div>
  `
  script.parentNode.insertBefore(simpleButtonScreen, script)
} else {
  const type = script.dataset.type
    ? script.dataset.type
    : document.getElementById('mon-impact-transport') ||
        document.getElementById('datagir-teletravail') ||
        document.getElementById('ecolab-transport')
      ? 'empreinte-carbone/transport'
      : document.getElementById('impact-livraison')
        ? 'livraison'
        : 'tuiles'
  const search = script.dataset.search || ''

  const src = `${WEBPACK_SITE_URL}/iframes/${type}${search}`

  const iframe = document.createElement('iframe')

  const iframeAttributes = {
    src,
    style: 'border: none; width: 100%; display: block; margin: 0 auto;',
    allowfullscreen: true,
    webkitallowfullscreen: true,
    mozallowfullscreen: true,
    allow: 'geolocation',
  }
  for (var key in iframeAttributes) {
    iframe.setAttribute(key, iframeAttributes[key])
  }
  iframeResize({}, iframe)

  const link = document.createElement('div')

  link.innerHTML =
    type === 'livraison'
      ? `<a href="${WEBPACK_SITE_URL}/livraison" target="_blank">Découvrez l'empreinte carbone de la livraison de colis</a>`
      : `<a href="${WEBPACK_SITE_URL}" target="_blank">Découvrez l'empreinte carbone des objets et gestes de votre quotidien</a>`
  link.style.cssText = `margin: 0.5rem auto 1rem;text-align: center`

  script.parentNode.insertBefore(iframe, script)
  script.parentNode.insertBefore(link, script)
}
