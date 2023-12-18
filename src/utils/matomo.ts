export const track = (category: string, action: string, name: string) => {
  if (window && window.please) {
    if (document.referrer && !document.referrer.startsWith('https://impactco2.fr')) {
      window.please.track(['trackEvent', `${category}_${document.referrer}`, action, name])
    } else {
      window.please.track(['trackEvent', category, action, name])
    }
  } else {
    console.log('Fake matomo event', category, action, name)
  }
}
