import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { getName } from 'src/utils/Equivalent/equivalent'
import EquivalentIcon from 'src/components/base/EquivalentIcon'
import Button from 'src/components/base/buttons/Button'
import CloseIcon from 'src/components/base/icons/close'
import FullArrowRightIcon from 'src/components/base/icons/full-arrow-right'
import styles from './EtiquetteEquivalent.module.css'

const EtiquetteEquivalent = ({
  equivalents,
  setEquivalents,
}: {
  equivalents: string[]
  setEquivalents: (equivalents: string[]) => void
}) => {
  const { setOverscreen, language } = useParamContext()
  const t = useTranslations('overscreen.etiquette')

  const fullEquivalents = useMemo(
    () =>
      equivalents
        .map((equivalent) => computedEquivalents.find((e) => e.slug === equivalent) || null)
        .filter((equivalent) => equivalent !== null),
    [equivalents]
  )
  return (
    <>
      <p className={styles.label}>
        {t('equivalents')}
        <span className={classNames(styles.hint, 'text-sm')}>{t('hint')}</span>
      </p>
      <div className={styles.button}>
        <Button onClick={() => setOverscreen('etiquette', 'equivalents')}>
          {t('choose')}
          <FullArrowRightIcon />
        </Button>
        <p>{equivalents.length > 0 ? t.rich('count', { count: equivalents.length }) : t('empty')}</p>
      </div>
      <ul className={styles.list}>
        {fullEquivalents.map((equivalent) => {
          return (
            <li key={equivalent?.slug}>
              <button
                className={styles.equivalent}
                onClick={() => setEquivalents(equivalents.filter((e) => e !== equivalent?.slug))}>
                <EquivalentIcon equivalent={equivalent} />
                {getName(language, equivalent, false, 1, false, true)}
                <CloseIcon />
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default EtiquetteEquivalent
