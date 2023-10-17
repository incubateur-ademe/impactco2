import styled from "styled-components";

export default function Hamburger(props) {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          props.hamburgerClicked();
        }}
      >
        {props.hamburgerOpened ? <>X</> : <>III</>}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Button = styled.button`
  cursor: pointer;
`;
