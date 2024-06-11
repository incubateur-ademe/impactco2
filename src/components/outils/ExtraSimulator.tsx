import React, { ReactNode, useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenExtraSimulatorValues } from 'components/shareable/overScreens/Values'
import styles from './ExtraSimulator.module.css'

const ExtraSimulator = ({ children, slug, tracking }: { children: ReactNode; slug: string; tracking: string }) => {
  const overScreens = useMemo(() => overScreenExtraSimulatorValues(slug), [slug])

  return (
    <div className={styles.container}>
      <Shareable tracking={tracking} overScreens={overScreens} small>
        {children}
      </Shareable>
    </div>
  )
}

export default ExtraSimulator
