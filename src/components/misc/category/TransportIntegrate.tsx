import React, { useMemo, useState } from 'react'
import { TransportSimulateur } from 'types/transport'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { Separator } from './TransportIntegrate.styles'

const DISTANCE = 'distance'
const ITINERAIRE = 'itineraire'
const TELETRAVAIL = 'teletravail'

const TransportIntegrate = ({ tracking, type }: { tracking: string; type: TransportSimulateur }) => {
  const { distance, itineraire, teletravail, theme, setTheme } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
    teletravail: true,
  })

  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE, TELETRAVAIL])

  const url = useMemo(() => {
    let result = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js"`
    if (type === 'distance') {
      result += ` data-type="transport"`
    } else if (type === 'itineraire') {
      result += ` data-type="transport/itineraire"`
    } else {
      result += ` data-type="transport/teletravail"`
    }

    result += ` data-search="?theme=${theme}`

    result += `&tabs=${tabs.join(',')}`

    if (tabs.includes(DISTANCE) && visibility.km) {
      result += `&km=${distance.km}`
    }

    if (tabs.includes(ITINERAIRE) && visibility.itineraire) {
      if (itineraire.start) {
        result += `&itineraireStart=${itineraire.start.address}`
      }
      if (itineraire.end) {
        result += `&itineraireEnd=${itineraire.end.address}`
      }
    }

    if (tabs.includes(TELETRAVAIL) && visibility.teletravail) {
      if (teletravail.start) {
        result += `&teletravailStart=${teletravail.start}`
      }
      if (teletravail.end) {
        result += `&teletravailEnd=${teletravail.end}`
      }
    }

    return result + '"></script>'
  }, [type, visibility, tabs, distance.km, theme, itineraire.start, itineraire.end, teletravail.start, teletravail.end])

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
      <Checkbox
        required
        id='tabs'
        label='Onglet à intégrer'
        hint="Sélectionnez les onglets que vous souhaitez intégrer à l'iframe">
        <CheckboxInput
          color='secondary'
          checked={tabs.includes(DISTANCE)}
          setChecked={(checked) => {
            if (checked) {
              setTabs([...tabs, DISTANCE])
            } else {
              setTabs(tabs.filter((tab) => tab !== DISTANCE))
            }
          }}
          label='Distance'
          data-testid='transport-integration-distance-checkbox'
        />
        <CheckboxInput
          color='secondary'
          checked={tabs.includes(ITINERAIRE)}
          setChecked={(checked) => {
            if (checked) {
              setTabs([...tabs, ITINERAIRE])
            } else {
              setTabs(tabs.filter((tab) => tab !== ITINERAIRE))
            }
          }}
          label='Itinéraire'
        />
        <CheckboxInput
          color='secondary'
          checked={tabs.includes(TELETRAVAIL)}
          setChecked={(checked) => {
            if (checked) {
              setTabs([...tabs, TELETRAVAIL])
            } else {
              setTabs(tabs.filter((tab) => tab !== TELETRAVAIL))
            }
          }}
          label='Télétravail'
        />
      </Checkbox>
      <Separator />
      {tabs.includes(DISTANCE) && (
        <>
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
          <Separator />
        </>
      )}
      {tabs.includes(ITINERAIRE) && (
        <>
          <CustomParams
            integration
            title='Itinéraire'
            tracking={tracking}
            trackingType='Intégrer'
            params={{ itineraire: params.itineraire }}
            visibility={visibility}
            setVisibility={setVisibility}
          />
          <Separator />
        </>
      )}
      {tabs.includes(TELETRAVAIL) && (
        <>
          <CustomParams
            integration
            title='Télétravail'
            tracking={tracking}
            trackingType='Intégrer'
            params={{ teletravail: params.teletravail }}
            visibility={visibility}
            setVisibility={setVisibility}
          />
          <Separator />
        </>
      )}
      <CustomParam
        tracking={tracking}
        slug='theme'
        integration
        param={{ value: theme, setter: setTheme } as CustomParamValue}
        visible
      />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  )
}

export default TransportIntegrate
