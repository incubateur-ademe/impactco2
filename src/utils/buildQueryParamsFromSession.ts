// See https://stackoverflow.com/a/1830844/2595513
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value))
}

export default function buildQueryParamsFromSession(originalHref: string, window: Window): string {
  const rawHref = originalHref.split('?')[0]
  if (window && window.sessionStorage && window.sessionStorage['emailTaille']) {
    let queryParamsStr = '?'
    const queryParams = [
      'visioAppareil',
      'visioDuree',
      'visioQualite',
      'visioReseau',
      'streamingAppareil',
      'streamingDuree',
      'streamingQualite',
      'streamingReseau',
      'numberEmails',
      'emailTaille',
      'emailReseau',
      'emailAppareil',
    ]
    queryParams.forEach(function (sessionKey) {
      let queryValue = window.sessionStorage[sessionKey]
      if (isNumeric(queryValue)) {
        queryValue = Number(queryValue)
      } else {
        queryValue = queryValue.slice(1, -1)
      }
      queryParamsStr += sessionKey + '=' + queryValue + '&'
    })
    return `${rawHref}${queryParamsStr.slice(0, -1)}` // slice: remove last '&'
  } else {
    return originalHref
  }
}
