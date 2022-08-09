import styled from 'styled-components'

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`
const Checkboxes = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 200ms;

  > div {
    font-size: 0.875rem;
  }
`

Top.Checkboxes = Checkboxes
export default Top
