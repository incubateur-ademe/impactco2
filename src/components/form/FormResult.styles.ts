import styled from 'styled-components'

export const StyledIcon = styled.div<{ $success: boolean }>`
  align-items: center;
  background-color: var(--${({ $success }) => ($success ? 'success' : 'error')}-10);
  border-radius: 50%;
  color: var(--${({ $success }) => ($success ? 'success-50' : 'critical-60')});
  display: inline-flex;
  height: 28px;
  justify-content: center;
  margin-right: 0.5rem;
  width: 28px;
`

export const Description = styled.div`
  margin: 0.75rem 0 1.5rem 0;
`
