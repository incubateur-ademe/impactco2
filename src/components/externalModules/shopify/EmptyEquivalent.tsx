import Logo from '../Logo'
import styles from './Equivalent.module.css'

const EmptyEquivalent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.all}>
        <Logo value={1000} />
        <div className={styles.leftContent}>
          <div className={styles.empty}>Aucun équivalent disponible pour 0 g CO₂e</div>
        </div>
      </div>
    </div>
  )
}

export default EmptyEquivalent
