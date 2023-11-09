import styled from 'styled-components'

export const Media = styled.div`
  align-items: flex-start;
  display: flex;
`
export const MediaFigure = styled.div`
  margin-right: 1em;
  ${(props) => props.theme.mq.medium} {
    margin-right: 0.2em;
  }
`
export const MediaBody = styled.div`
  flex: 1;
`
