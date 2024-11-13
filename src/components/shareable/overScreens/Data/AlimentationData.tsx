import Link from 'next/link'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import styles from './Data.module.css'

const FRAlimentationData = () => {
  return (
    <>
      <h2 className={styles.title}>Méthodologie</h2>
      <div className={styles.content}>
        <p>
          L’ensemble des données et des calculs sont issus de la base de données de l’ADEME{' '}
          <Link href='https://agribalyse.ademe.fr/'>Agribalyse</Link>. Pour une majorité des aliments nous avons repris
          les données affichées telles quelles dans la base de données.
        </p>
        <p>
          Toutefois pour certains aliments spécifiques, nous avons réalisé une moyenne de plusieurs facteurs d’émission
          :
        </p>
        <ul>
          <li>
            Boeuf : <b>Impact carbone = 26,20 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission de la côte de boeuf, l’entrecôte, la langue de boeuf, la bavette, l’épaule
            de boeuf, la joue de boeuf
          </li>
          <li>
            Veau : <b>Impact carbone = 16,9 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission de la côte de veau, épaule de veau, escalope de veau, noix de veau, poitrine
            de veau et riz de veau
          </li>
          <li>
            Dorade royale : <b>Impact carbone = 10,8 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission de la dorade royale d’élevage et la dorade royale sauvage
          </li>
          <li>
            Beurre : <b>Impact carbone = 7,76 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission du beurre doux et beurre salé
          </li>
          <li>
            Fromage à pâte dure : <b>Impact carbone = 6,11 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission des différents fromages à pâte dure : Emmental, gruyère, comté, gouda etc.
          </li>
          <li>
            Fromage à pâte molle : <b>Impact carbone = 5,19 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission de différents fromages à pâte molle : Camembert, brie, maroilles, mont-d’or
            etc.
          </li>
          <li>
            Fromage bleu : <b>Impact carbone = 4,13 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission des différents fromages à pâte persillées : Roquefort, bleu d’Auvergne,
            gorgonzola etc.
          </li>
          <li>
            Riz : <b>Impact carbone = 2,75 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission des différents riz : Riz blanc, complet, rouge; sauvage
          </li>
          <li>
            Blé : <b>Impact carbone = 1,21 kg de CO2e / kg</b>
            <br />
            Moyenne des facteurs d’émission des différents blés : Blé dur entier, blé précuit, semoule de blé, blé
            tendre
          </li>
        </ul>
        <p>
          Vous pouvez retrouver chaque facteur d’émission individuel dans la base{' '}
          <Link href='https://agribalyse.ademe.fr/'>Agribalyse</Link>.
        </p>
        <p>
          Concernant l’unité, nous avons choisi d’afficher l’impact carbone <b>pour 1 kg d’aliment</b> afin de pouvoir
          comparer tous les aliments entre eux, bien que cela ne représente pas la réalité des portions achetées ou
          consommées.
        </p>
      </div>
    </>
  )
}

const ESAlimentationData = () => {
  return (
    <>
      <h2 className={styles.title}>Metodología</h2>
      <div className={styles.content}>
        <p>
          Todos los datos y cálculos provienen de la base de datos de ADEME{' '}
          <Link href='https://agribalyse.ademe.fr/'>Agribalyse</Link>. Para la mayoría de los alimentos, hemos utilizado
          los datos tal como se muestran en la base de datos.
        </p>
        <p>Sin embargo, para algunos alimentos específicos, hemos promediado varios factores de emisión:</p>
        <ul>
          <li>
            Carne de res: <b>Impacto de carbono = 26,20 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de costilla de res, entrecot, lengua de res, bistec de falda, paleta de
            res, carrillera de res
          </li>
          <li>
            Ternera: <b>Impacto de carbono = 16,9 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de costilla de ternera, paleta de ternera, escalope de ternera, nuez de
            ternera, pecho de ternera y molleja de ternera
          </li>
          <li>
            Dorada: <b>Impacto de carbono = 10,8 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de dorada de cultivo y dorada salvaje
          </li>
          <li>
            Mantequilla: <b>Impacto de carbono = 7,76 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de mantequilla sin sal y mantequilla con sal
          </li>
          <li>
            Queso duro: <b>Impacto de carbono = 6,11 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de varios quesos duros: Emmental, Gruyère, Comté, Gouda, etc.
          </li>
          <li>
            Queso blando: <b>Impacto de carbono = 5,19 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de varios quesos blandos: Camembert, Brie, Maroilles, Mont-d'Or, etc.
          </li>
          <li>
            Queso azul: <b>Impacto de carbono = 4,13 kg de CO2e / kg</b>
            <br />
            Promedio de los factores de emisión de varios quesos azules: Roquefort, Bleu d'Auvergne, Gorgonzola, etc.
          </li>
        </ul>
      </div>
    </>
  )
}

const ENAlimentationData = () => {
  return (
    <>
      <h2 className={styles.title}>Methodology</h2>
      <div className={styles.content}>
        <p>
          All data and calculations are sourced from the ADEME database{' '}
          <Link href='https://agribalyse.ademe.fr/'>Agribalyse</Link>. For most foods, we have used the data as
          displayed in the database.
        </p>
        <p>However, for some specific foods, we have averaged several emission factors:</p>
        <ul>
          <li>
            Beef: <b>Carbon impact = 26.20 kg CO2e / kg</b>
            <br />
            Average of emission factors for rib steak, entrecôte, beef tongue, flank steak, beef shoulder, beef cheek
          </li>
          <li>
            Veal: <b>Carbon impact = 16.9 kg CO2e / kg</b>
            <br />
            Average of emission factors for veal rib, veal shoulder, veal escalope, veal nut, veal breast, and veal
            sweetbread
          </li>
          <li>
            Gilthead seabream: <b>Carbon impact = 10.8 kg CO2e / kg</b>
            <br />
            Average of emission factors for farmed gilthead seabream and wild gilthead seabream
          </li>
          <li>
            Butter: <b>Carbon impact = 7.76 kg CO2e / kg</b>
            <br />
            Average of emission factors for unsalted butter and salted butter
          </li>
          <li>
            Hard cheese: <b>Carbon impact = 6.11 kg CO2e / kg</b>
            <br />
            Average of emission factors for various hard cheeses: Emmental, Gruyère, Comté, Gouda, etc.
          </li>
          <li>
            Soft cheese: <b>Carbon impact = 5.19 kg CO2e / kg</b>
            <br />
            Average of emission factors for various soft cheeses: Camembert, Brie, Maroilles, Mont-d'Or, etc.
          </li>
          <li>
            Blue cheese: <b>Carbon impact = 4.13 kg CO2e / kg</b>
            <br />
            Average of emission factors for various blue cheeses: Roquefort, Bleu d'Auvergne, Gorgonzola, etc.
          </li>
        </ul>
      </div>
    </>
  )
}

const AlimentationData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENAlimentationData />
  }
  if (language === 'es') {
    return <ESAlimentationData />
  }

  return <FRAlimentationData />
}
export default AlimentationData
