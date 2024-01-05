import styled from 'styled-components'

const Hamburger = ({
  hamburgerOpened,
  hamburgerClicked,
}: {
  hamburgerOpened: boolean
  hamburgerClicked: () => void
}) => (
  <Button
    onClick={() => {
      hamburgerClicked()
    }}
    $opened={hamburgerOpened}>
    {hamburgerOpened ? <>X</> : <Rotate>III</Rotate>}
  </Button>
)

export default Hamburger

const Button = styled.button<{ $opened: boolean }>`
  background-color: transparent;
  border: 1px solid gainsboro;
  border-radius: 4px;
  color: #746770;
  cursor: pointer;
  height: 2rem;
  padding: ${({ $opened }) => ($opened ? '0' : '.9rem 1rem 1rem 1rem')};
  width: 2rem;
`

const Rotate = styled.span`
  display: block;
  transform: rotate(-90deg);
`
