import styled from 'styled-components'
import { Section } from 'components/base/Section'

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: space-between;
`

export const Subtitle = styled.div`
  color: var(--neutral-60);
`

export const StyledSection = styled(Section)`
  padding-top: 8rem;
`
