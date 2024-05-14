import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FruitsEtLegumesData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          L'ensemble des calculs sont issus de la base de données{' '}
          <Link href='https://agribalyse.ademe.fr/'>Agrybalise</Link>
        </div>
      </div>
      <div className={styles.title}>Consommer des fruits de saison</div>
      <div className={styles.content}>
        <div>
          Cet outil permet de visualiser <b>les fruits et légumes de saison</b> pour chaque mois de l’année et leur
          impact lorsqu’ils sont produits à la bonne saison.
        </div>
        <div>
          Une tomate produite hors saison <b>génère 4 fois plus de kg CO₂e</b> qu’une tomate produite à la bonne saison.
        </div>
        <div>
          Or, nous sommes environ <b>75% de Français à déclarer consommer des tomates en hiver</b>. De même pour les
          fraises, 1 kg consommé en hiver génère 40% d'émissions de gaz à effet de serre de plus que la même quantité
          produite en saison. Bénéfiques pour le climat et la santé, les fruits et légumes de saison sont également
          meilleurs au goût.
        </div>
      </div>
    </>
  )
}

export default FruitsEtLegumesData
