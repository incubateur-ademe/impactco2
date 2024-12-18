'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { completeAddress } from 'utils/address'
import { useTeletravailStore } from './teletravail'

const TeletravailSync = () => {
  const searchParams = useSearchParams()
  const { setStart, setEnd, setCarpool, setDisplayAll, setTransport, setPresentiel, setHomeOffice, setEquivalents } =
    useTeletravailStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('transport')) {
      setTransport(searchParams.get('transport') as string)
    }
    if (searchParams.get('presentiel')) {
      setPresentiel(Number(searchParams.get('presentiel')))
    }
    if (searchParams.get('homeOffice')) {
      setHomeOffice(Number(searchParams.get('homeOffice')))
    }

    completeAddress(setStart, (searchParams.get('start') || searchParams.get('teletravailStart')) as string)
    completeAddress(setEnd, (searchParams.get('end') || searchParams.get('teletravailEnd')) as string)
  }, [
    searchParams,
    setStart,
    setEnd,
    setCarpool,
    setDisplayAll,
    setTransport,
    setPresentiel,
    setHomeOffice,
    setEquivalents,
  ])

  return null
}

export default TeletravailSync
