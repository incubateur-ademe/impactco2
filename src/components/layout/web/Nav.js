import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import Section from 'components/base/Section'
import Search from 'components/misc/Search'
import Menu from './nav/Menu'

const StyledSection = styled(Section)`
  margin-bottom: 1rem;
  z-index: 500;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledSearch = styled(Search)`
  top: 0.375rem;
`
export default function Nav() {
  const location = useLocation()

  return (
    <StyledSection background>
      <Section.Content>
        <Wrapper>
          <Menu />
          {location.pathname !== '/' && <StyledSearch />}
        </Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
