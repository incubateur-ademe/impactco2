import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import EquivalentIcon from 'components/base/EquivalentIcon'
import InformationFillIcon from 'components/base/icons/information-fill'
import CheckboxInput from 'components/form/CheckboxInput'
import styles from './Checkbox.module.css'

const Checkbox = ({
  equivalent,
  equivalents,
  setEquivalents,
}: {
  equivalent: ComputedEquivalent
  equivalents: string[]
  setEquivalents: (value: string[]) => void
}) => {
  const tEquivalent = useTranslations('equivalent')
  const t = useTranslations('comparateur.overscreen')
  const [interacted, setInteracted] = useState(false)
  const selectEquivalent = (checked: boolean, equivalent: ComputedEquivalent) => {
    if (checked) {
      if (equivalents.length < 8) {
        setEquivalents([...equivalents, equivalent.slug])
      }
    } else {
      setEquivalents(equivalents.filter((e) => e !== equivalent.slug))
    }
  }

  useEffect(() => {
    setInteracted(false)
  }, [equivalents])

  return (
    <CheckboxInput
      key={equivalent.slug}
      className={interacted && equivalents.length > 7 ? styles.warningEquivalent : styles.equivalent}
      checked={equivalents.includes(equivalent.slug)}
      setChecked={(checked) => {
        if (equivalents.length > 7) {
          setInteracted(true)
        }
        selectEquivalent(checked, equivalent)
      }}
      labelClassName={styles.equivalentLabel}
      label={
        <>
          <div className={styles.equivalentName}>
            <div>
              {formatName(tEquivalent(`name-${equivalent.slug}`), 1, true)}{' '}
              {equivalent.subtitle && <>({formatName(tEquivalent(`subtitle-${equivalent.subtitle}`), 1, true)})</>}
            </div>
            {interacted && equivalents.length > 7 && (
              <div className={styles.warning}>
                <InformationFillIcon />
                <span>
                  <b>8 / 8 {t('max')}</b>
                </span>
              </div>
            )}
          </div>
          <EquivalentIcon height={2} equivalent={equivalent} />
        </>
      }
    />
  )
}

export default Checkbox
