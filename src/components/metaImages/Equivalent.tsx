import en from 'src/providers/locales/en.json'
import es from 'src/providers/locales/es.json'
import fr from 'src/providers/locales/fr.json'
import { getComparisonSlug } from 'utils/Equivalent/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import { buildCurrentUrlFor } from 'utils/urls'
import { getUnit } from 'components/base/CO2Quantity'
import { Logos } from './Logos'

const colors: Record<string, { backgroundColor: string; color: string }> = {
  g: { backgroundColor: '#E0F4F3', color: '#13706D' },
  t: { backgroundColor: '#13706D', color: '#FFFFFF' },
  mt: { backgroundColor: '#0C5956', color: '#FFFFFF' },
}

const Equivalent = ({
  language,
  slug,
  name,
  quantity,
  unit,
  carpool,
}: {
  language: string
  slug: string
  name: string
  quantity: number
  unit: string
  carpool?: boolean
}) => {
  const { value, unit: quantityUnit } = getNumberPrecision(quantity)
  const translatedUnit = ((language === 'en' ? en : language === 'es' ? es : fr).unit as Record<string, string>)[unit]
  const [ref] = slug.split('+')
  const color = colors[quantityUnit] || { padding: 0 }

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
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#13706D',
                gap: '1rem',
                height: '4rem',
                lineHeight: '4rem',
                marginTop: '1rem',
              }}>
              <span>{value.toLocaleString(language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-EN')}</span>
              <span
                style={{
                  fontSize: '2rem',
                  lineHeight: '3rem',
                  borderRadius: '0.5rem',
                  padding: '0 0.75rem',
                  ...color,
                }}>
                {getUnit(value, quantityUnit, language)} CO₂e
              </span>
            </div>
          </div>
          {unit && (
            <span
              style={{
                color: '#5A5057',
                fontSize: '2rem',
                lineHeight: '3rem',
              }}>
              {unit.startsWith('avec') ? '' : language === 'en' ? 'Per ' : language === 'es' ? 'Por' : 'Par '}{' '}
              {translatedUnit}
            </span>
          )}
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
          src={buildCurrentUrlFor(`/icons/${carpool ? 'covoiturage' : ''}${getComparisonSlug(ref)}.svg`)}
          alt=''
        />
      </div>
    </div>
  )
}

export default Equivalent
