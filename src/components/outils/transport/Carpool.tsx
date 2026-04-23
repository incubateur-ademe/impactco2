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
  const [slug] = equivalent.slug.split('+')
  const carpoolSlug = carpoolValue ? `covoiturage${slug.replace('voiture', '')}` : slug
  const carInfos = params.transport.carInfos[carpoolSlug]

  return (
    <div className={styles.carpool}>
      <div className={styles.triangle} />
      {carInfos && (
        <>
          <div className={styles.transport}>
            <HiddenLabel htmlFor={`text-select-car-size-${carpoolSlug}`}>{t('transportSizeSelect')}</HiddenLabel>
            <Select
              id={`car-size-${carpoolSlug}`}
              className={styles.select}
              value={carInfos.size}
              onChange={(event) => {
                track(
                  `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
                  `Car size ${carpoolSlug}`,
                  event.target.value
                )
                params.transport.setCarInfos({
                  ...params.transport.carInfos,
                  [carpoolSlug]: { ...carInfos, size: event.target.value },
                })
              }}>
              <option value='citadine'>{tVoiture('citadine')}</option>
              <option value='compact'>{tVoiture('compact')}</option>
              <option value='berline'>{tVoiture('berline')}</option>
              <option value='grandeberline'>{tVoiture('grandeberline')}</option>
            </Select>
          </div>
          {!carpoolSlug.endsWith('electrique') && (
            <div className={styles.transport}>
              <HiddenLabel htmlFor={`text-select-car-engine-${carpoolSlug}`}>{t('transportEngineSelect')}</HiddenLabel>
              <Select
                id={`car-engine-${carpoolSlug}`}
                className={styles.select}
                value={carInfos.engine}
                onChange={(event) => {
                  track(
                    `Transport ${type === 'distance' ? 'distance' : 'itinéraire'}`,
                    `Car engine ${carpoolSlug}`,
                    event.target.value
                  )
                  params.transport.setCarInfos({
                    ...params.transport.carInfos,
                    [carpoolSlug]: { ...carInfos, engine: event.target.value },
                  })
                }}>
                {carpoolSlug.endsWith('thermique') && (
                  <>
                    <option value='diesel'>{tVoiture('diesel')}</option>
                    <option value='essence'>{tVoiture('essence')}</option>
                  </>
                )}
                {carpoolSlug.endsWith('hybride') && (
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
              `Covoiturage ${slug}`,
              value.toString()
            )
            params[type].setCarpool({ ...params[type].carpool, [slug]: value - 1 })
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
