import styled from 'styled-components'

export const Top = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
`
export const Checkboxes = styled.div<{ $visible: boolean }>`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};

  > label {
    font-size: 0.875rem;
  }

  ${(props) => props.theme.mq.small} {
    align-items: center;
  }
`
