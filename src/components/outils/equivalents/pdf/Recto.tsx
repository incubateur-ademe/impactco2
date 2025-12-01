import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
import styles from './Recto.module.css'

const Recto = ({ equivalent }: { equivalent: ComputedEquivalent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <EquivalentIcon equivalent={equivalent} />
        </div>
        <div className={styles.value}>1</div>
        <div className={styles.text}>{getName('fr', equivalent, true, 1)}</div>
      </div>
      <div className={styles.logos}>
        <Marianne />
        <Ademe />
        <Logo />
      </div>
    </div>
  )
}

export default Recto
