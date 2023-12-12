export default function buildQueryParamsFromSession(originalHref: string, window: Window): string {
  if (window && window.sessionStorage && window.sessionStorage['emailTaille']) {
    let queryParamsStr = '?'
    const queryParams = ['emailTaille', 'emailAppareil']
    queryParams.forEach(function (param) {
      queryParamsStr += `${param}=${window.sessionStorage[param]}&`
    })
    return `${originalHref}${queryParamsStr.slice(0, -1)}` // slice: remove last '&'
  } else {
    return originalHref
  }
}
