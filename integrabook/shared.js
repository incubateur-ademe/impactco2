const _cfg = typeof INTEGRABOOK_CONFIG !== 'undefined' ? INTEGRABOOK_CONFIG : {}
const DEFAULT_BASE_URL = _cfg.baseUrl || 'https://impactco2.fr'
const DEFAULT_THEME = _cfg.theme || 'default'
const DEFAULT_LANGUAGE = _cfg.language || 'fr'

function sanitizeUrl(url) {
  if (!url) return null
  try {
    const parsed = new URL(url.replace(/\/+$/, ''))
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:')
      return (parsed.origin + parsed.pathname).replace(/\/+$/, '')
  } catch {
    // invalid URL
  }
  return null
}

function getBaseUrl() {
  const params = new URLSearchParams(window.location.search)
  return (
    sanitizeUrl(params.get('baseUrl')) || sanitizeUrl(localStorage.getItem('integrabook-baseUrl')) || DEFAULT_BASE_URL
  )
}

function setBaseUrl(url) {
  const safe = sanitizeUrl(url)
  if (safe) localStorage.setItem('integrabook-baseUrl', safe)
}

function getTheme() {
  const params = new URLSearchParams(window.location.search)
  return params.get('theme') || localStorage.getItem('integrabook-theme') || DEFAULT_THEME
}

function getLanguage() {
  const params = new URLSearchParams(window.location.search)
  return params.get('language') || localStorage.getItem('integrabook-language') || DEFAULT_LANGUAGE
}

function createEl(tag, attrs, children) {
  const el = document.createElement(tag)
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'textContent') el.textContent = v
      else if (k === 'style' && typeof v === 'string') el.style.cssText = v
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v)
      else el.setAttribute(k, v)
    }
  }
  if (children) {
    for (const child of Array.isArray(children) ? children : [children]) {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child))
      else if (child) el.appendChild(child)
    }
  }
  return el
}

function initConfigBar() {
  const bar = document.getElementById('config-bar')
  if (!bar) return

  const baseUrl = getBaseUrl()
  const theme = getTheme()
  const language = getLanguage()

  const baseUrlInput = createEl('input', {
    type: 'text',
    id: 'cfg-baseurl',
    value: baseUrl,
    placeholder: 'https://impactco2.fr',
  })

  const themeSelect = createEl('select', { id: 'cfg-theme' })
  for (const [val, label] of [
    ['default', 'Default'],
    ['night', 'Night'],
  ]) {
    const opt = createEl('option', { value: val, textContent: label })
    if (val === theme) opt.selected = true
    themeSelect.appendChild(opt)
  }

  const langSelect = createEl('select', { id: 'cfg-lang' })
  for (const [val, label] of [
    ['fr', 'FR'],
    ['en', 'EN'],
    ['es', 'ES'],
  ]) {
    const opt = createEl('option', { value: val, textContent: label })
    if (val === language) opt.selected = true
    langSelect.appendChild(opt)
  }

  const applyBtn = createEl('button', { textContent: 'Appliquer', onClick: applyConfig })

  bar.replaceChildren(
    createEl('label', { textContent: 'Base URL' }),
    baseUrlInput,
    createEl('label', { textContent: 'Theme' }),
    themeSelect,
    createEl('label', { textContent: 'Langue' }),
    langSelect,
    applyBtn
  )
}

function applyConfig() {
  const rawBaseUrl = document.getElementById('cfg-baseurl').value
  const safeBaseUrl = sanitizeUrl(rawBaseUrl) || DEFAULT_BASE_URL
  const theme = document.getElementById('cfg-theme').value
  const language = document.getElementById('cfg-lang').value

  setBaseUrl(safeBaseUrl)
  localStorage.setItem('integrabook-theme', theme)
  localStorage.setItem('integrabook-language', language)

  const url = new URL(window.location.href)
  url.searchParams.set('baseUrl', safeBaseUrl)
  url.searchParams.set('theme', theme)
  url.searchParams.set('language', language)
  window.location.href = url.toString()
}

function buildSearch(extra) {
  const theme = getTheme()
  const language = getLanguage()
  const params = new URLSearchParams()
  if (theme !== 'default') params.set('theme', theme)
  if (language !== 'fr') params.set('language', language)
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      params.set(k, v)
    }
  }
  const str = params.toString()
  return str ? `?${str}` : ''
}

function renderCodeBlock(containerId, code) {
  const container = document.getElementById(containerId)
  if (!container) return
  const btn = createEl('button', {
    class: 'copy-btn',
    textContent: 'Copier',
    onClick: function () {
      copyCode(this)
    },
  })
  const pre = createEl('pre', { textContent: code.trim() })
  container.replaceChildren(btn, pre)
}

function copyCode(btn) {
  const pre = btn.parentElement.querySelector('pre')
  if (!pre) return
  navigator.clipboard
    .writeText(pre.textContent)
    .then(() => {
      btn.textContent = 'OK'
      setTimeout(() => {
        btn.textContent = 'Copier'
      }, 1500)
    })
    .catch(() => {
      btn.textContent = 'Erreur'
      setTimeout(() => {
        btn.textContent = 'Copier'
      }, 1500)
    })
}

function injectIframeScript(containerId, dataType, extraSearch) {
  const container = document.getElementById(containerId)
  if (!container) return

  const baseUrl = getBaseUrl()
  const search = buildSearch(extraSearch)

  const script = document.createElement('script')
  script.setAttribute('data-name', 'impact-co2')
  script.setAttribute('src', `${baseUrl}/iframe.js`)
  script.setAttribute('data-type', dataType)
  script.setAttribute('data-search', search)

  container.appendChild(script)
}

function injectDirectIframe(containerId, path, extraSearch) {
  const container = document.getElementById(containerId)
  if (!container) return

  const baseUrl = getBaseUrl()
  const search = buildSearch(extraSearch)
  const src = `${baseUrl}/iframes/${path}${search}${search ? '&' : '?'}source=${encodeURIComponent(window.location.href)}`

  const iframe = createEl('iframe', {
    src: src,
    style: 'border: none; width: 100%; min-height: 500px; display: block;',
    allowfullscreen: 'true',
  })

  container.appendChild(iframe)
}

async function fetchApi(endpoint, resultContainerId) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/v1/${endpoint}`
  const container = document.getElementById(resultContainerId)
  if (!container) return

  container.textContent = `GET ${url}\n\nChargement...`

  try {
    const res = await fetch(url)
    const contentType = res.headers.get('content-type') || ''
    let body
    if (contentType.includes('json')) {
      body = JSON.stringify(await res.json(), null, 2)
    } else {
      body = await res.text()
    }
    container.textContent = `GET ${url}\nStatus: ${res.status} ${res.statusText}\nCORS: ${res.headers.get('access-control-allow-origin') || 'non renseigné'}\n\n${body}`
  } catch (err) {
    container.textContent = `GET ${url}\n\nErreur: ${err.message}`
  }
}

function buildParamsEditor(containerId, params, onApply) {
  const container = document.getElementById(containerId)
  if (!container) return

  container.classList.add('params-editor')

  const title = createEl('div', { class: 'params-title', textContent: 'Paramètres du module' })
  container.appendChild(title)

  params.forEach((param) => {
    const row = createEl('div', { class: 'param-row' })
    const label = createEl('label', { textContent: param.name, for: `param-${param.name}` })
    row.appendChild(label)

    if (param.type === 'checkbox') {
      const input = createEl('input', {
        id: `param-${param.name}`,
        type: 'checkbox',
      })
      if (param.default) input.checked = true
      row.appendChild(input)
    } else if (param.type === 'select') {
      const select = createEl('select', { id: `param-${param.name}` })
      if (param.allowEmpty !== false) {
        select.appendChild(createEl('option', { value: '', textContent: '(défaut)' }))
      }
      param.options.forEach((opt) => {
        const option = createEl('option', { value: opt.value || opt, textContent: opt.label || opt })
        if ((opt.value || opt) === param.default) option.selected = true
        select.appendChild(option)
      })
      row.appendChild(select)
    } else {
      const input = createEl('input', {
        id: `param-${param.name}`,
        type: param.type || 'text',
        value: param.default || '',
        placeholder: param.placeholder || '',
      })
      row.appendChild(input)
    }

    container.appendChild(row)

    if (param.hint) {
      container.appendChild(createEl('div', { class: 'param-hint', textContent: param.hint }))
    }
  })

  const actions = createEl('div', { class: 'params-actions' })
  actions.appendChild(
    createEl('button', {
      textContent: 'Appliquer',
      onClick: () => {
        const values = {}
        params.forEach((p) => {
          const el = document.getElementById(`param-${p.name}`)
          if (p.type === 'checkbox') {
            values[p.name] = el.checked
          } else {
            values[p.name] = el.value
          }
        })
        onApply(values)
      },
    })
  )
  actions.appendChild(
    createEl('button', {
      class: 'secondary',
      textContent: 'Reset',
      onClick: () => {
        params.forEach((p) => {
          const el = document.getElementById(`param-${p.name}`)
          if (p.type === 'checkbox') {
            el.checked = !!p.default
          } else if (p.type === 'select') {
            el.value = p.default || ''
          } else {
            el.value = p.default || ''
          }
        })
      },
    })
  )
  container.appendChild(actions)
}

function getExtraSearchFromParams(values) {
  const extra = {}
  for (const [k, v] of Object.entries(values)) {
    if (v === '' || v === false) continue
    if (v === true) {
      extra[k] = 'true'
    } else {
      extra[k] = v
    }
  }
  return extra
}

function reRenderIframeScript(containerId, dataType, extraSearch) {
  const container = document.getElementById(containerId)
  if (!container) {
    return
  }
  while (container.firstChild) container.removeChild(container.firstChild)
  injectIframeScript(containerId, dataType, extraSearch)
}

function reRenderDirectIframe(containerId, path, extraSearch) {
  const container = document.getElementById(containerId)
  if (!container) return
  while (container.firstChild) container.removeChild(container.firstChild)
  injectDirectIframe(containerId, path, extraSearch)
}

function propagateQueryParams() {
  const params = new URLSearchParams(window.location.search)
  const baseUrl = params.get('baseUrl')
  const theme = params.get('theme')
  const language = params.get('language')

  if (!baseUrl && !theme && !language) return

  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href')
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return

    const url = new URL(href, window.location.href)
    if (baseUrl) url.searchParams.set('baseUrl', baseUrl)
    if (theme) url.searchParams.set('theme', theme)
    if (language) url.searchParams.set('language', language)

    a.setAttribute('href', url.pathname + url.search + url.hash)
  })
}

function applyThemeToRenderZones() {
  const theme = getTheme()
  document.querySelectorAll('.render-zone').forEach((zone) => {
    if (zone.dataset.forceTheme) return
    zone.classList.toggle('night', theme === 'night')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initConfigBar()
  propagateQueryParams()
  applyThemeToRenderZones()
})
