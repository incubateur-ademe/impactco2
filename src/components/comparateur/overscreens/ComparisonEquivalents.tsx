import { useGlobalStore } from 'src/providers/stores/global'
import { useTransportStore } from 'src/providers/stores/transport'
import { Equivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import { track } from 'utils/matomo'
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
  const { language } = useGlobalStore()

  const { comparison, setComparison, selected } = useTransportStore()

  return equivalents.map((equivalent) => (
    <li key={equivalent.slug}>
      <button
        className={styles.button}
        onClick={() => {
          if (index === 0) {
            setComparison([equivalent.slug, comparison[1]])
          } else {
            setComparison([comparison[0], equivalent.slug])
          }
          track(
            `Transport ${selected === 'distance' ? 'distance' : 'itinéraire'}`,
            'Nouvelle comparaison',
            equivalent.slug
          )
          onClose()
        }}>
        <span>{getName(language, equivalent)}</span>
        <EquivalentIcon height={2} equivalent={equivalent} />
      </button>
    </li>
  ))
}

export default ComparisonEquivalents
