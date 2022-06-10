import { iframeResize } from 'iframe-resizer'

const script = document.getElementById('datagir-mon-convertisseur-co2')

const type = script.dataset.type || 'tuiles'
const search = script.dataset.search
const source = window.location.href.toString()

const src = `https://mcc-v2.netlify.app/iframe/${type}${search}&source=${source}`

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

script.parentNode.insertBefore(iframe, script)
