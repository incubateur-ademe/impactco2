import React, { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import Emoji from 'components/base/Emoji'
import CheckboxInput from 'components/form/CheckboxInput'
import { Icon } from 'components/osezchanger/icons'
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
      label={
        <div className={styles.equivalentLabel}>
          <div className={styles.equivalentName}>
            <div>
              {formatName(equivalent.name, 1, true)}{' '}
              {equivalent.subtitle && <>({formatName(equivalent.subtitle, 1, true)})</>}
            </div>
            {interacted && equivalents.length > 7 && (
              <div className={styles.warning}>
                <Icon iconId='information-fill' />
                <span>
                  <b>8 / 8</b> équivalents déjà sélectionnés
                </span>
              </div>
            )}
          </div>
          <Emoji height='2rem'>{equivalent.emoji}</Emoji>
        </div>
      }
    />
  )
}

export default Checkbox
