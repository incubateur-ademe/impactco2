import styled from 'styled-components'

const Section = styled.div`
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'second' : 'background']};
`

Section.Content = styled.div`
  display: ${(props) => (props.flex ? 'flex' : 'block')};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 0.75rem;
  width: 48rem;

  ${(props) => props.theme.mq.medium} {
    width: 100vw;
  }
`

export default Section
