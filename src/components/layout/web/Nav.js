import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

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
  font-size: 0.875rem;
  top: 0.375rem;
  width: 20rem;

  ${(props) => props.theme.mq.medium} {
    width: 17rem;
  }
`
export default function Nav() {
  const router = useRouter()

  return (
    <StyledSection background>
      <Section.Content>
        <Wrapper>
          <Menu />
          {router.pathname !== '/' && <StyledSearch />}
        </Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
