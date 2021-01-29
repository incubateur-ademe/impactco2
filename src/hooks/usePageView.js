import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function usePageViews(sitename) {
  let location = useLocation()
  useEffect(() => {
    window._paq.push([
      'setCustomUrl',
      location.pathname + (location.href || ''),
    ])
    window._paq.push(['setDocumentTitle', sitename])

    // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
    window._paq.push(['deleteCustomVariables', 'page'])
    window._paq.push(['setGenerationTimeMs', 0])
    window._paq.push(['trackPageView'])

    // make Matomo aware of newly added content
    var content = document.getElementById('root')
    window._paq.push(['MediaAnalytics::scanForMedia', content])
    window._paq.push(['FormAnalytics::scanForForms', content])
    window._paq.push(['trackContentImpressionsWithinNode', content])
    window._paq.push(['enableLinkTracking'])
  }, [location, sitename])
}
