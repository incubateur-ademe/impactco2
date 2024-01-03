import React from 'react'
import chauffage from 'data/categories/chauffage.json'
import Link from 'components/base/buttons/Link'
import { Container, Hypothesis, StyledEmoji, Text, Value, Values } from './Data.styles'

const Data = () => {
  const sortedValues = chauffage.sort((a, b) => a.total - b.total)
  return (
    <Container>
      <Text>
        L'ensemble des calculs et des hypothèses sont issus de{' '}
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          l’étude Consommation d'énergie par usage du résidentiel 2023
        </Link>{' '}
        et <Link href='https://nosgestesclimat.fr/documentation/logement/chauffage'>des modèles de calcul</Link> du
        simulateur citoyen de l’ADEME Nos Gestes Climat. Nous utilisons également les facteurs d’émission de la{' '}
        <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> dans nos calculs, qui
        sont exprimés kgCO2e/kWh.
      </Text>
      {sortedValues.map((equivalent) => (
        <div key={equivalent.slug}>
          <div>
            <StyledEmoji>{equivalent.emoji}</StyledEmoji>
            <b>{equivalent.name}</b>
          </div>
          {equivalent.data.values.map((value, index) => (
            <Values $withBorder={index !== equivalent.data.values.length - 1} key={equivalent.slug + value.title}>
              <div>
                {value.title}
                {'withSource' in value && value.withSource && (
                  <span>
                    {' '}
                    •{' '}
                    {typeof value.withSource === 'boolean' ? (
                      equivalent.source && <Link href={equivalent.source}>Détails</Link>
                    ) : (
                      <Link href={value.withSource.href}>{value.withSource.label}</Link>
                    )}
                  </span>
                )}
              </div>
              <Value>{value.value}</Value>
            </Values>
          ))}
          {equivalent.data.hypothesis && <Hypothesis className='text-sm'>{equivalent.data.hypothesis}</Hypothesis>}
        </div>
      ))}
    </Container>
  )
}

export default Data
