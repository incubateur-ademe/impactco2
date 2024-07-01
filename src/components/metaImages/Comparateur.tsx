import React from 'react'
import EquivalentItems from './EquivalentItems'
import Items from './Items'
import { Logos } from './Logos'

const Comparateur = ({
  value,
  comparisons,
  equivalent,
  language,
}: {
  value: number
  comparisons: string[]
  equivalent: string | null
  language: string
}) => {
  const content = () => {
    if (equivalent) {
      return <EquivalentItems value={value} comparisons={comparisons} equivalent={equivalent} language={language} />
    }

    return <Items value={value} comparisons={comparisons} language={language} />
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
          position: 'absolute',
          right: '0px',
          bottom: '0px',
        }}>
        <svg xmlns='http://www.w3.org/2000/svg' width='565' height='424' viewBox='0 0 565 424' fill='none'>
          <path
            d='M317.725 0H332.057C507.407 0 649.782 142.375 649.782 317.725V392.845C649.782 437.479 613.558 473.703 568.923 473.703H80.8584C36.2238 473.703 0 437.479 0 392.845V317.725C0 142.375 142.375 0 317.725 0Z'
            fill='#E0F4F3'
          />
        </svg>
      </div>
      {content()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '6.25rem',
        }}>
        {language === 'en' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: '#110D10',
              fontSize: '3.375rem',
              marginBottom: '5.75rem',
              lineHeight: '4rem',
              fontWeight: 700,
            }}>
            <span>Compare & visualize</span>
            <span>
              easily a{' '}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#E0F4F3',
                  borderRadius: '0.5rem',
                  padding: '0 0.25rem',
                  height: '5rem',
                  margin: '1.25rem 0 0 0.5rem',
                  width: '9.5rem',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  color: '#13706D',
                  marginLeft: '-9rem',
                }}>
                CO₂e
              </div>
            </span>
            <span>quantity </span>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: '#110D10',
              fontSize: '3.375rem',
              marginBottom: '5.75rem',
              lineHeight: '4rem',
              fontWeight: 700,
            }}>
            <span>Visualiser facilement</span>
            <span>une quantité</span>
            <span>
              de{' '}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#E0F4F3',
                  borderRadius: '0.5rem',
                  padding: '0 0.25rem',
                  height: '5rem',
                  margin: '1.25rem 0 0 0.5rem',
                  width: '9.5rem',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  color: '#13706D',
                  marginLeft: '-9rem',
                }}>
                CO₂e
              </div>
            </span>
          </div>
        )}
        <Logos />
      </div>
    </div>
  )
}

export default Comparateur
