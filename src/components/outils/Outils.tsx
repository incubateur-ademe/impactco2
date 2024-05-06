import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCards from 'components/cards/ToolCards'
import { devTools, smallTools, tools } from 'components/cards/tools'
import Equivalents from 'components/home/Equivalents'
import Block from 'components/layout/Block'

const Outils = () => {
  return (
    <>
      <Breadcrumbs current='Les outils' links={[{ label: 'Accueil', link: '/' }]} />
      <Block title='Les outils' as='h1' description='Trouver l’outil adapté à votre prochaine publication.' />
      <Block
        title='Outils thématiques'
        description='Notre collection de simulateurs, comparateurs et infographies thématiques.'>
        <ToolCards tools={tools} />
      </Block>
      <Block
        title='Petits formats'
        description='Nos widgets, modules et autres formats miniatures à intégrer à vos contenus.'>
        <ToolCards tools={smallTools} />
      </Block>
      <Block title='Pour les développeurs' description='Des outils spécifiques pour des usages avancés.'>
        <ToolCards tools={devTools} />
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
