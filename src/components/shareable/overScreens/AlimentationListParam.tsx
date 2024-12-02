import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import { Dispatch } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import { AlimentationCategories, equivalentsByCategory } from 'utils/alimentation'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Button from 'components/base/buttons/Button'
import CheckboxInput from 'components/form/CheckboxInput'
import styles from './AlimentationListParam.module.css'
import listStyles from './TransportListParam.module.css'

const AlimentationListParam = ({
  equivalents,
  setEquivalents,
}: {
  equivalents: string[]
  setEquivalents: Dispatch<SetStateAction<string[]>>
}) => {
  const t = useTranslations('alimentation')
  const { language } = useParamContext()
  return (
    <ul className={styles.categories}>
      {equivalentsByCategory[AlimentationCategories.Group].map((category) => (
        <li key={category.name} className={styles.list}>
          <div className={styles.category}>
            <p className={styles.categoryName}>{t(category.name)}</p>
            <Button
              asLink
              type='button'
              onClick={() =>
                setEquivalents([
                  ...equivalents,
                  ...category.equivalents
                    .map(({ slug }) => slug)
                    .filter((equivalent) => !equivalents.includes(equivalent)),
                ])
              }>
              {t('select')}
            </Button>
          </div>
          <ul className={listStyles.equivalents}>
            {category.equivalents.map((equivalent) => (
              <li key={equivalent.slug} className={listStyles.list}>
                <CheckboxInput
                  id={`alimentation-list-${equivalent.slug}-checkbox`}
                  reversed
                  className={classNames(listStyles.mode, listStyles.active)}
                  labelClassName={listStyles.modeLabel}
                  checked={equivalents.includes(equivalent.slug)}
                  setChecked={(checked) =>
                    setEquivalents(
                      checked
                        ? [...equivalents, equivalent.slug]
                        : equivalents.filter((value) => value !== equivalent.slug)
                    )
                  }
                  label={
                    <span className={listStyles.left}>
                      <EquivalentIcon equivalent={equivalent} height={2.5} />
                      <span className={listStyles.name}>{getNameWithoutSuffix(language, equivalent)}</span>
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default AlimentationListParam
