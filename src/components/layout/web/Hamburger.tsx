import styled from 'styled-components'

const Hamburger = ({
  hamburgerOpened,
  hamburgerClicked,
}: {
  hamburgerOpened: boolean
  hamburgerClicked: () => void
}) => (
  <Wrapper>
    <Button
      onClick={() => {
        hamburgerClicked()
      }}
      $opened={hamburgerOpened}
    >
      {hamburgerOpened ? (
        <>X</>
      ) : (
        <>
          <Rotate>III</Rotate>
        </>
      )}
    </Button>
  </Wrapper>
)

export default Hamburger

const Wrapper = styled.div``
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

const Rotate = styled.div`
  transform: rotate(-90deg);
`
