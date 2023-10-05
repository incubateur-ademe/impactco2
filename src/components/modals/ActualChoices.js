import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray] = useLocalStorage("ico2_eqv_array");
  console.log("eqvArray in...", eqvArray);

  return (
    <Wrapper>
      <UpperSide>3 / 3 équivalences sélectionnées</UpperSide>
      <Choices>
        {eqvArray.map((slug) => {
          return <Choice key={slug}>{slug}</Choice>;
        })}
      </Choices>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const UpperSide = styled.div``;
const Choices = styled.div``;

const Choice = styled.div``;
