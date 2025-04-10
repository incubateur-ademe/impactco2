import SimulatorsCard from './SimulatorsCard'
import styles from './SimulatorsCards.module.css'

const SimulatorsCards = ({
  tracking,
  title,
  subTitle,
  extraTitle,
  extraSubTitle,
  extraLink,
}: {
  tracking: string
  title: string
  subTitle: string
  extraTitle: string
  extraSubTitle: string
  extraLink: string
}) => {
  return (
    <ul className={styles.tools}>
      <SimulatorsCard
        tracking={tracking}
        image={`/images/simulateur.svg`}
        title={title}
        description={subTitle}
        linkLabel='Découvrir'
        link='#simulateur'
      />
      <SimulatorsCard
        tracking={tracking}
        image={`/images/etiquettes.svg`}
        title={extraTitle}
        description={extraSubTitle}
        linkLabel={`Voir ${extraTitle}`}
        link={extraLink}
      />
    </ul>
  )
}

export default SimulatorsCards
