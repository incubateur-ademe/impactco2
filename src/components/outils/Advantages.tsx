import CheckRoundIcon from 'src/components/base/icons/check-round'
import styles from './Advantages.module.css'

const defaultItems = [
  {
    title: 'Orienter sans culpabiliser',
    description: 'Aider vos utilisateurs à faire des choix éclairés',
  },
  {
    title: 'Données ADEME',
    description: 'Renforcer votre crédibilité avec des données publiques',
  },
  {
    title: 'Gratuit et simple à ajouter',
    description: 'Valoriser votre engagement en toute facilité',
  },
]

const Advantages = () => {
  return (
    <ul className={styles.list}>
      {defaultItems.map((item, index) => (
        <li key={index} className={styles.listItem}>
          <CheckRoundIcon />
          <p className={styles.listItemTitle}>{item.title}</p>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default Advantages
