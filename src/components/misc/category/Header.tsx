import React, { useState } from 'react'
import { Category } from 'types/category'
import { SectionWideContent } from 'components/base/Section'
import Actions from './Actions'
import { ActionsContainer, Container, Content, Description, Separator } from './Header.styles'
import Integrate from './Integrate'
import Share from './Share'

const Header = ({
  category,
  params,
  takeScreenshot,
}: {
  category: Category
  params?: Record<string, string>
  takeScreenshot: () => void
}) => {
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
      <SectionWideContent $size='xs' $noGutter>
        <ActionsContainer>
          <Actions
            category={category}
            onClick={(value) => (value === 'telecharger' ? takeScreenshot() : open(value))}
          />
          {opened && (
            <Content>
              <Separator />
              {opened === 'partager' && <Share category={category} params={params} />}
              {opened === 'integrer' && <Integrate category={category} params={params} />}
            </Content>
          )}
        </ActionsContainer>
      </SectionWideContent>
    </Container>
  )
}

export default Header
