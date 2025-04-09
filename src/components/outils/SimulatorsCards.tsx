import SimulatorsCard from './SimulatorsCard'
import styles from './SimulatorsCards.module.css'

const SimulatorsCards = ({ tracking }: { tracking: string }) => {
  return (
    <ul className={styles.tools}>
      <SimulatorsCard
        tracking={tracking}
        image={`/images/simulateur.svg`}
        title='Le simulateur'
        description='Comparer les scénarios d’achat d’une sélection de 10 objets et ajuster la distance parcourue.'
        linkLabel='Découvrir'
        link='#simulateur'
      />
      <SimulatorsCard
        tracking={tracking}
        image={`/images/etiquettes.svg`}
        title='Les étiquettes'
        description='Proposer une lecture rapide des ordres de grandeur des différents scénarios d’achat.'
        linkLabel='Voir les étiquettes'
        link='#etiquettes'
      />
    </ul>
  )
}

export default SimulatorsCards
