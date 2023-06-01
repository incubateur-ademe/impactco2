import styled from 'styled-components'

const Section2 = styled.div``

Section2.WideContent = styled.div`
  display: ${(props) => (props.flex ? 'flex' : 'block')};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 100%;

  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`

export default Section2
