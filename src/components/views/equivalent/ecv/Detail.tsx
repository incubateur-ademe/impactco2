import React from 'react'
import { Equivalent, EquivalentValue } from 'types/equivalent'
import formatName from 'utils/formatName'
import styles from './Detail.module.css'
import Table from './Table'

const ecvs = (type: number, values: EquivalentValue[]) => {
  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 8:
      return [
        {
          label: 'Fabrication',
          value: values.reduce((acc, current) => acc + current.value, 0),
          values,
        },
      ]
    case 5:
    case 6:
    case 7: {
      const fabrication = values.filter((value) => value.id === 5)
      const usage = values.filter((value) => value.id !== 5)
      return [
        {
          label: 'Fabrication',
          value: fabrication.reduce((acc, current) => acc + current.value, 0),
          values: fabrication,
        },
        {
          label: 'Usage',
          value: usage.filter((value) => value.id !== 5).reduce((acc, current) => acc + current.value, 0),
          values: usage,
        },
      ]
    }
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
      return [
        {
          label: 'Total',
          withInformation: 30,
          value: values.reduce((acc, current) => acc + current.value, 0),
          values,
        },
      ]
  }
  return []
}

export default function Detail({ equivalent, years }: { equivalent: Equivalent; years: number }) {
  if (!('ecv' in equivalent) || !equivalent.ecv || equivalent.ecv.length === 0) {
    return null
  }

  const fabricationTotal = equivalent.ecv.reduce((acc, current) => acc + current.value, 0)
  const usage =
    'usage' in equivalent && equivalent.usage ? (years || equivalent.usage.defaultyears) * equivalent.usage.peryear : 0
  const end = 'end' in equivalent && equivalent.end ? equivalent.end : 0

  const total = fabricationTotal + usage + end
  const unit = total > 1 ? 'kg' : 'g'

  const type = equivalent.ecv[0].id
  return (
    <>
      <div className={styles.title}>
        <h3>
          <span>Détail de l&apos;empreinte carbone</span>{' '}
          <span>
            ({equivalent.prefix && <>{formatName(equivalent.prefix)} </>}
            {formatName(equivalent.name, 1)})
          </span>
        </h3>
      </div>
      <Table
        unit={unit}
        type={type}
        values={[
          ...ecvs(type, equivalent.ecv),
          usage > 0
            ? end
              ? {
                  label: 'Usage et fin de vie',
                  value: usage + end,
                  values: [
                    { id: 8, value: usage },
                    { id: 9, value: end },
                  ],
                }
              : { label: 'Usage', value: usage, values: [{ id: 8, value: usage }] }
            : null,
        ]}
      />
    </>
  )
}
