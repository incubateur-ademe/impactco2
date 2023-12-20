import Link from 'next/link'
import React from 'react'
import { Cards, Container, Text } from './Hypotesis.styles'
import HypotesisCard from './HypotesisCard'

const Hypotesis = () => {
  return (
    <Container data-testid='hypothesis-modal'>
      <Text>
        L’impact carbone moyen d’une paire de chaussures neuve est de{' '}
        <b>
          16,5 kg CO<sub>2</sub>e.
        </b>
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
      </Text>
      <Cards>
        <HypotesisCard slug='chaussuresencuir' />
        <HypotesisCard slug='chaussuresentissu' />
        <HypotesisCard slug='chaussuresdesport' />
      </Cards>
      <Text>
        Soit : (13 + 17 + 19)/3 = 16,5 kg CO<sub>2</sub>e.
        <br />
        <br />
        Pour connaître l’impact carbone du nombre de paires de chaussures neuves achetées nous faisons donc le calcul
        suivant :
        <br />
        <br />
        <b>facteur d’émission moyen d’une paire de chaussure neuve * nombre de paires de chaussures achetées</b>
      </Text>
    </Container>
  )
}

export default Hypotesis
