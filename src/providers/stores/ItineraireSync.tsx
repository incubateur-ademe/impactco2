'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { completeAddress } from 'utils/address'
import { useItineraireStore } from './itineraire'

const ItineraireSync = () => {
  const searchParams = useSearchParams()
  const { setRoundTrip, setStart, setEnd, setCarpool, setDisplayAll } = useItineraireStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('roundTrip')) {
      setRoundTrip(searchParams.get('roundTrip') === 'true')
    }

    completeAddress(setStart, (searchParams.get('start') || searchParams.get('itineraireStart')) as string)
    completeAddress(setEnd, (searchParams.get('end') || searchParams.get('itineraireEnd')) as string)
  }, [searchParams, setRoundTrip, setStart, setEnd, setCarpool, setDisplayAll])

  return null
}

export default ItineraireSync
