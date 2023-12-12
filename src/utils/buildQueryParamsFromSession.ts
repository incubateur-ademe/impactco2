export default function buildQueryParamsFromSession(originalHref: string, window: Window): string {
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
      'emailTaille',
      'emailReseau',
      'emailAppareil',
    ]
    queryParams.forEach(function (param) {
      queryParamsStr += `${param}=${window.sessionStorage[param]}&`
    })
    return encodeURI(`${originalHref}${queryParamsStr.slice(0, -1)}`) // slice: remove last '&'
  } else {
    return originalHref
  }
}
