import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 2rem;
  position: relative;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
