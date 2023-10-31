import { iframeResize } from 'iframe-resizer'

const script = document.getElementById('impact-livraison')
// below : injected WEBPACK_SITE_URL constant from env var, see webpack.config.js
// eslint-disable-next-line no-undef
const src = `https://${WEBPACK_SITE_URL}/iframes/livraison/simulation`

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
link.innerHTML = `<a href="https://impactco2.fr/livraison" target="_blank">Découvrez l'empreinte carbone de la livraison de colis</a>`
link.style.cssText = `
  margin: 0.5rem auto 1rem;
  text-align: center
`

script.parentNode.insertBefore(iframe, script)
script.parentNode.insertBefore(link, script)
