import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRFruitsEtLegumesData = () => {
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

const ESFruitsEtLegumesData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          Todos los cálculos proceden de la base de datos <Link href='https://agribalyse.ademe.fr/'>Agrybalise</Link>
        </div>
      </div>
      <div className={styles.title}>Comer fruta de temporada</div>
      <div className={styles.content}>
        <div>
          Esta herramienta muestra qué <b>frutas y hortalizas son de temporada</b> en cada mes del año y su impacto
          cuando se producen en la estación adecuada.
        </div>
        <div>
          Un tomate producido fuera de temporada <b>genera 4 veces más kg de CO₂e</b> que uno producido en la temporada
          adecuada.
        </div>
        <div>
          Sin embargo, cerca del <b>75% de los franceses afirma comer tomates en invierno</b>. Lo mismo ocurre con las
          fresas: 1 kg consumido en invierno genera un 40% más de emisiones de gases de efecto invernadero que la misma
          cantidad producida en temporada. Las frutas y hortalizas de temporada no sólo son buenas para el clima y
          nuestra salud, sino que además saben mejor.
        </div>
      </div>
    </>
  )
}

const ENFruitsEtLegumesData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          All calculations come from the <Link href='https://agribalyse.ademe.fr/'>Agrybalise</Link> database
        </div>
      </div>
      <div className={styles.title}>Eat seasonal fruits</div>
      <div className={styles.content}>
        <div>
          This tool allows you to visualize <b>seasonal fruits and vegetables</b> for each month of the year and their
          impact when produced in the right season.
        </div>
        <div>
          A tomato produced out of season generates <b>4 times more kg CO₂e</b> than a tomato produced in the right
          season.
        </div>
        <div>
          However, around <b>75% of French people say they eat tomatoes in winter</b>. Likewise for strawberries, 1 kg
          consumed in winter generates 40% more greenhouse gas emissions than the same quantity produced in season.
          Beneficial for the climate and health, seasonal fruits and vegetables also taste better.
        </div>
      </div>
    </>
  )
}

const FruitsEtLegumesData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENFruitsEtLegumesData />
  }
  if (language === 'es') {
    return <ESFruitsEtLegumesData />
  }

  return <FRFruitsEtLegumesData />
}
export default FruitsEtLegumesData
