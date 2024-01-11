import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Section } from 'components/base/Section'

export const StyledSection = styled(Section)`
  margin-top: 1.5rem;
`

export const Strong = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;

  ${MEDIA.LT.MEDIUM}  {
    font-size: 1.125rem;
  }
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Informations = styled.div`
  background-color: var(--secondary-10);
  border-radius: 15px;
  color: var(--neutral-60);
  padding: 1.5rem;
  position: relative;

  p {
    margin-bottom: 0;
  }

  b {
    color: var(--neutral-70);
  }

  &:before {
    border-bottom: 14px solid var(--secondary-10);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    content: '';
    display: block;
    position: absolute;
    right: calc(50% + 14px);
    top: -14px;
  }
`
