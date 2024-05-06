import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import Link from 'components/base/buttons/Link'
import EquivalentCard from 'components/home/EquivalentCard'
import styles from './OsezChangerData.module.css'

const category = categories.find((category) => category.slug === 'habillement') as Category
const cuir = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresencuir') as ComputedEquivalent
const tissu = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresentissu') as ComputedEquivalent
const sport = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresdesport') as ComputedEquivalent

const OsezChangerData = () => {
  return (
    <>
      <div>
        L’impact carbone moyen d’une paire de chaussures neuve est de <b>16,5 kg CO₂e.</b>
        <br />
        <br />
        Nous faisons une moyenne des trois facteurs d’émissions issus de la{' '}
        <Link
          href='https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Cuir'
          target='_blank'
          rel='noreferrer noopener'>
          Base Carbone
        </Link>
        :
      </div>
      <div className={styles.cards}>
        <EquivalentCard equivalent={cuir} />
        <EquivalentCard equivalent={tissu} />
        <EquivalentCard equivalent={sport} />
      </div>
      <div>
        Soit : (13 + 17 + 19)/3 = 16,5 kg CO₂e.
        <br />
        <br />
        Pour connaître l’impact carbone du nombre de paires de chaussures neuves achetées nous faisons donc le calcul
        suivant :
        <br />
        <br />
        <b>facteur d’émission moyen d’une paire de chaussure neuve * nombre de paires de chaussures achetées</b>
      </div>
    </>
  )
}

export default OsezChangerData
