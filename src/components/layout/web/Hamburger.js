import styled from "styled-components";

export default function Hamburger(props) {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          props.hamburgerClicked();
        }}
        opened={props.hamburgerOpened}
      >
        {props.hamburgerOpened ? (
          <>X</>
        ) : (
          <>
            <Rotate>III</Rotate>
          </>
        )}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Button = styled.button`
  background-color: transparent;
  border: 1px solid gainsboro;
  border-radius: 4px;
  color: #746770;
  cursor: pointer;
  height: 2rem;
  padding: ${(props) => (props.opened ? "0" : ".9rem 1rem 1rem 1rem")};
  width: 2rem;
`;

const Rotate = styled.div`
  transform: rotate(-90deg);
`;
