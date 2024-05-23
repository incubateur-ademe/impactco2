import Image from 'next/image'
import React, { Fragment } from 'react'
import { Equivalent, EquivalentValue } from 'types/equivalent'
import shareableStyles from 'components/shareable/Shareable.module.css'
import styles from './Detail.module.css'
import DetailValue from './DetailValue'
import Label from './Label'
import Percentage from './Percentage'

type Values = {
  label: string
  icon?: string
  value: number
  values: { id: number | string; value: number }[]
}

const ecvs = (type: number, values: EquivalentValue[]): Values[] => {
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
      if (usage.length) {
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
      } else {
        return [
          {
            label: 'Fabrication',
            value: fabrication.reduce((acc, current) => acc + current.value, 0),
            values: fabrication,
          },
        ]
      }
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
    case 40:
    case 41:
    case 42:
    case 43:
      return [
        {
          label: 'Total',
          value: values.reduce((acc, current) => acc + current.value, 0),
          values,
        },
      ]
  }
  return []
}

export default function Detail({ equivalent }: { equivalent: Equivalent }) {
  if (!('ecv' in equivalent) || !equivalent.ecv || equivalent.ecv.length === 0) {
    return null
  }

  const fabricationTotal = equivalent.ecv.reduce((acc, current) => acc + current.value, 0)
  const usage = 'usage' in equivalent && equivalent.usage ? equivalent.usage.defaultyears * equivalent.usage.peryear : 0
  const end = 'end' in equivalent && equivalent.end ? equivalent.end : 0

  const total = fabricationTotal + usage + end
  const unit = total > 1 ? 'kg' : 'g'

  const type = equivalent.ecv[0].id
  let usageAndEnd = null
  if (usage > 0 && end > 0) {
    usageAndEnd = {
      label: 'Usage et fin de vie',
      icon: 'usage',
      value: usage + end,
      values: [
        { id: 8, value: usage },
        { id: 9, value: end },
      ],
    }
  } else if (usage > 0) {
    usageAndEnd = {
      label: 'Usage',
      icon: 'usage',
      value: usage,
      values: [{ id: 8, value: usage }],
    }
  } else if (end > 0) {
    usageAndEnd = {
      label: 'Fin de vie',
      icon: 'usage',
      value: end,
      values: [{ id: 9, value: end }],
    }
  }
  const values = [...ecvs(type, equivalent.ecv), usageAndEnd].filter((value) => value) as Values[]
  const withPercent = values.length === 1

  const sum = values.reduce((acc, current) => acc + current.value, 0)
  return (
    <>
      <div className={shareableStyles.separator} />
      <table className={styles.table}>
        {values.map((value) => (
          <Fragment key={value.label}>
            <thead>
              <tr>
                <th>
                  <Image
                    className={styles.icon}
                    src={`/images/icn-${value.icon || value.label.toLowerCase()}.svg`}
                    width={20}
                    height={20}
                    alt=''
                  />
                  {value.label}
                </th>
                <td className={styles.percent}>{!withPercent && <Percentage value={(100 * value.value) / sum} />}</td>
                <td>
                  <DetailValue unit={unit} value={value.value} />
                </td>
              </tr>
            </thead>
            <tbody>
              {value.values.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Label id={item.id} />
                  </td>
                  <td className={styles.percent}>
                    {withPercent && <Percentage value={(100 * item.value) / value.value} />}
                  </td>
                  <td>
                    <DetailValue unit={unit} value={item.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Fragment>
        ))}
        {!withPercent && (
          <thead>
            <tr>
              <th>
                <Image className={styles.icon} src='/images/icn-total.svg' width={20} height={20} alt='' />
                Total
              </th>
              <th className={styles.percent} />
              <th>
                <DetailValue unit={unit} value={sum} />
              </th>
            </tr>
          </thead>
        )}
      </table>
    </>
  )
}
