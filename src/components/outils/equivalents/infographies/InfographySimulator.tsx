import React, { Fragment } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import formatName from 'utils/formatName'
import EquivalentIcon from 'components/base/EquivalentIcon'
import EqualIcon from 'components/base/icons/equal'
import styles from './InfographySimulator.module.css'

const InfographySimulator = ({ equivalents }: { equivalents: string[] }) => {
  const values = equivalents
    .map((slug) =>
      categories
        .flatMap((category) => category.equivalents)
        .find((equivalent) => equivalent && equivalent.slug === slug)
    )
    .filter((value) => value) as ComputedEquivalent[]

  const factor = values[0].value
  return (
    <div className={styles.infography} id='infographie'>
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
              <div>
                <span className={styles.equivalentValue}>
                  {number}
                  {value.prefix ? ` ${formatName(value.prefix, number)}` : ' '}
                </span>
                {formatName(value.name, number)}
              </div>
            </div>
            <div className={styles.equal}>
              <EqualIcon />
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default InfographySimulator
