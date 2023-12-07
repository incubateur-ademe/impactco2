export const track = (category: string, action: string, name: string) => {
  if (window && window.please) {
    if (window.location.host !== 'impactco2.fr') {
      window.please.track(['trackEvent', `${category}_${window.location.host}`, action, name])
    } else {
      window.please.track(['trackEvent', category, action, name])
    }
  }
}
