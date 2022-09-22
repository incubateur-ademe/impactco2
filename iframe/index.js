import { iframeResize } from 'iframe-resizer'

const script = document.getElementById('datagir-mon-convertisseur-co2')

const type = script.dataset.type || 'tuiles'
const search = script.dataset.search
const source = window.location.href.toString()

const src = `https://monconvertisseurco2.fr/iframes/${type}${search}${
  search ? '&' : '?'
}source=${source}`

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
link.innerHTML = `<a href="https://monconvertisseurco2.fr" target="_blank">Découvrez l'empreinte carbone des objets et gestes de votre quotidien</a>`
link.style.cssText = `
margin: 0.5rem auto 1rem;
text-align: center
`

script.parentNode.insertBefore(iframe, script)
script.parentNode.insertBefore(link, script)
