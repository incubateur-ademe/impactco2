import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Section2 from 'components/base/Section2'
import WebBlue from 'components/layout/WebBlue'

const H1Title = styled.h1`
  margin-top: 3rem;
`

export default function MetionsLegales() {
  return (
    <WebBlue title={'Mentions légales'}>
      <Section2>
        <Section2.InnerMargin>
          <FormatText>
            <H1Title>Mentions légales</H1Title>
            <h2>Informations légales</h2>
            <p>
              Impact CO2&nbsp;
              <Link href='/'>(https://impactco2.fr)</Link> est un service créé par&nbsp;
              <a href='https://www.ademe.fr/' target='_blank' rel='noreferrer noopener'>
                l’ADEME
              </a>
              &nbsp;en partenariat avec&nbsp;
              <a href='https://beta.gouv.fr/' target='_blank' rel='noreferrer noopener'>
                beta.gouv.fr
              </a>
              .
            </p>
            <p>
              Le site constitué par l’ensemble des pages rattachées au nom Impact CO2 est la propriété de l’Agence de
              l’Environnement et de la Maîtrise de l’Energie (ADEME), Établissement Public à caractère Industriel et
              Commercial (EPIC) régi par les articles L131-3 à L131-7 et R131-1 à R131-26 du Code de l’environnement,
              inscrit au registre du commerce d’Angers sous le n° 385 290 309 et ayant son siège social au : 20, avenue
              du Grésillé - BP 90406 - 49004 Angers Cedex 01
              <br />
              Tél. 02 41 20 41 20
            </p>
            <h2>Direction de publication</h2>
            <p>
              Le directeur de publication est M. Sylvain WASERMAN, agissant en qualité de Président-directeur général de
              l’ADEME.
            </p>
            <p>
              La personne responsable de l’accès aux documents administratifs et des questions relatives à la
              réutilisation des informations est Monsieur Luc MORINIÈRE en qualité de Chef du service des affaires
              juridiques.
            </p>
            <h2>Hébergement du site</h2>
            <p>Scalingo</p>
            <p>13 rue Jacques Peirotes 67000 Strasbourg, France</p>
            <h2>Attribution</h2>
            <p>Certaines illustrations sont réalisées par Storyset de www.flaticon.com</p>
            <h2>Modification des mentions légales</h2>
            <p>
              L’ADEME se réserve le droit de modifier les présentes mentions légales à tout moment. L’utilisateur est
              lié par les conditions en vigueur lors de sa visite.
            </p>
          </FormatText>
        </Section2.InnerMargin>
      </Section2>
    </WebBlue>
  )
}

const FormatText = styled.div`
  h1 {
    font-size: 3rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`
