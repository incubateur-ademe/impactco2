import styled from 'styled-components'
import Button from 'components/base/Button'

export const Container = styled.div`
  background-color: grey;
  border-radius: 16px;
  max-width: 300px;
  padding: 16px;
  position: absolute;
  right: 16px;
  top: 16px;
  width: fit-content;
  z-index: 100;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`

export const Description = styled.div`
  text-align: center;
`

export const DefiButton = styled(Button)`
  margin: 16px auto 0 auto;
`
