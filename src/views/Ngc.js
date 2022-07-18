import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 6rem;
`
const Title = styled.h1`
  margin: -0.5rem 0 0.75rem;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.main};
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
  }
`

const Text = styled.p`
  margin: 0 auto 2rem;
  font-size: 1.125rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`
export default function Ngc() {
  return (
    <Section>
      <StyledSectionContent>
        <Title>
          Connaissez-vous votre empreinte sur le climat
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />?
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
          <Emoji>🦔</Emoji>
        </Title>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem
          augue, dictum sagittis odio eget, aliquam mattis felis. Donec quam
          libero, dictum in nibh aliquam.
        </Text>
        <Button.Wrapper>
          <Button to='/ngc/test'>Commencer</Button>
        </Button.Wrapper>
      </StyledSectionContent>
    </Section>
  )
}
