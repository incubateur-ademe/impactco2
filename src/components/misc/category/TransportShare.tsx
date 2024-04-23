import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import { TransportSimulateur } from 'types/transport'
import { buildCurrentUrlFor } from 'utils/urls'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { Meta } from './Share.styles'
import { Separator } from './TransportIntegrate.styles'

const TransportShare = ({ tracking }: { tracking: string }) => {
  const t = useTranslations('overscreen.transport')
  const tTransport = useTranslations('transport.mode-selector')
  const {
    distance,
    itineraire,
    teletravail,
    transport: { selected, setSelected },
  } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
    teletravail: true,
  })

  const url = useMemo(() => {
    let result = buildCurrentUrlFor('transport')
    if (selected === 'distance') {
      result += `?`
    } else if (selected === 'itineraire') {
      result += `/itineraire?`
    } else {
      result += `/teletravail?`
    }

    if (selected === 'distance' && visibility.km) {
      result += `km=${distance.km}`
    } else if (selected === 'itineraire' && visibility.itineraire) {
      if (itineraire.start) {
        result += `itineraireStart=${itineraire.start.address}&`
      }
      if (itineraire.end) {
        result += `itineraireEnd=${itineraire.end.address}`
      }
    } else if (selected === 'teletravail' && visibility.teletravail) {
      if (teletravail.start) {
        result += `teletravailStart=${teletravail.start.address}&`
      }
      if (teletravail.end) {
        result += `teletravailEnd=${teletravail.end.address}`
      }
    }

    return result
  }, [visibility, selected, distance.km, itineraire.start, itineraire.end, teletravail.start, teletravail.end])

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

  return selected ? (
    <>
      <Radio required id='tabs' label={t('onglet')} hint={t('onglet-hint')}>
        <RadioInput
          priority='secondary'
          value='distance'
          selected={selected}
          setSelected={(value) => setSelected(value as TransportSimulateur)}
          label={tTransport('distance')}
        />
        <RadioInput
          priority='secondary'
          value='itineraire'
          selected={selected}
          setSelected={(value) => setSelected(value as TransportSimulateur)}
          label={tTransport('itineraire')}
        />
        <RadioInput
          priority='secondary'
          value='teletravail'
          selected={selected}
          setSelected={(value) => setSelected(value as TransportSimulateur)}
          label={tTransport('teletravail')}
        />
      </Radio>
      <Separator />
      {selected === 'distance' && (
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
      {selected === 'itineraire' && (
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
      {selected === 'teletravail' && (
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
      <Meta>
        <img src='/meta/transport.png' width={728} height={382.2} alt='' />
        <div>
          <p>
            <b>Transport</b>
          </p>
          <p className='text-sm'>
            Quelle est l'empreinte carbone de vos déplacements ? Avec Impact CO₂ vous connaitrez votre impact sur le
            climat
          </p>
        </div>
      </Meta>
    </>
  ) : null
}

export default TransportShare
