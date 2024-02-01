import React from 'react'
import chauffage from 'data/categories/chauffage.json'
import Emoji from 'components/base/Emoji'
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
      </Text>
      {sortedValues.map((equivalent) => (
        <div key={equivalent.slug}>
          <div>
            <StyledEmoji>
              <Emoji>{equivalent.emoji}</Emoji>
            </StyledEmoji>
            <b>{equivalent.name}</b>
          </div>
          {equivalent.data.values.map((value, index) => (
            <Values $withBorder={index !== equivalent.data.values.length - 1} key={equivalent.slug + value.title}>
              <div>
                {value.title}
                {'withSource' in value && value.withSource && (
                  <span>
                    {' '}
                    • <Link href={value.withSource.href}>{value.withSource.label}</Link>
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
