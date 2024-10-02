'use client'

import QRCode from 'qrcode'
import React, { useEffect } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
import Detail from '../detail/Detail'
import EquivalentHeader from '../simulators/EquivalentHeader'
import styles from './Verso.module.css'

const Verso = ({ equivalent, category }: { equivalent: ComputedEquivalent; category: Category }) => {
  useEffect(() => {
    const canvas = document.getElementById('qrcode')
    QRCode.toCanvas(canvas, `https://impactco2.fr/pdf/${category.slug}/${equivalent.slug}/verso?src="qrcode"`)
  }, [category, equivalent])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <EquivalentHeader category={category} equivalent={equivalent} />
        </div>
        <div className={styles.table}>
          <Detail equivalent={equivalent} noPercentage />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.logos}>
          <Marianne />
          <Ademe />
          <Logo />
        </div>
        <canvas id='qrcode' />
      </div>
    </div>
  )
}

export default Verso
