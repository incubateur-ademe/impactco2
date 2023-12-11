import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  position: relative;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`

export const Text = styled.p`
  margin: 0 auto 1rem;
  max-width: 26rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
