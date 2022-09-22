import styled from 'styled-components'

const Top = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
`
const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.375rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 200ms;

  > div {
    font-size: 0.875rem;
  }

  ${(props) => props.theme.mq.small} {
    align-items: center;
  }
`

Top.Checkboxes = Checkboxes
export default Top
