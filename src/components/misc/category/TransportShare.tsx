import React, { useMemo, useState } from 'react'
import { TransportSimulateur } from 'types/transport'
import { buildCurrentUrlFor } from 'utils/urls'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { Separator } from './TransportIntegrate.styles'

const TransportShare = ({ tracking, type }: { tracking: string; type: TransportSimulateur }) => {
  const { distance, itineraire, teletravail } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
    teletravail: true,
  })

  const [tab, setTab] = useState<string>(type)

  const url = useMemo(() => {
    let result = buildCurrentUrlFor('transport')
    if (tab === 'distance') {
      result += `?`
    } else if (tab === 'itineraire') {
      result += `/itineraire?`
    } else {
      result += `/teletravail?`
    }

    if (tab === 'distance' && visibility.km) {
      result += `km=${distance.km}`
    } else if (tab === 'itineraire' && visibility.itineraire) {
      if (itineraire.start) {
        result += `itineraireStart=${itineraire.start.address}&`
      }
      if (itineraire.end) {
        result += `itineraireEnd=${itineraire.end.address}`
      }
    } else if (tab === 'teletravail' && visibility.teletravail) {
      if (teletravail.start) {
        result += `teletravailStart=${teletravail.start}&`
      }
      if (teletravail.end) {
        result += `teletravailEnd=${teletravail.end}`
      }
    }

    return result
  }, [visibility, tab, distance.km, itineraire.start, itineraire.end, teletravail.start, teletravail.end])

  const params = useMemo(() => {
    return {
      km: { value: distance.km, setter: distance.setKm } as CustomParamValue,
      itineraire: {
        start: { value: itineraire.start?.address || '', setter: itineraire.setStart },
        end: { value: itineraire.end?.address || '', setter: itineraire.setEnd },
      },
      teletravail: {
        start: { value: teletravail.start?.address || '', setter: teletravail.setStart },
        end: { value: teletravail.end?.address || '', setter: teletravail.setEnd },
      },
    }
  }, [distance.km, itineraire.start, itineraire.end, teletravail.start, teletravail.end])

  return (
    <>
      <Radio
        required
        id='tabs'
        label='Onglet à intégrer'
        hint="Sélectionnez les onglets que vous souhaitez intégrer à l'iframe">
        <RadioInput priority='secondary' value='distance' selected={tab} setSelected={setTab} label='Distance' />
        <RadioInput priority='secondary' value='itineraire' selected={tab} setSelected={setTab} label='Itinéraire' />
        <RadioInput priority='secondary' value='teletravail' selected={tab} setSelected={setTab} label='Télétravail' />
      </Radio>
      <Separator />
      {tab === 'distance' && (
        <CustomParams
          integration
          title='Distance'
          tracking={tracking}
          trackingType='Intégrer'
          params={{ km: params.km }}
          visibility={visibility}
          setVisibility={setVisibility}
          withTheme
        />
      )}
      {tab === 'itineraire' && (
        <CustomParams
          integration
          title='Itinéraire'
          tracking={tracking}
          trackingType='Intégrer'
          params={{ itineraire: params.itineraire }}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      {tab === 'teletravail' && (
        <CustomParams
          integration
          title='Télétravail'
          tracking={tracking}
          trackingType='Intégrer'
          params={{ teletravail: params.teletravail }}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <Separator />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  )
}

export default TransportShare
