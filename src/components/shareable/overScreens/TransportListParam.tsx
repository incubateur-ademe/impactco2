import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import { Dispatch } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Equivalent } from 'types/equivalent'
import { deplacements } from 'data/categories/deplacement'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import CheckboxInput from 'components/form/CheckboxInput'
import Button from 'src/components/base/buttons/Button'
import customStyles from './CustomParam.module.css'
import styles from './TransportListParam.module.css'

const transportCategories = {
  actives: ['marche', 'velo'],
  twoWheels: ['triporteurelectrique', 'veloelectrique', 'scooter', 'scooterelectrique', 'trottinette', 'moto'],
  cars: [
    'voiturethermique',
    'voiturethermique+1',
    'voitureelectrique',
    'voitureelectrique+1',
    'voiturehybride',
    'voiturehybride+1',
    'van',
    'campingcar',
  ],
  common: ['metro', 'tramway', 'busthermique', 'buselectrique', 'autocar', 'rer', 'ter', 'intercites', 'tgv', 'avion'],
}

const transports = deplacements
  .filter((transport) => !transport.ignore)
  .flatMap((transport) =>
    transport.withCarpool
      ? ([{ ...transport, slug: `${transport.slug}+1`, carpool: 1 }, transport] as Equivalent[])
      : [transport]
  )

const TransportListParam = ({ modes, setModes }: { modes: string[]; setModes: Dispatch<SetStateAction<string[]>> }) => {
  const t = useTranslations('overscreen.transport')
  const { language } = useParamContext()
  return (
    <fieldset>
      <div className={styles.legendHeader}>
        <legend className={customStyles.title}>
          {t('modes')}
          <p className={styles.subtitle}>{t('modes-hint')}</p>
        </legend>
        <Button asLink className={styles.unselectButton} onClick={() => setModes([])} type='button'>
          {t('unselectAll')}
        </Button>
      </div>
      <ul>
        {Object.entries(transportCategories).map(([category, categoryTransports]) => (
          <li key={category} className={styles.categoryList}>
            <p className={styles.category}>{t(`category.${category}`)}</p>
            <ul className={styles.modes}>
              {categoryTransports.map((slug) => {
                const transport = transports.find((transport) => transport.slug === slug)
                return transport ? (
                  <li key={transport.slug} className={styles.list}>
                    <CheckboxInput
                      id={`transport-list-${transport.slug}-checkbox`}
                      reversed
                      className={classNames(styles.mode, {
                        [styles.active]: modes.length !== 2 && modes.includes(transport.slug),
                        [styles.disabled]: modes.length === 2 && modes.includes(transport.slug),
                      })}
                      disabled={modes.length === 2 && modes.includes(transport.slug)}
                      labelClassName={styles.modeLabel}
                      checked={modes.includes(transport.slug)}
                      setChecked={(checked) =>
                        setModes(checked ? [...modes, transport.slug] : modes.filter((mode) => mode !== transport.slug))
                      }
                      label={
                        <span className={styles.left}>
                          <EquivalentIcon equivalent={transport} height={2.5} />
                          <span className={styles.name}>{getName(language, transport)}</span>
                        </span>
                      }
                    />
                  </li>
                ) : null
              })}
            </ul>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default TransportListParam
