import React, { useState } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import Button from 'components/base/buttons/Button'
import DetailsUsagesNumModal from 'components/modals/DetailsUsagesNumModal'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledButtonLink = styled(Button)`
  margin: 0.3rem 0.5rem 0 0;
`
export default function Hypothèses() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <Wrapper>
      {openModal && <DetailsUsagesNumModal setOpen={setOpenModal} />}
      <StyledButtonLink
        asLink
        onClick={() => {
          track('Usage numérique', 'Hypothèses', 'usage_numerique_hypotheses')
          setOpenModal(true)
        }}>
        Sources et hypothèses
      </StyledButtonLink>{' '}
    </Wrapper>
  )
}
