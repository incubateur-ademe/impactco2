import classNames from 'classnames'
import React from 'react'
import chauffage from 'data/categories/chauffage.json'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Link from 'components/base/buttons/Link'
import styles from '../Data/Data.module.css'

const ChauffageData = () => {
  const sortedValues = chauffage.sort((a, b) => a.total - b.total)
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        L'ensemble des calculs et des hypothèses sont issus de{' '}
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          l’étude Consommation d'énergie par usage du résidentiel 2023
        </Link>{' '}
        et{' '}
        <Link href='https://www.legifrance.gouv.fr/download/pdf?id=doxMrRr0wbfJVvtWjfDP4rj1eH6w-xJoB6-2bmLS9gg='>
          de la méthode 3CL du DPE
        </Link>
        . Nous utilisons également les facteurs d’émission de la{' '}
        <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> dans nos calculs, qui
        sont exprimés kgCO₂e/kWh.
        <br />
        <br />
        Afin de comparer les différents modes de chauffage entre eux, nous partons d’un foyer moyen avec un besoin en
        énergie de 150 kWh/m².
      </div>
      {sortedValues.map((equivalent) => (
        <div key={equivalent.slug}>
          <div>
            <div className={styles.emoji}>
              <EquivalentIcon equivalent={equivalent} />
            </div>
            <b>{equivalent.name}</b>
          </div>
          {equivalent.data.values.map((value, index) => (
            <div
              className={classNames(styles.values, { [styles.border]: index !== equivalent.data.values.length - 1 })}
              key={equivalent.slug + value.title}>
              <div>
                {value.title}
                {'withSource' in value && value.withSource && (
                  <span>
                    {' '}
                    • <Link href={value.withSource.href}>{value.withSource.label}</Link>
                  </span>
                )}
              </div>
              <div className={styles.value}>{value.value}</div>
            </div>
          ))}
          {equivalent.data.hypothesis && (
            <div
              className={classNames(styles.hypothesis, 'text-sm')}
              dangerouslySetInnerHTML={{
                __html: equivalent.data.hypothesis,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ChauffageData
