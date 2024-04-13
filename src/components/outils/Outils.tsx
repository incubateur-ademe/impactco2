import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import ToolCards from 'components/cards/ToolCards'
import { tools } from 'components/cards/tools'
import Equivalents from 'components/home/Equivalents'
import Block from 'components/layout/web/Block'

const Outils = () => {
  return (
    <>
      <Breadcrumbs current='Les outils' links={[{ label: 'Accueil', link: '/' }]} />
      <Block title='Les outils' as='h1' description='Trouver l’outil adapté à votre prochaine publication.' />
      <Block
        title='Outils thématiques'
        description='Notre collection de simulateurs, comparateurs et infographies thématiques.'>
        <ToolCards>
          {tools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </ToolCards>
      </Block>
      <Block
        title='Petits formats'
        description='Nos widgets, modules et autres formats miniatures à intégrer à vos contenus.'>
        <ToolCards>
          <ToolCard
            slug='etiquettes'
            title='Étiquettes'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
          <ToolCard
            slug='detecteur-co2'
            title='Script Carbone'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
          <ToolCard
            slug='osez-changer'
            title='Défi chaussures'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
        </ToolCards>
      </Block>
      <Block title='Pour les développeurs' description='Des outils spécifiques pour des usages avancés.'>
        <ToolCards>
          <ToolCard
            slug='api-doc'
            title='API'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
          <ToolCard
            slug='npm'
            title='Package NPM'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
          <ToolCard
            slug='shopify'
            title='Extension Shopify'
            description='Aliquam eu libero malesuada, consequat odio '
            linkLabel='Découvrir'
          />
        </ToolCards>
      </Block>
      <Block
        title='Les fiches'
        description='Parcourir les fiches dédiées à l’impact carbone de plus de 150 objets et gestes courants.'>
        <Equivalents />
      </Block>
    </>
  )
}

export default Outils
