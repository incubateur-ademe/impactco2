import React from 'react'
import { GuideUtilisationRow } from 'types/guideUtilisation'
import Block from 'components/layout/Block'
import FAQ from './FAQ'

const GuideUtilisation = ({ rows }: { rows: GuideUtilisationRow[] }) => {
  return (
    <Block
      as='h1'
      title="Guide d'utilisation"
      description="Suivez le guide pour prendre en main les outils d'Impact CO₂">
      <ul>
        {rows.map((row) => (
          <FAQ key={row.title} faq={row} page='Guide utilisation' />
        ))}
      </ul>
    </Block>
  )
}

export default GuideUtilisation
