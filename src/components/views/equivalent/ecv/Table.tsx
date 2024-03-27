import classNames from 'classnames'
import React, { Fragment, useState } from 'react'
import EcvModal from 'components/modals/EcvModal'
import Information from 'components/osezchanger/components/Information'
import DetailValue from './DetailValue'
import Label from './Label'
import styles from './Table.module.css'

type Values = {
  label: string
  value: number
  values: { id: number | string; value: number }[]
}

const Table = ({
  values,
  small,
  unit,
  type,
}: {
  values: (Values | null)[]
  unit: string
  small?: boolean
  type: number
}) => {
  const [ecvModal, setEcvModal] = useState<number>(0)
  const valuesToDisplay = values.filter((value) => value) as Values[]
  const withPercent = valuesToDisplay.length === 1
  return (
    <>
      {!!ecvModal && <EcvModal value={ecvModal} setOpen={() => setEcvModal(0)} />}
      <table className={classNames(styles.table, { [styles.small]: small })}>
        {valuesToDisplay.map((value) => (
          <Fragment key={value.label}>
            <thead>
              <tr>
                <th colSpan={withPercent ? 2 : 1}>
                  <div className={styles.title}>
                    {value.label} {withPercent && <Information onClick={() => setEcvModal(type)} />}
                  </div>
                </th>
                <th className={styles.value}>
                  <DetailValue unit={unit} value={value.value} />
                </th>
              </tr>
            </thead>
            <tbody>
              {value.values.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Label id={item.id} />
                  </td>
                  {withPercent && <td className={styles.value}>{((item.value / value.value) * 100).toFixed(2)}%</td>}
                  <td className={styles.value}>
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
                <div className={styles.title}>
                  Total
                  <Information onClick={() => setEcvModal(type)} />
                </div>
              </th>
              <th className={styles.value}>
                <DetailValue unit={unit} value={valuesToDisplay.reduce((acc, current) => acc + current.value, 0)} />
              </th>
            </tr>
          </thead>
        )}
      </table>
    </>
  )
}

export default Table
