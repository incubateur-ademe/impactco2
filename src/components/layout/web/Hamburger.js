import styled from "styled-components";

export default function Hamburger(props) {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          props.hamburgerClicked();
        }}
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
  height: 30px;
  width: 30px;
`;

const Rotate = styled.div`
  transform: rotate(-90deg);
`;
