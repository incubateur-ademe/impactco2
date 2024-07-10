import React, { Fragment, useMemo } from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Logos from 'components/base/Logo/Logos'
import EqualIcon from 'components/base/icons/equal'
import styles from './InfographySimulator.module.css'
import Name from './Name'

const InfographySimulator = ({ equivalents }: { equivalents: string[] }) => {
  const values = useMemo(
    () =>
      equivalents
        .map((equivalent) => {
          const [slug, carpool] = equivalent.split('+')
          const result = computedEquivalents.find((equivalent) => equivalent && equivalent.slug === slug)
          if (!result) {
            return null
          }
          return carpool ? { ...result, carpool: carpool, value: result.value / (Number(carpool) + 1) } : result
        })
        .filter((value) => value) as ComputedEquivalent[],
    [equivalents]
  )

  const factor = values[0].value
  return (
    <div className={styles.infography} id='infographie'>
      <div>
        {values.map((value) => {
          const number = Math.round(factor / value.value)
          const height = number > 2000 ? 0.5 : number > 50 ? 1.5 : 3
          const gap = number > 2000 ? 0.125 : number > 50 ? 0.5 : 0.75
          return (
            <Fragment key={value.slug}>
              <div className={styles.equivalent}>
                <div className={styles.icons} style={{ gap: `${gap}rem` }}>
                  {[...Array(number)].map((number) => (
                    <EquivalentIcon key={`${value.slug}-${number}`} equivalent={value} height={height} />
                  ))}
                </div>
                <Name equivalent={value} value={number} />
              </div>
              <div className={styles.equal}>
                <EqualIcon />
              </div>
            </Fragment>
          )
        })}
      </div>
      <div className={styles.disclaimer}>Comparaison basée sur la quantité de kg CO2e émise.</div>
      <div className={styles.logos}>
        <Logos small />
      </div>
    </div>
  )
}

export default InfographySimulator
