import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export const Wrapper = styled.div`
  background-color: var(--secondary-10);
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem 2rem;
  position: relative;

  ${MEDIA.LT.SMALL} {
    padding: 1rem;
  }
`

export const Text = styled.p`
  margin: 0 auto 1rem;
  max-width: 26rem;
  text-align: center;

  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
`
