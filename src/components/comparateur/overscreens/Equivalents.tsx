import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import useParamContext from 'components/providers/ParamProvider'
import Emoji from 'components/base/Emoji'
import CheckboxInput from 'components/form/CheckboxInput'
import styles from './Equivalents.module.css'

const Equivalents = ({ equivalentsToDisplay }: { equivalentsToDisplay: ComputedEquivalent[] }) => {
  const {
    comparateur: { equivalents, setEquivalents },
  } = useParamContext()

  const selectEquivalent = (checked: boolean, equivalent: ComputedEquivalent) => {
    if (checked) {
      setEquivalents([...equivalents, equivalent.slug])
    } else {
      setEquivalents(equivalents.filter((e) => e !== equivalent.slug))
    }
  }
  return (
    <div className={styles.equivalents}>
      {equivalentsToDisplay.map((equivalent) => (
        <CheckboxInput
          key={equivalent.slug}
          className={styles.equivalent}
          checked={equivalents.includes(equivalent.slug)}
          setChecked={(checked) => selectEquivalent(checked, equivalent)}
          label={
            <div className={styles.equivalentName}>
              {formatName(equivalent.name, 1, true)}{' '}
              {equivalent.subtitle && <>({formatName(equivalent.subtitle, 1, true)})</>}
              <Emoji height='2rem'>{equivalent.emoji}</Emoji>
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Equivalents
