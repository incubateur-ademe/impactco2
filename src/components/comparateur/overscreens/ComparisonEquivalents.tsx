import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Equivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import styles from './ComparisonEquivalents.module.css'

const ComparisonEquivalents = ({
  onClose,
  equivalents,
  index,
}: {
  onClose: () => void
  equivalents: Equivalent[]
  index: 0 | 1
}) => {
  const {
    language,
    transport: { comparison, setComparison },
  } = useParamContext()

  return equivalents.map((equivalent) => (
    <button
      className={styles.button}
      key={equivalent.slug}
      onClick={() => {
        if (index === 0) {
          setComparison([equivalent.slug, comparison[1]])
        } else {
          setComparison([comparison[0], equivalent.slug])
        }
        onClose()
      }}>
      <div>{getName(language, equivalent)}</div>
      <EquivalentIcon height={2} equivalent={equivalent} />
    </button>
  ))
}

export default ComparisonEquivalents
