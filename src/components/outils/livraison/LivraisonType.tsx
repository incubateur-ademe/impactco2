import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import { track } from 'utils/matomo'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import PlusMinus from '../plusMinus/PlusMinus'
import styles from '../CategorySimulator.module.css'

const LivraisonType = ({ equivalent }: { equivalent: ComputedEquivalent }) => {
  const { livraison, language } = useParamContext()
  const t = useTranslations('category-simulator')

  return (
    <div className={styles.carpool} data-testid={`livraison-${equivalent.slug}`}>
      <div className={styles.triangle} />
      <div className={styles.transport}>
        <HiddenLabel htmlFor={`text-select-transport-type-${equivalent.slug}`}>{t('transportSelect')}</HiddenLabel>
        <Select
          id={`transport-type-${equivalent.slug}`}
          className={styles.pictoSelect}
          value={livraison.transport[equivalent.slug] || 'voiturethermique'}
          onChange={(event) => {
            track('Livraison', `Transport ${equivalent.slug}`, event.target.value)
            livraison.setTransport({
              ...livraison.transport,
              [equivalent.slug]: event.target.value,
            })
          }}
          style={{
            backgroundImage: `url('/icons/mini-${livraison.transport[equivalent.slug] || 'voiturethermique'}.svg')`,
          }}>
          <option value='voiturethermique'>{t('voiturethermique')}</option>
          <option value='voitureelectrique'>{t('voitureelectrique')}</option>
        </Select>
      </div>
      <PlusMinus
        value={livraison.distance[equivalent.slug] || 1}
        setValue={(value) => {
          track('Livraison', `Distance ${equivalent.slug}`, value.toString())
          livraison.setDistance({ ...livraison.distance, [equivalent.slug]: value })
        }}
        step={0.5}
        max={100}
        label={'km'}
        hiddenLabel={`${t('distance')} ${getNameWithoutSuffix(language, equivalent)}`}
      />
    </div>
  )
}

export default LivraisonType
