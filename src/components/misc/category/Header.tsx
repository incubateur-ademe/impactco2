import React, { useState } from 'react'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import GhostButton from 'components/base/GhostButton'
import { Actions, ActionsButtons, Container, Description, Separator } from './Header.styles'
import Share from './Share'

const Header = ({ category, params }: { category: Category; params?: Record<string, string> }) => {
  const [opened, setOpened] = useState('')

  const open = (section: string) => {
    if (opened === section) {
      setOpened('')
    } else {
      setOpened(section)
    }
  }
  return (
    <Container>
      <h1>
        Sensibiliser à l'impact <span className='text-secondary'>{category.header} sur le climat</span>
      </h1>
      <Description className='text-xl'>{category.description}</Description>
      <Actions>
        <ActionsButtons>
          <GhostButton
            icon='send-plane'
            onClick={() => {
              open('partager')
              track(category.name, 'Partager', `${category.slug}_partager`)
            }}>
            Partager
          </GhostButton>
          <GhostButton
            icon='code-s-slash'
            onClick={() => {
              open('integrer')
              track(category.name, 'Integrer', `${category.slug}_integrer`)
            }}>
            Intégrer
          </GhostButton>
          <GhostButton
            icon='download'
            onClick={() => {
              open('telecharger')
              track(category.name, 'Telecharger', `${category.slug}_telecharger`)
            }}>
            Télécharger
          </GhostButton>
        </ActionsButtons>
        {opened && (
          <>
            <Separator />
            {opened === 'partager' && <Share category={category} params={params} />}
          </>
        )}
      </Actions>
    </Container>
  )
}

export default Header
