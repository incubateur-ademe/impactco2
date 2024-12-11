export const track = (category: string, action: string, name: string, ignoreReferrer?: boolean) => {
  if (window && window.please) {
    let url = ''
    if (window.top === window.self) {
      url = document.location?.origin || document.referrer
    } else {
      url =
        document.location.ancestorOrigins && document.location.ancestorOrigins.length > 0
          ? document.location.ancestorOrigins[0]
          : document.referrer
    }

    if (!ignoreReferrer && url && !url.startsWith('https://impactco2.fr')) {
      window.please.track(['trackEvent', `${category}_${url}`, action, name])
    } else {
      window.please.track(['trackEvent', category, action, name])
    }
  } else {
    console.log('Fake matomo event', category, action, name)
  }
}
