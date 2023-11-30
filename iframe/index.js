import { iframeResize } from 'iframe-resizer'

const isFigaro = !!document.getElementById('mon-impact-transport')

const script =
  document.getElementById('mon-impact-transport') ||
  document.getElementById('datagir-teletravail') ||
  document.getElementById('ecolab-transport') ||
  document.getElementById('datagir-mon-convertisseur-co2') ||
  document.getElementById('datagir-impact-co2') ||
  document.getElementById('impact-co2')

const type = script.dataset.type
  ? script.dataset.type
  : document.getElementById('mon-impact-transport') ||
      document.getElementById('datagir-teletravail') ||
      document.getElementById('ecolab-transport')
    ? 'empreinte-carbone/transport'
    : 'tuiles'
const search = script.dataset.search || ''
const source = window.location.href.toString()

const src = `https://impactco2.fr/iframes/${type}${search}${search ? '&' : '?'}source=${source}`

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
link.innerHTML = `<a href="https://impactco2.fr" target="_blank">Découvrez l'empreinte carbone des objets et gestes de votre quotidien</a>`
link.style.cssText = `margin: 0.5rem auto 1rem;text-align: center`

if (!isFigaro) {
  script.parentNode.insertBefore(iframe, script)
  script.parentNode.insertBefore(link, script)
} else {
  let simpleButtonScreen = document.createElement('div')
  simpleButtonScreen.innerHTML = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  <a target="_blank" title="Impact carbone de vos déplacements (ouvre le site impactCO2 dans un nouvel onglet)" href="https://impactco2.fr/transport/itineraire" style="background-color: rgb(38, 130, 124); color:white; cursor:pointer; display:block; padding:1rem; border-radius:8px; text-decoration: none; text-align: center;">
    Découvrez l'impact carbone de vos déplacements
  </a>
  </div>
  `
  script.parentNode.insertBefore(simpleButtonScreen, script)
}

console.log('isFig', isFigaro)
console.log('window.location.ancestorOrigins[0]', window.location.ancestorOrigins[0])
console.log('document.referrer', document.referrer)
