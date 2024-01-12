import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import useModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/buttons/Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledButtonLink = styled(Button)`
  margin: 0.3rem 0.5rem 0 0;
`
export default function Hypothèses() {
  const { setHypothesis } = useModalContext()
  return (
    <Wrapper>
      <StyledButtonLink
        asLink
        onClick={() => {
          track('Usage numérique', 'Hypothèses', 'usage_numerique_hypotheses')
          setHypothesis(true)
        }}>
        Sources et hypothèses
      </StyledButtonLink>{' '}
    </Wrapper>
  )
}
