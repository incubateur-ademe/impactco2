import React, { useContext } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import ModalContext from 'components/providers/ModalProvider'
import ButtonLink from 'components/base/ButtonLink'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledButtonLink = styled(ButtonLink)`
  display: block;
  font-size: 70%;
  margin: 0.3rem 0.5rem 0 0;
`
export default function Hypothèses() {
  const { setHypothesis } = useContext(ModalContext)
  return (
    <Wrapper>
      <StyledButtonLink
        onClick={() => {
          track('Usage numérique', 'Hypothèses', 'usage_numerique_hypotheses')
          setHypothesis(true)
        }}>
        Sources et hypothèses
      </StyledButtonLink>{' '}
    </Wrapper>
  )
}
