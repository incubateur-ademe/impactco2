import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export const Header = styled.h2`
  margin-bottom: 0rem;
  text-align: center;
`

export const SourcesWrapper = styled.div`
  margin-top: 1.5rem;
`

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;

  > div {
    flex: 1;
    min-width: 350px;
    ${MEDIA.LT.MEDIUM} {
      min-width: 100%;
    }
  }
`
