import React from 'react'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import GhostButton from 'components/base/GhostButton'
import { Buttons } from './Actions.styles'

const Actions = ({ onClick, category }: { onClick: (value: string) => void; category: Category }) => {
  return (
    <Buttons>
      <GhostButton
        icon='send-plane'
        onClick={() => {
          onClick('partager')
          track(category.name, 'Partager', `${category.slug}_partager`)
        }}>
        Partager
      </GhostButton>
      <GhostButton
        icon='code-s-slash'
        onClick={() => {
          onClick('integrer')
          track(category.name, 'Integrer', `${category.slug}_integrer`)
        }}>
        Intégrer
      </GhostButton>
      <GhostButton
        icon='download'
        onClick={() => {
          onClick('telecharger')
          track(category.name, 'Telecharger', `${category.slug}_telecharger`)
        }}>
        Télécharger
      </GhostButton>
    </Buttons>
  )
}

export default Actions
