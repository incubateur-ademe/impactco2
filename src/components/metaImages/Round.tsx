import React from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import { getComparisonSlug, getName } from 'utils/Equivalent/equivalent'
import values from 'utils/Equivalent/values.json'
import formatNumber from 'utils/formatNumber'
import { buildCurrentUrlFor } from 'utils/urls'
import InfinityIcon from 'components/base/icons/infinity'

const equivalents = values as Record<string, SimpleEquivalent>

const getEquivalent = (comparison?: string) => {
  if (comparison) {
    const [slug, carpool] = comparison.split('+')
    return { equivalent: equivalents[slug], slug, carpool }
  }

  return {}
}

const Round = ({
  value,
  comparison,
  main,
  language,
}: {
  value?: number
  comparison?: string
  main?: boolean
  language: string
}) => {
  const { equivalent, slug, carpool } = getEquivalent(comparison)
  const comparisonValue = value ? value / (equivalent ? equivalent.value / (equivalent.percentage ? 100 : 1) : 1000) : 0
  const equivalentValue = Number.isFinite(comparisonValue) ? (
    formatNumber(comparisonValue * (carpool ? Number(carpool) + 1 : 1)).toLocaleString(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR'
    )
  ) : (
    <InfinityIcon />
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: comparison ? 'white' : '#E0F4F3',
        width: '11rem',
        minHeight: '10rem',
        borderRadius: '0.5rem',
        border: main ? '4px solid #35A099' : '2px solid #AFE0DD',
        boxShadow: '0px 3px 1px 0px rgba(0, 0, 0, 0.04)',
        fontSize: comparison ? '1.75rem' : '2.25rem',
        fontWeight: 800,
        lineHeight: comparison ? '2rem' : '2.5rem',
        color: comparison ? '#3A3236' : '#0C5956',
        padding: '1.5rem 1rem 1rem 1rem',
      }}>
      {equivalent && comparison && (
        <div
          style={{
            display: 'flex',
            marginBottom: '0.25rem',
          }}>
          <img
            style={{ width: '3rem', height: '3rem' }}
            src={buildCurrentUrlFor(`/icons/${carpool ? 'covoiturage' : ''}${getComparisonSlug(slug)}.svg`)}
            alt=''
          />
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
            fontSize: '0.875rem',
            lineHeight: '1.25',
            fontWeight: comparison ? 500 : 700,
            marginTop: '0.25rem',
            textAlign: 'center',
          }}>
          {equivalent && comparison
            ? getName(language, { ...equivalent, slug: comparison }, true, comparisonValue)
            : 'kg CO₂e'}
        </div>
      )}
      {main && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '-16px',
            right: '-16px',
            width: '2.75rem',
            height: '2.75rem',
            border: '4px solid #35A099',
            backgroundColor: '#E0F4F3',
            borderRadius: '50%',
          }}>
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M16.6666 6.66667C16.6666 5.74619 15.9204 5 14.9999 5H4.99992C4.07944 5 3.33325 5.74619 3.33325 6.66667C3.33325 7.58714 4.07944 8.33333 4.99992 8.33333H14.9999C15.9204 8.33333 16.6666 7.58714 16.6666 6.66667Z'
              fill='#13706D'
            />
            <path
              d='M16.6666 13.3333C16.6666 12.4129 15.9204 11.6667 14.9999 11.6667H4.99992C4.07944 11.6667 3.33325 12.4129 3.33325 13.3333C3.33325 14.2538 4.07944 15 4.99992 15H14.9999C15.9204 15 16.6666 14.2538 16.6666 13.3333Z'
              fill='#13706D'
            />
          </svg>{' '}
        </div>
      )}
    </div>
  )
}

export default Round
