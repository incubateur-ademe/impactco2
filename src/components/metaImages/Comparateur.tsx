import React from 'react'
import EquivalentItems from './EquivalentItems'
import { Logos } from './Logos'
import OneItem from './OneItem'
import ThreeItems from './ThreeItems'
import TwoItems from './TwoItems'

const Comparateur = ({
  value,
  comparisons,
  equivalent,
}: {
  value: number
  comparisons: string[]
  equivalent: string | null
}) => {
  const content = () => {
    if (equivalent) {
      return <EquivalentItems value={value} comparisons={comparisons} equivalent={equivalent} />
    }

    if (comparisons.length === 1) {
      return <OneItem value={value} comparisons={comparisons} />
    }
    if (comparisons.length === 2) {
      return <TwoItems value={value} comparisons={comparisons} />
    }
    return <ThreeItems value={value} comparisons={comparisons} />
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#E0F4F3',
        padding: '6.25rem',
        fontFamily: 'Marianne',
      }}>
      <Logos />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '4.5rem 0',
          fontSize: '3.125rem',
          lineHeight: '4rem',
          fontWeight: 700,
        }}>
        <span
          style={{
            color: '#110D10',
          }}>
          Visualiser facilement
        </span>
        <span
          style={{
            color: '#26827C',
          }}>
          Une quantité de CO<sub>2</sub>e
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          padding: '0.25rem 2rem',
          backgroundColor: '#26827C',
          color: 'white',
          borderRadius: '0.5rem',
          fontSize: '2rem',
          lineHeight: '2.5rem',
          fontWeight: 400,
          width: '29rem',
          minHeight: '4.5rem',
        }}>
        Découvrir le comparateur
      </div>
      {content()}
    </div>
  )
}

export default Comparateur
