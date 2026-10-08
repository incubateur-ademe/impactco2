import Link from '../base/buttons/Link'
import EmojiComputer from './EmojiComputer'
import styles from './EmptyEvent.module.css'

const EmptyEvent = () => {
  return (
    <>
      <h2 className={styles.title}>
        <EmojiComputer /> À venir...
      </h2>
      <p className={styles.description}>
        Le contenu de ce temps fort est en cours de rédaction. Merci pour votre intérêt !
      </p>
      <br />
      <Link href='/outils/kit-rse/calendrier'>Revenir au calendrier</Link>
    </>
  )
}

export default EmptyEvent
