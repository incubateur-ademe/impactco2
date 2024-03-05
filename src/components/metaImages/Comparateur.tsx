import React from 'react'
import { Logos } from './Logos'
import OneItem from './OneItem'

const Comparateur = ({ value, comparisons }: { value: number; comparisons: string[] }) => {
  const content = () => {
    switch (comparisons.length) {
      case 1:
        return <OneItem value={value} comparisons={comparisons} />
      default:
        return null
    }
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
