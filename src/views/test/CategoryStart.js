import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

import RulesContext from 'utils/RulesContext'
import Button from 'components/base/Button'

const images = {
  alimentation: (
    <Image src='./categoryStart/alimentation.jpeg' alt='' layout='fullWidth' />
  ),
  divers: <Image src='./categoryStart/divers.jpeg' alt='' layout='fullWidth' />,
  logement: (
    <Image src='./categoryStart/logement.webp' alt='' layout='fullWidth' />
  ),
  numérique: (
    <Image src='./categoryStart/numerique.jpeg' alt='' layout='fullWidth' />
  ),
  transport: (
    <Image src='./categoryStart/transport.png' alt='' layout='fullWidth' />
  ),
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
const StyledReactMarkdown = styled(ReactMarkdown)`
  margin-top: 1.5rem;
`
export default function CategoryStart(props) {
  const { curCategory } = useContext(RulesContext)

  return (
    <Wrapper>
      <Title>
        {curCategory.title} {curCategory.rawNode['icônes']}
      </Title>
      {images[curCategory.dottedName]}
      <StyledReactMarkdown>
        {curCategory.rawNode.description || '🚲 🚗 ✈️ 🚅 🚌'}
      </StyledReactMarkdown>
      <Button.Wrapper right>
        <Button onClick={() => props.setStatus('started')}>Commencer</Button>
      </Button.Wrapper>
    </Wrapper>
  )
}
