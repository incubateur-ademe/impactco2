'use client'

import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import Link from 'components/base/buttons/Link'
import EquivalentCard from 'components/home/EquivalentCard'
import styles from './OsezChangerData.module.css'

const category = categories.find((c) => c.slug === 'habillement') as Category
const cuir = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresencuir') as ComputedEquivalent
const tissu = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresentissu') as ComputedEquivalent
const sport = category.equivalents?.find((equivalent) => equivalent.slug === 'chaussuresdesport') as ComputedEquivalent

const FROsezChangerData = () => {
  return (
    <>
      <div>
        L’impact carbone moyen d’une paire de chaussures neuve est de <b>17,9 kg CO₂e.</b>
        <br />
        <br />
        Nous faisons une moyenne des trois facteurs d’émissions issus de la{' '}
        <Link
          href='https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Cuir'
          target='_blank'
          rel='noreferrer noopener'>
          Base Carbone
        </Link>
        {' '}:
      </div>
      <div className={styles.cards}>
        <EquivalentCard equivalent={cuir} />
        <EquivalentCard equivalent={tissu} />
        <EquivalentCard equivalent={sport} />
      </div>
      <div>
        Soit : (15 + 18,5 + 20,1)/3 = 17,9 kg CO₂e.
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

const ENOsezChangerData = () => {
  return (
    <>
      <div>
        The average carbon impact of a new pair of shoes is <b>17,9 kg CO₂e.</b>
        <br />
        <br />
        We take an average of the three emissions factors from the
        <Link
          href='https://base-empreinte.ademe.fr/documentation/base-carbone?docLink=Cuir'
          target='_blank'
          rel='noreferrer noopener'>
          Carbon Base
        </Link>
        :
      </div>
      <div className={styles.cards}>
        <EquivalentCard equivalent={cuir} />
        <EquivalentCard equivalent={tissu} />
        <EquivalentCard equivalent={sport} />
      </div>
      <div>
        Or: (15 + 18,5 + 20,1)/3 = 17,9 kg CO₂e.
        <br />
        <br />
        To know the carbon impact of the number of pairs of new shoes purchased, we therefore do the following
        calculation:
        <br />
        <br />
        <b>average emission factor of a pair of new shoes * number of pairs of shoes purchased</b>
      </div>
    </>
  )
}

const OsezChangerData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENOsezChangerData />
  }

  return <FROsezChangerData />
}
export default OsezChangerData
