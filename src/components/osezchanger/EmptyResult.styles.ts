import styled from 'styled-components'

export const Container = styled.div`
  background: var(--secondary-20);
  border: 1px solid var(--secondary-20);
  border-radius: 4px;
  color: var(--secondary-40);
  font-size: 0.875rem;
  font-weight: 500;
  height: 100%;
  left: 0;
  line-height: 1.25rem;
  opacity: 1;
  padding: 1rem;
  position: absolute;
  text-align: center;
  top: 0;

  svg {
    height: 64px;
    width: 64px;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    justify-content: center;
    opacity: 0.5;
  }
`
