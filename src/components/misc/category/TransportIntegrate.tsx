import React, { useContext, useEffect, useMemo, useState } from 'react'
import ClipboardBox from 'components/base/ClipboardBox'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import TransportContext from 'components/transport/TransportProvider'
import { CustomParamType } from './CustomParam'
import CustomParams from './CustomParams'
import { Separator } from './TransportIntegrate.styles'

const DISTANCE = 'distance'
const ITINERAIRE = 'itineraire'
const TELETRAVAIL = 'teletravail'

const TransportIntegrate = ({
  tracking,
  type,
}: {
  tracking: string
  type: 'distance' | 'itineraire' | 'teletravail'
}) => {
  const { km, start, end } = useContext<{
    km: number
    start: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    end: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  const [customValues, setCustomValues] = useState<Record<string, CustomParamType>>({
    km: { value: km.toString(), visible: true },
    itineraire: {
      value: {
        start: (type === 'itineraire' && start.address) || '',
        end: (type === 'itineraire' && end.address) || '',
      },
      visible: true,
    },
    teletravail: {
      value: {
        start: (type === 'teletravail' && start.address) || '',
        end: (type === 'teletravail' && end.address) || '',
      },
      visible: true,
    },
  })

  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE, TELETRAVAIL])
  useEffect(() => {
    setCustomValues({ ...customValues, km: { value: km.toString(), visible: customValues.km.visible } })
  }, [km, setCustomValues])

  useEffect(() => {
    if (type === 'itineraire') {
      setCustomValues({
        ...customValues,
        itineraire: {
          value: { start: start.address, end: end.address },
          visible: customValues.itineraire.visible,
        },
      })
    } else if (type === 'teletravail') {
      setCustomValues({
        ...customValues,
        teletravail: {
          value: { start: start.address, end: end.address },
          visible: customValues.itineraire.visible,
        },
      })
    }
  }, [start, end, type, setCustomValues])

  const url = useMemo(() => {
    let result = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js"`
    if (type === 'distance') {
      result += ` data-type="transport"`
    } else if (type === 'itineraire') {
      result += ` data-type="transport/itineraire"`
    } else {
      result += ` data-type="transport/teletravail"`
    }

    result += ' data-search="?theme=default'

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
            title='Télétravail'
            tracking={tracking}
            trackingType='Intégrer'
            customValues={{ teletravail: customValues.teletravail }}
            setCustomValues={(values) => setCustomValues({ ...customValues, ...values })}
          />
          <Separator />
        </>
      )}
      <ClipboardBox>{url}</ClipboardBox>
    </>
  )
}

export default TransportIntegrate
