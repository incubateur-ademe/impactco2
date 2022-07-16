import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import alimentation from './categoryStart/alimentation.jpeg'
import divers from './categoryStart/divers.jpeg'
import logement from './categoryStart/logement.webp'
import numerique from './categoryStart/numerique.jpeg'
import transport from './categoryStart/transport.png'

import RulesContext from 'utils/RulesContext'
import Button from 'components/base/Button'

const images = {
  alimentation,
  divers,
  logement,
  numérique: numerique,
  transport,
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;
`
const Title = styled.h2``
const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
`
const StyledReactMarkdown = styled(ReactMarkdown)``
export default function CategoryStart(props) {
  const { curCategory } = useContext(RulesContext)

  console.log(curCategory)
  return (
    <Wrapper>
      <Title>
        {curCategory.title} {curCategory.rawNode['icônes']}
      </Title>
      <Image src={images[curCategory.dottedName]} alt='' />
      <StyledReactMarkdown>
        {curCategory.rawNode.description || '🚲 🚗 ✈️ 🚅 🚌'}
      </StyledReactMarkdown>
      <Button.Wrapper right>
        <Button onClick={() => props.setStatus('started')}>Commencer</Button>
      </Button.Wrapper>
    </Wrapper>
  )
}
