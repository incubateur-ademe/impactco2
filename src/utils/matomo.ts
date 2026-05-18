export const getSource = () => {
  const url = ''
  if (window) {
    if (window.top === window.self) {
      return document.location?.origin || document.referrer
    } else {
      return document.location.ancestorOrigins && document.location.ancestorOrigins.length > 0
        ? document.location.ancestorOrigins[0]
        : document.referrer
    }
  }
  return url.endsWith('/') ? url.slice(0, url.length - 1) : url
}

export const track = (category: string, action: string, name: string, ignoreReferrer?: boolean) => {
  if (window && window.please) {
    const url = getSource()

    if (!ignoreReferrer && url && !url.startsWith('https://impactco2.fr')) {
      window.please.track(['trackEvent', `${category}_${url}`, action, name])
    } else {
      window.please.track(['trackEvent', category, action, name])
    }
  } else {
    console.log('Fake matomo event', category, action, name)
  }
}
