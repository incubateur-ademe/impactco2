export const track = (category: string, action: string, name: string) => {
  if (window && window.please) {
    window.please.track(['trackEvent', category, action, name])
  }
}
