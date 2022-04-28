import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Menu from './nav/Menu'
import Search from './nav/Search'

const StyledSection = styled(Section)`
  margin-bottom: 1rem;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export default function Nav() {
  return (
    <StyledSection background>
      <Section.Content>
        <Wrapper>
          <Menu />
          <Search />
        </Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
