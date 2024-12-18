'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { comparisons } from 'components/outils/TransportComparisonSimulator'
import { useTransportStore } from './transport'

const TransportSync = () => {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const { setComparisonMode, setComparison, setModes, setSelected, setTabs, setMode } = useTransportStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }
    if (searchParams.get('modes')) {
      const modes = (searchParams.get('modes') as string).replace(/ /g, '+').split(',')
      if (modes.length > 0) {
        setModes(modes)
        if (!searchParams.get('comparison')) {
          if (modes.length === 2) {
            setComparison(modes)
          } else {
            const firstComparison = comparisons.find(([slug1, slug2]) => modes.includes(slug1) && modes.includes(slug2))
            if (firstComparison) {
              setComparison(firstComparison)
            }
          }
        }
      }
    }

    if (searchParams.get('defaultMode')) {
      setComparisonMode(searchParams.get('defaultMode') === 'list' ? 'list' : 'comparison')
    } else if (searchParams.get('mode')) {
      setComparisonMode(searchParams.get('mode') === 'list' ? 'list' : 'comparison')
    }

    if (searchParams.get('comparison')) {
      const comparison = searchParams.get('comparison')?.replace(/ /g, '+').split(',') as string[]
      setComparison(comparison)
    }

    if (pathName.includes('itineraire')) {
      setSelected('itineraire')
    } else {
      const tabsParam = searchParams.get('tabs')
      const values = tabsParam?.split(',')

      if (values && values.includes('itineraire')) {
        setSelected('itineraire')
      }
    }

    const tabsParam = searchParams.get('tabs')
    if (!tabsParam) {
      setTabs(true)
    } else {
      const values = tabsParam.split(',')
      if (values.length === 0) {
        setTabs(true)
      } else {
        if (values.includes('distance') && (values.includes('itineraire') || pathName.includes('itineraire'))) {
          setTabs(true)
        } else {
          setTabs(false)
        }
      }
    }

    if (searchParams.get('mode')) {
      setMode(searchParams.get('mode') as string)
    }
  }, [searchParams, setComparisonMode, setComparison, setModes, setSelected, pathName, setTabs, setMode])

  return null
}

export default TransportSync
