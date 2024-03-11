import React from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import values from 'data/shopify/values.json'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { Icon } from 'components/osezchanger/icons'

const equivalents = values as Record<string, SimpleEquivalent>

const Empty = ({
  top,
  right,
  value,
  comparison,
  main,
}: {
  top: number
  right: number
  value?: number
  comparison?: string
  main?: boolean
}) => {
  const equivalent = comparison ? equivalents[comparison] : undefined
  const comparisonValue = value ? value / (equivalent ? equivalent.value : 1000) : 0
  const equivalentValue = Number.isFinite(comparisonValue) ? (
    formatNumber(comparisonValue).toLocaleString('fr-FR')
  ) : (
    <Icon iconId='infinity' />
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        backgroundColor: comparison ? 'white' : '#C4EAE7',
        width: '15.5rem',
        height: '15.5rem',
        borderRadius: '50%',
        top: `${top - 558}px`,
        right: `${right - 100}px`,
        border: main ? '8px solid #35A099' : value && comparison ? '2px solid #EAE5E8' : '0',
        fontSize: comparison ? '3.125rem' : '4rem',
        fontWeight: 800,
        lineHeight: comparison ? '1.5rem' : '3rem',
        color: comparison ? '#3A3236' : '#0C5956',
      }}>
      {equivalent && (
        <div
          style={{
            display: 'flex',
            fontSize: '7rem',
            marginBottom: '1rem',
          }}>
          {equivalent.emoji}
        </div>
      )}
      {value && (
        <div
          style={{
            display: 'flex',
          }}>
          {equivalentValue}
        </div>
      )}
      {value && (
        <div
          style={{
            display: 'flex',
            fontSize: comparison ? '1.1875rem' : '1.3125rem',
            lineHeight: comparison ? '1.4375rem' : '1.25rem',
            fontWeight: 700,
            marginTop: '0.75rem',
            textAlign: 'center',
          }}>
          {equivalent ? formatName(equivalent.fr, comparisonValue, false) : 'Kg CO₂e'}
        </div>
      )}
      {main && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '3.25rem',
            height: '3.25rem',
            border: '8px solid #35A099',
            backgroundColor: '#C4EAE7',
            borderRadius: '50%',
          }}>
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='14' viewBox='0 0 22 14' fill='none'>
            <path
              d='M21.0205 4.52985H0.980469V0.984009H21.0205V4.52985ZM21.0205 13.016H0.980469V9.47013H21.0205V13.016Z'
              fill='#0C5956'
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Empty
