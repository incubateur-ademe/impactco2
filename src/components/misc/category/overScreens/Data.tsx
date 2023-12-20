import React from 'react'
import chauffage from 'data/categories/chauffage.json'
import MagicLink from 'components/base/MagicLink'
import { Container, Hypothesis, StyledEmoji, Text, Value, Values } from './Data.styles'

const Data = () => {
  const sortedValues = chauffage.sort((a, b) => a.total - b.total)
  return (
    <Container>
      <Text>
        L'ensemble des calculs et des hypothèses sont issus de{' '}
        <MagicLink to='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          l’étude Consommation d'énergie par usage du résidentiel 2023
        </MagicLink>{' '}
        et <MagicLink to='https://nosgestesclimat.fr/documentation/logement/chauffage'>des modèles de calcul</MagicLink>{' '}
        du simulateur citoyen de l’ADEME Nos Gestes Climat. Nous utilisons également les facteurs d’émission de la{' '}
        <MagicLink to='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</MagicLink> dans nos calculs,
        qui sont exprimés kgCO2e/kWh.
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
                      <MagicLink to={equivalent.source}>Détails</MagicLink>
                    ) : (
                      <MagicLink to={value.withSource.href}>{value.withSource.label}</MagicLink>
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
