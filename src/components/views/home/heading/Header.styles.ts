import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export const UpperSide = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  ${MEDIA.LT.LARGE} {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }
`

export const Separator = styled.div`
  margin: 1.5rem 0;
`

export const CtaContainer = styled.div`
  ${MEDIA.LT.XLARGE} {
    font-size: 0.875rem;
  }
`

export const H2Title = styled.h2`
  font-size: 1.75rem;
  ${MEDIA.LT.LARGE} {
    font-size: 1.25rem;
  }
  margin-bottom: 0;
  > span {
    display: block;
    ${MEDIA.LT.SMALL} {
      display: inline;
    }
  }

  b {
    color: var(--primary-50);
  }
`
