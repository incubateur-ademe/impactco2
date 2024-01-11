import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

export const Media = styled.div`
  align-items: flex-start;
  display: flex;
`
export const MediaFigure = styled.div`
  margin-right: 1em;
  ${MEDIA.LT.MEDIUM} {
    margin-right: 0.2em;
  }
`
export const MediaBody = styled.div`
  flex: 1;
`
