import React from 'react'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import { buildCurrentUrlFor } from 'utils/urls'
import { Logos } from './Logos'

const Equivalent = ({ slug, name, quantity, unit }: { slug: string; name: string; quantity: number; unit: string }) => {
  const { value, unit: quantityUnit } = getNumberPrecision(quantity)

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Marianne',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          padding: '6.25rem',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#110D10',
            fontSize: '3rem',
            marginBottom: '5.75rem',
            fontWeight: 700,
            lineHeight: '3rem',
          }}>
          <span>{name}</span>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#E0F4F3',
              alignItems: 'flex-end',
              color: '#13706D',
              gap: '1rem',
              borderRadius: '0.5rem',
              padding: '0 0.75rem',
              height: '4rem',
              lineHeight: '4rem',
              marginTop: '1rem',
            }}>
            <span>{value}</span>
            <span style={{ fontSize: '2rem', lineHeight: '3rem' }}>{quantityUnit} CO₂e</span>
          </div>
          <span
            style={{
              color: '#5A5057',
              fontSize: '2rem',
              lineHeight: '3rem',
            }}>
            {unit.startsWith('avec') ? '' : 'Par '} {unit}
          </span>
        </div>
        <Logos />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          backgroundColor: '#E0F4F3',
        }}>
        <img
          style={{ width: '27.5rem', height: '27.5rem' }}
          src={buildCurrentUrlFor(`/icons/${slug.endsWith('courrier') ? 'avion' : slug}.svg`)}
          alt=''
        />
      </div>
    </div>
  )
}

export default Equivalent
