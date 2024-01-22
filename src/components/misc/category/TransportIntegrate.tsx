import React, { useEffect, useMemo, useState } from 'react'
import { TransportSimulateur } from 'types/transport'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import CustomParam, { CustomParamType } from './CustomParam'
import CustomParams from './CustomParams'
import { Separator } from './TransportIntegrate.styles'

const DISTANCE = 'distance'
const ITINERAIRE = 'itineraire'
const TELETRAVAIL = 'teletravail'

const TransportIntegrate = ({ tracking, type }: { tracking: string; type: TransportSimulateur }) => {
  const { distance, itineraire, teletravail } = useParamContext()

  const [customValues, setCustomValues] = useState<Record<string, CustomParamType>>({
    km: { value: distance.km.toString(), visible: true },
    itineraire: {
      value: {
        start: (type === 'itineraire' && itineraire.start && itineraire.start.address) || '',
        end: (type === 'itineraire' && itineraire.end && itineraire.end.address) || '',
      },
      visible: true,
    },
    teletravail: {
      value: {
        start: (type === 'teletravail' && teletravail.start && teletravail.start.address) || '',
        end: (type === 'teletravail' && teletravail.end && teletravail.end.address) || '',
      },
      visible: true,
    },
  })

  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE, TELETRAVAIL])
  useEffect(() => {
    setCustomValues({ ...customValues, km: { value: distance.km.toString(), visible: customValues.km.visible } })
  }, [distance.km, setCustomValues])

  useEffect(() => {
    setCustomValues({
      ...customValues,
      teletravail: {
        value: { start: teletravail.start?.address || '', end: teletravail.end?.address || '' },
        visible: customValues.itineraire.visible,
      },
    })
  }, [teletravail, type, setCustomValues])

  useEffect(() => {
    setCustomValues({
      ...customValues,
      itineraire: {
        value: { start: itineraire.start?.address || '', end: itineraire.end?.address || '' },
        visible: customValues.itineraire.visible,
      },
    })
  }, [itineraire, type, setCustomValues])

  const url = useMemo(() => {
    let result = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js"`
    if (type === 'distance') {
      result += ` data-type="transport"`
    } else if (type === 'itineraire') {
      result += ` data-type="transport/itineraire"`
    } else {
      result += ` data-type="transport/teletravail"`
    }

    result += ` data-search="?theme=${customValues.theme ? customValues.theme.value : 'default'}`

    result += `&tabs=${tabs.join(',')}`

    if (tabs.includes(DISTANCE) && customValues.km.visible && customValues.km.value) {
      result += `&km=${customValues.km.value}`
    }

    if (
      tabs.includes(ITINERAIRE) &&
      customValues.itineraire.visible &&
      typeof customValues.itineraire.value !== 'string' &&
      'start' in customValues.itineraire.value
    ) {
      if (customValues.itineraire.value.start) {
        result += `&itineraireStart=${customValues.itineraire.value.start}`
      }
      if (customValues.itineraire.value.end) {
        result += `&itineraireEnd=${customValues.itineraire.value.end}`
      }
    }

    if (
      tabs.includes(TELETRAVAIL) &&
      customValues.teletravail.visible &&
      typeof customValues.teletravail.value !== 'string' &&
      'start' in customValues.teletravail.value
    ) {
      if (customValues.teletravail.value.start) {
        result += `&teletravailStart=${customValues.teletravail.value.start}`
      }
      if (customValues.teletravail.value.end) {
        result += `&teletravailEnd=${customValues.teletravail.value.end}`
      }
    }
    return result + '"></script>'
  }, [type, customValues, tabs])

  return (
    <>
      <Checkbox
        required
        id='tabs'
        label='Onglet à intégrer'
        hint="Sélectionnez les onglets que vous souhaitez intégrer à l'iframe">
        <CheckboxInput
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
            customValues={{ km: customValues.km }}
            setCustomValues={(values) => setCustomValues({ ...customValues, ...values })}
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
            customValues={{ itineraire: customValues.itineraire }}
            setCustomValues={(values) => setCustomValues({ ...customValues, ...values })}
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
            customValues={{ teletravail: customValues.teletravail }}
            setCustomValues={(values) => setCustomValues({ ...customValues, ...values })}
          />
          <Separator />
        </>
      )}
      <CustomParam
        slug='theme'
        integration
        value={customValues.theme ? customValues.theme.value : 'default'}
        visible
        setValue={(newValue) => {
          track(tracking, `Custom value theme`, JSON.stringify(newValue))
          setCustomValues({
            ...customValues,
            theme: {
              value: newValue,
              visible: true,
            },
          })
        }}
      />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  )
}

export default TransportIntegrate
