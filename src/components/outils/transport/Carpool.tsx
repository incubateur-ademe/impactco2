import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import PlusMinus from '../plusMinus/PlusMinus'
import styles from '../CategorySimulator.module.css'

const Carpool = ({
  carpoolValue,
  type,
  equivalent,
}: {
  carpoolValue?: number
  type: TransportSimulateur
  equivalent: ComputedEquivalent
}) => {
  const t = useTranslations('category-simulator')
  const tVoiture = useTranslations('voiture')
  const params = useParamContext()
  const slug = carpoolValue ? `covoiturage${equivalent.slug.replace('voiture', '')}` : equivalent.slug
  const carInfos = params.transport.carInfos[slug]
  return (
    <div className={styles.carpool}>
      <div className={styles.triangle} />
      {carInfos && (
        <>
          <div className={styles.transport}>
            <HiddenLabel htmlFor={`car-size-${slug}`}>{t('transportSizeSelect')}</HiddenLabel>
            <Select
              id={`car-size-${slug}`}
              className={styles.select}
              value={carInfos.size}
              onChange={(event) => {
                track(
                  `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
                  `Car size ${slug}`,
                  event.target.value
                )
                params.transport.setCarInfos({
                  ...params.transport.carInfos,
                  [slug]: { ...carInfos, size: event.target.value },
                })
              }}>
              <option value='citadine'>{tVoiture('citadine')}</option>
              <option value='compact'>{tVoiture('compact')}</option>
              <option value='berline'>{tVoiture('berline')}</option>
              <option value='grandeberline'>{tVoiture('grandeberline')}</option>
            </Select>
          </div>
          {!slug.endsWith('electrique') && (
            <div className={styles.transport}>
              <HiddenLabel htmlFor={`car-engine-${slug}`}>{t('transportEngineSelect')}</HiddenLabel>
              <Select
                id={`car-engine-${slug}`}
                className={styles.select}
                value={carInfos.engine}
                onChange={(event) => {
                  track(
                    `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
                    `Car engine ${slug}`,
                    event.target.value
                  )
                  params.transport.setCarInfos({
                    ...params.transport.carInfos,
                    [slug]: { ...carInfos, engine: event.target.value },
                  })
                }}>
                {slug.endsWith('thermique') && (
                  <>
                    <option value='diesel'>{tVoiture('diesel')}</option>
                    <option value='essence'>{tVoiture('essence')}</option>
                  </>
                )}
                {slug.endsWith('hybride') && (
                  <>
                    <option value='hybride'>{tVoiture('hybride')}</option>
                    <option value='hybriderechargeable'>{tVoiture('hybriderechargeable')}</option>
                  </>
                )}
              </Select>
            </div>
          )}
        </>
      )}
      {carpoolValue && (
        <PlusMinus
          value={carpoolValue + 1}
          setValue={(value) => {
            track(
              `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
              `Covoiturage ${equivalent.slug}`,
              value.toString()
            )
            params[type].setCarpool({ ...params[type].carpool, [equivalent.slug]: value - 1 })
          }}
          min={2}
          max={5}
          label={formatName(t('person'), carpoolValue + 1)}
          smallLabel={formatName(t('personShort'), carpoolValue + 1)}
          hiddenLabel={`${t('in')} ${getNameWithoutSuffix(params.language, equivalent)}`}
        />
      )}
    </div>
  )
}

export default Carpool
