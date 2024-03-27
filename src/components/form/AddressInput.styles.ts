import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const SuggestionsContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
`

const loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(360deg);    
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  animation: ${loading} 1.3s infinite;
  bottom: 10px;
  color: var(--secondary-50);
  height: 1.25rem;
  position: absolute;
  right: 8px;
  width: 1.25rem;

  svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`
